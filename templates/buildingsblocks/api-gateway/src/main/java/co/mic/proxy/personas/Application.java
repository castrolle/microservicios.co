package co.mic.proxy.personas;

import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import co.mic.proxy.personas.conf.JWTAuthorizationFilter;
import co.mic.proxy.personas.util.JwtTokenUtil;


@SpringBootApplication
@EnableAsync
@EnableZuulProxy
@CrossOrigin(origins = "*")
public class Application {

	@Value("${jwt.token.timeOut}")
	private long accessTokenTimeOut; // 60 segundos * 30 minutos

	@Value("${jwt.token.secret}")
	private String accessTokenSecret;

	@Value("${google.clientId}")
	private String clientId;

	@PostConstruct
	public void started() {
		JwtTokenUtil.accessTokenSecret = this.accessTokenSecret;
		JwtTokenUtil.accessTokenTimeOut = this.accessTokenTimeOut;
		JWTAuthorizationFilter.clientId = this.clientId;
		TimeZone.setDefault(TimeZone.getTimeZone("America/Bogota"));
	}

	@Bean
	public CorsFilter corsFilter() {
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		final CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);
		config.addAllowedOrigin("*");
		config.addAllowedHeader("*");
		config.addAllowedMethod("OPTIONS");
		config.addAllowedMethod("HEAD");
		config.addAllowedMethod("GET");
		config.addAllowedMethod("PUT");
		config.addAllowedMethod("POST");
		config.addAllowedMethod("DELETE");
		config.addAllowedMethod("PATCH");
		source.registerCorsConfiguration("/**", config);
		return new CorsFilter(source);
	}
	
	/*
	@Bean
	JedisConnectionFactory jedisConnectionFactory() {
	    return new JedisConnectionFactory();
	}

	@Bean
	public RedisTemplate<String, Object> redisTemplate() {
	    RedisTemplate<String, Object> template = new RedisTemplate<>();
	    template.setConnectionFactory(jedisConnectionFactory());
	    return template;
	}
	*/

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}

