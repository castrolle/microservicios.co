package co.mic.proxy.personas.conf;

import java.util.ArrayList;
import java.util.List;

import org.springframework.cloud.netflix.zuul.filters.support.FilterConstants;
import org.springframework.util.ReflectionUtils;

import co.mic.proxy.personas.enums.ErrorEnum;
import co.mic.proxy.personas.exceptions.GeneralErrorResponse;
import co.mic.proxy.personas.util.GSonUtils;
//import co.mic.proxy.personas.util.LoggerUtil;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.exception.ZuulException;

public class ZuulErrorFilter extends ZuulFilter {

	
	/*LoggerUtil log;
	
	
	public ZuulErrorFilter(LoggerUtil log) {
		this.log = log;
	}*/
	
    @Override
    public String filterType() {
        return FilterConstants.ERROR_TYPE;
    }

    @Override
    public int filterOrder() {
    	return -1;
    }

    @Override
    public boolean shouldFilter() {
        return true;
    }

    @Override
    public Object run() {
        try {
            RequestContext ctx = RequestContext.getCurrentContext();
            Object e = ctx.get("throwable");
            if (e != null && e instanceof ZuulException) {
                ZuulException zuulException = (ZuulException)e;
                //log.error("Zuul failure detected: " + zuulException.getMessage());

                // Remove error code to prevent further error handling in follow up filters
                ctx.remove("throwable");

                ctx.getResponse().setContentType("application/json");
                List<GeneralErrorResponse> r = new ArrayList<>();
                r.add(new GeneralErrorResponse(ErrorEnum.UNAUTHORIZED, ErrorEnum.UNAUTHORIZED.getDescription()));
    			ctx.setResponseStatusCode(ErrorEnum.UNAUTHORIZED.getHttpCode().value());    			
    			ctx.setResponseBody(GSonUtils.serialize(r));
    			ctx.setSendZuulResponse(false);
    			
            }
        }
        catch (Exception ex) {
        	//log.error("OcurriÃ³ un error capturando las excepciones generadas por el consumo de los servicios: "+ ex.getMessage());
            ReflectionUtils.rethrowRuntimeException(ex);
        }
        return null;
    }
}

