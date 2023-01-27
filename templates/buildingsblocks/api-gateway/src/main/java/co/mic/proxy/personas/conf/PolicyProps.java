package co.mic.proxy.personas.conf;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Configuration
@ConfigurationProperties(prefix = "policy")
@Data
public class PolicyProps {

	//private String firstName;
	//private Map<String, String> list;
	private List<Ratelimit> ratelimits;
    private Map<String, Ratelimit> map;

	@Data
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	public static class Ratelimit{
		private String name;
		private int limit; // 10 #optional - request number limit per refresh interval window
		private int quota; // 1000 #optional - request time limit per refresh interval window (in seconds)
		private int refreshInterval;//: 60 #default value (in seconds)
		private String type; //: user  #origin user
	}
	
	public Ratelimit get(String proxy) {
		if(map == null) {
			map = new HashMap<>();
			for (Ratelimit ratelimit : ratelimits) {
				map.put(ratelimit.getName(), ratelimit);
			}
		}
		return map.get(proxy);
	}
}