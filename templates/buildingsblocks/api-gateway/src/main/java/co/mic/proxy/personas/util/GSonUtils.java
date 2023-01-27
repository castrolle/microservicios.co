package co.mic.proxy.personas.util;

import com.google.gson.Gson;
public class GSonUtils {
	

	public static String serialize(Object src) {
		Gson gson = new Gson();
		return gson.toJson(src);
	}
	
	public static <T> T toObject(Object src, Class<T> clazz) {
		Gson gson = new Gson();
		return gson.fromJson(gson.toJson(src),clazz);
	}
	
	public static <T> T toObject(String src, Class<T> clazz) {
		Gson gson = new Gson();
		return gson.fromJson(src,clazz);
	}
}

