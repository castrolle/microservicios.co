package co.mic.proxy.personas.conf;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

/*import co.mic.proxy.personas.constants.TelemetryConstants;
import co.mic.proxy.personas.util.LoggerUtil;
*/
import com.google.common.io.CharStreams;
import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;

public class ZuulPostFilter extends ZuulFilter {


	/*LoggerUtil log;
	
	
	public ZuulPostFilter(LoggerUtil log) {
		this.log = log;
	}
	*/
	
	@Override
	public String filterType() {
		return "post";
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
		try {
			
			final InputStream responseDataStream = ctx.getResponseDataStream();

			if(ctx.getResponseStatusCode()  != 401 ){
				
				Charset inputCharset = Charset.forName("ISO-8859-1");
				final String responseData = CharStreams.toString(new InputStreamReader(responseDataStream,inputCharset));
				/*try {
					
					Map<String,String> m = new HashMap<>();
					m.put(TelemetryConstants.URL, request.getRequestURL().toString());
					m.put(TelemetryConstants.METHOD, request.getMethod());
					m.put(TelemetryConstants.REQUEST, CharStreams.toString(request.getReader()));
					m.put(TelemetryConstants.RESPONSE, responseData);
					m.put(TelemetryConstants.USER, request.getUserPrincipal().getName());

					log.telemetry(TelemetryConstants.TAG_TELEMETRY, m);
				}catch(Exception e) {
					log.error("OcurriÃ³ un error capturando los datos de request: "+ e.getMessage());
				}*/
				
				ctx.setResponseBody(responseData);
				
			}
			
		} catch (Exception e) {
			//log.error("OcurriÃ³ un error auditando el consumo de los servicios: "+ e.getMessage());
		}

		return null;
	}
}

