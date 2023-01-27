//package co.mic.proxy.personas.util;
//
//import java.net.URI;
//import java.net.URISyntaxException;
//import java.net.URL;
//
//import javax.servlet.ServletException;
//
//import org.apache.http.client.HttpClient;
//import org.apache.http.client.methods.HttpPost;
//import org.apache.http.client.utils.URIBuilder;
//import org.apache.http.impl.client.HttpClientBuilder;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.scheduling.annotation.Async;
//import org.springframework.stereotype.Component;
//
//import com.google.appengine.api.urlfetch.URLFetchService;
//import com.google.appengine.api.urlfetch.URLFetchServiceFactory;
//
//
//@Component
//public class LogAnalytics {
//	
//	@Value("${google.analytics}")
//    private String trackingId;
//	
//
//	@Async
//    public void info(String message){
//		sendToAnalytics("info",message);
//	}
//	
//	@Async
//    public void error(String message){
//		sendToAnalytics("error",message);
//	}
//    	
//  private void sendToAnalytics(String type, String msg) {
//    try {
//    	
//    	    URIBuilder builder = new URIBuilder();
//    	    HttpClient client = HttpClientBuilder.create().build();
//    	    builder
//    	        .setScheme("http")
//    	        .setHost("www.google-analytics.com")
//    	        .setPath("/collect")
//    	        .addParameter("v", "1") // API Version.
//    	        .addParameter("tid", trackingId) // Tracking ID / Property ID.
//    	        // Anonymous Client Identifier. Ideally, this should be a UUID that
//    	        // is associated with particular user, device, or browser instance.
//    	        .addParameter("cid", "555")
//    	        .addParameter("t", "event") // Event hit type.
//    	        .addParameter("ec", type) // Event category.
//    	        .addParameter("ea", "detail") // Event action.
//    	    	.addParameter("el", msg); // Event action.
//    	    URI uri = null;
//    	    try {
//    	      uri = builder.build();
//    	    } catch (URISyntaxException e) {
//    	      throw new ServletException("Problem building URI", e);
//    	    }
//    	    URLFetchService fetcher = URLFetchServiceFactory.getURLFetchService();
//    	    URL url = uri.toURL();
//    	    HttpPost request = new HttpPost(uri);
//    	    client.execute(request);
//    	
//    } catch (Exception e) {
//      e.printStackTrace();
//    }
//  }
//}
//
