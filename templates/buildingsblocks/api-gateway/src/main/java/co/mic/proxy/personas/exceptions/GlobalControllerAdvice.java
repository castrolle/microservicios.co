package co.mic.proxy.personas.exceptions;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;

import co.mic.proxy.personas.enums.ErrorEnum;



@ControllerAdvice
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class GlobalControllerAdvice //extends ResponseEntityExceptionHandler
{

	@ExceptionHandler(Throwable.class) 
    public ResponseEntity<GeneralErrorResponse> problem(final Throwable e) {
    	String message = "Ocurrio un error procesando su solicitud, contacte al administrador del sistema. Error causado por: "+e.getMessage()+" -> ";
    	if(e.getCause() != null) {
    		message += e.getCause().getMessage()+" -> ";
    	}
    	if(e.getStackTrace() != null && e.getStackTrace().length > 0) {
    		
    		for(StackTraceElement element : e.getStackTrace()) {
    			message += element +":"+ element+ " -> ";	
    		}
    	}
    	GeneralErrorResponse r = new GeneralErrorResponse(ErrorEnum.INTERNAL_SERVER_ERROR, message);
		return new ResponseEntity(r, HttpStatus.INTERNAL_SERVER_ERROR);
    }
   


    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ApiException> handleApiException(ApiException ex) {
		GeneralErrorResponse r = new GeneralErrorResponse(ex.getError(),ex.getMessage());
		return new ResponseEntity(r, ex.getError().getHttpCode());
    }
   
}


