package co.mic.proxy.personas.conf;

import java.io.IOException;
import java.io.PrintWriter;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.netflix.zuul.context.RequestContext;
import co.mic.proxy.personas.enums.ErrorEnum;
import co.mic.proxy.personas.exceptions.ApiException;
import co.mic.proxy.personas.exceptions.GeneralErrorResponse;
import co.mic.proxy.personas.util.GSonUtils;
import co.mic.proxy.personas.util.JwtTokenUtil;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;

public class JWTAuthorizationFilter extends OncePerRequestFilter {

	private final String HEADER = "Authorization";
	private final String PROVIDER = "Provider";
	private final String PREFIX = "Bearer ";

	private JwtTokenUtil jwtTokenUtil;

	public static String clientId;

	public JWTAuthorizationFilter() {
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {

		String provider = request.getHeader(PROVIDER);

		if (provider == null || provider.equals("Own")) {
			this.own(request, response, chain);
		} else if (provider != null && provider.equals("Google")) {
			this.google(request, response, chain);
		}

		chain.doFilter(request, response);
	}

	private void google(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException {
		String header = request.getHeader(HEADER);
		boolean tokenIsValid = false;
		if (existeJWTToken(header)) {
			String authToken = header.replace(PREFIX, "");
			NetHttpTransport transport = new NetHttpTransport();
			JsonFactory jsonFactory = new GsonFactory();

			GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
					.setAudience(Collections.singletonList(clientId)).build();

			GoogleIdToken idToken = null;
			try {
				idToken = verifier.verify(authToken);
				tokenIsValid = (idToken != null) && verifier.verify(idToken);
			} catch (GeneralSecurityException | IOException e) {
				e.printStackTrace();
			}

			if (tokenIsValid && idToken != null) {
				GoogleIdToken.Payload payload = idToken.getPayload();
				RequestContext ctx = RequestContext.getCurrentContext();
				ctx.addZuulRequestHeader("email", payload.getEmail());
				SecurityContextHolder.getContext()
						.setAuthentication(getAuthentication(payload.getEmail(), "ROLE_USER"));

			}
		} else {
			if (request.getServletPath().contains("public")) {
				tokenIsValid = true;
				RequestContext ctx = RequestContext.getCurrentContext();
				ctx.addZuulRequestHeader("email", "anonymous@email.com");
				SecurityContextHolder.getContext().setAuthentication(getAuthentication("anonymous", "ROLE_USER"));
			}
		}

		if (!tokenIsValid) {
			SecurityContextHolder.clearContext();
			response.setStatus(401);

			List<GeneralErrorResponse> r = new ArrayList<>();
			r.add(new GeneralErrorResponse(ErrorEnum.UNAUTHORIZED, ErrorEnum.UNAUTHORIZED.getDescription()));

			PrintWriter out = response.getWriter();
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			out.print(GSonUtils.serialize(r));
			out.flush();

			return;
		}

	}

	private void own(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
		try {
			String header = request.getHeader(HEADER);
			String authToken = null;
			jwtTokenUtil = new JwtTokenUtil();

			if (existeJWTToken(header)) {

				authToken = header.replace(PREFIX, "");
				Claims claims = jwtTokenUtil.validateToken(authToken);
				String roles = "ROLE_ADMIN";
				setUpSpringAuthentication(claims, roles);
			}
		} catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException e) {
			response.setStatus(HttpServletResponse.SC_FORBIDDEN);
			((HttpServletResponse) response).sendError(HttpServletResponse.SC_FORBIDDEN, e.getMessage());
			return;
		} catch (ApiException ex) {
			SecurityContextHolder.clearContext();
			response.setStatus(ex.getError().getHttpCode().value());

			List<GeneralErrorResponse> r = new ArrayList<>();
			r.add(new GeneralErrorResponse(ErrorEnum.UNAUTHORIZED, ErrorEnum.UNAUTHORIZED.getDescription()));

			PrintWriter out = response.getWriter();
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			out.print(GSonUtils.serialize(r));
			out.flush();

			return;
		}

	}

	/**
	 * Metodo para autenticarnos dentro del flujo de Spring
	 *
	 * @param claims
	 */
	private void setUpSpringAuthentication(Claims claims, String roles) {
		SecurityContextHolder.getContext().setAuthentication(getAuthentication(claims.getSubject(), roles));

	}

	public UsernamePasswordAuthenticationToken getAuthentication(final String username, final String roles) {

		final Collection<SimpleGrantedAuthority> authorities = Arrays.stream(roles.split(","))
				.map(SimpleGrantedAuthority::new).collect(Collectors.toList());
		return new UsernamePasswordAuthenticationToken(username, "", authorities);
	}

	private boolean existeJWTToken(String header) {
		if (header != null && header.startsWith(PREFIX)) {
			return true;
		} else {
			return false;
		}
	}
}

