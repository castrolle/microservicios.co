package co.mic.proxy.personas.conf;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;

import co.mic.proxy.personas.conf.PolicyProps.Ratelimit;
import co.mic.proxy.personas.enums.ErrorEnum;
import co.mic.proxy.personas.exceptions.GeneralErrorResponse;
import co.mic.proxy.personas.model.Quota;
import co.mic.proxy.personas.services.RedisQuotaRepository;
import co.mic.proxy.personas.util.GSonUtils;

@Component
public class ZuulPreFilter extends ZuulFilter {

	@Autowired
	RedisQuotaRepository qr;
	
	@Autowired
	PolicyProps policies;
	

	@Override
	public String filterType() {
		return "route";
	}

	@Override
	public int filterOrder() {
		return 1;
	}

	@Override
	public boolean shouldFilter() {
		return true;
	}

	@Override
	public Object run() {
		RequestContext ctx = RequestContext.getCurrentContext();
		HttpServletRequest request = ctx.getRequest();
		
		String roles = SecurityContextHolder.getContext().getAuthentication().getAuthorities().toString();
		String url = ctx.getZuulRequestHeaders().get("x-forwarded-prefix");
		String proxy = String.valueOf(ctx.get("proxy"));
		
		//List<URLMangagerTableStorage> urlsBD = controllerBusiness.getDataURLMangager(url);
		String userName = request.getUserPrincipal().getName();
		ctx.addZuulRequestHeader("username", userName);
		Quota quota = qr.findById(userName,proxy);

		Ratelimit limit = policies.get(proxy);
		
		if(quota != null) {
			Long started = quota.getStarted().getTime();
			Long actual = new Date().getTime();
			Long time = (actual -started) / 1000;
			if(time > limit.getRefreshInterval()){
				quota.setCountQuota(0);
				quota.setStarted(new Date());
			}
			quota.setCountQuota(quota.getCountQuota()+1);
		}else {
			quota = new Quota();
			quota.setCountLimit(0);
			quota.setCountQuota(1);
			quota.setUsername(userName);
			quota.setProxy(proxy);
		}
		quota.setCountLimit(quota.getCountLimit()+1);
		
		if(limit != null) {
			if(quota.getCountQuota() > limit.getQuota() || quota.getCountLimit() > limit.getLimit()){
				 List<GeneralErrorResponse> r = new ArrayList<>();
		            r.add(new GeneralErrorResponse(ErrorEnum.TOO_MANY_REQUESTS, ErrorEnum.TOO_MANY_REQUESTS.getDescription()));
					ctx.setResponseStatusCode(ErrorEnum.TOO_MANY_REQUESTS.getHttpCode().value());    			
					ctx.setResponseBody(GSonUtils.serialize(r));
					ctx.getResponse().setContentType("application/json");
					ctx.setSendZuulResponse(false);
			}
		}
		qr.save(quota);
		
		return null;
	}

}


