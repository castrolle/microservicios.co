package co.microservicios.base.util;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Component
public class LoggerUtil {



	 	@Value("${spring.application.name}")
	    private String app;
	    @Value("${spring.application.version}")
	    private String version;


	    @Async
	    public void info(String idProceso, Object message) {    	
	    	
	    	Map<String, Object> msgObj = new HashMap<>();
	    	
	    		msgObj.put("version", version);
		    	msgObj.put("message", message);
				msgObj.put("idProceso", idProceso);
		    	msgObj.put("index", app);
		    	msgObj.put("app", app);
		    	msgObj.put("eventDate", DateUtils.getDateString("yyyy-MM-dd'T'HH:mm:ss.SS"));
		    	msgObj.put("typeStatusCode", "200");
		    	msgObj.put("type", "info");

	    	
			String msg = GSonUtils.serialize(msgObj);
			log.info(msg);
	    }

  		/**
	     * @param map Map<String, String> map = new HashMap<>();
	     *            m.put("solicitudX", "12345");
	     * @param tag auditoria, metricas, proceso, etc.
	     */
	    @Async
	    public void telemetry(String tag, String action, Object message) {
	        	Map<String, String> logMap = new HashMap<>();
	            
	            logMap.put("version", version);
	            logMap.put("index", app);
	            logMap.put("app", app);
	            logMap.put("action", action);
	            logMap.put("tag", tag);
	            logMap.put("eventDate", String.valueOf(DateUtils.getDateString("yyyy-MM-dd'T'HH:mm:ss.SS")));
	            logMap.put("typeStatusCode", "200");
	            logMap.put("type", "info");
	            logMap.putAll(GSonUtils.deserializeFlat(GSonUtils.serialize(message)));
		        log.info(GSonUtils.deserializeFlat(GSonUtils.serialize(logMap)));
	    }

 		@Async
		public void infoService(String index, Object request, Object response, Object message) {

			Map<String, Object> msgObj = new HashMap<>();

			msgObj.put("index", app);
			msgObj.put("idProceso", index);
			msgObj.put("version", version);
			msgObj.put("message", message);
			msgObj.put("request", request);
			msgObj.put("response", response);
			msgObj.put("app", app);

			String msg = GSonUtils.serialize(msgObj);
			log.info(msg);

		}
	    
	    
	    @Async
	    public void error(String idProceso, Object message, String cause) {    	
	    	
	    	Map<String, Object> msgObj = new HashMap<>();
	    	
		    	msgObj.put("version", version);
		    	msgObj.put("message", message);
		    	msgObj.put("idProceso", idProceso);
		    	msgObj.put("index", app);
		    	msgObj.put("app", app);
		    	msgObj.put("eventDate", DateUtils.getDateString("yyyy-MM-dd'T'HH:mm:ss.SS"));
		    	msgObj.put("typeStatusCode", "500");
		    	msgObj.put("type", "error");
		    	msgObj.put("cause", cause);
		    	
			String msg = GSonUtils.serialize(msgObj);
			log.error(msg);
			
	    }
	    	    
	  
	}
