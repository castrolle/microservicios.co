package co.mic.proxy.personas.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import co.mic.proxy.personas.model.Quota;
import lombok.Data;

@Component
public class RedisQuotaRepository {

	private static Map<Id, Quota> map;

	public RedisQuotaRepository() {
		map = new HashMap<>();
	}

	public void save(Quota quota) {
		Id id = new Id();
		id.setUsername(quota.getUsername());
		id.setProxy(quota.getProxy());
		map.put(id, quota);
	}

	public List findAll() {
		return null;
	}

	public Quota findById(String username, String proxy) {
		Id id = new Id();
		id.setUsername(username);
		id.setProxy(proxy);
		return (Quota) map.get(id);
	}

	public void update(Quota quota) {
		save(quota);
	}

	public void delete(String id) {
	}

	@Data
	public static class Id {
		private String username;
		private String proxy;
	}

}