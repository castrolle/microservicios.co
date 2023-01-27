package co.mic.proxy.personas.enums;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorEnum {
	UNAUTHORIZED("001","No autorizado",HttpStatus.UNAUTHORIZED),
	TOO_MANY_REQUESTS("001","Limite de solicitudes superado",HttpStatus.TOO_MANY_REQUESTS),
	INTERNAL_SERVER_ERROR("002","Error inesperado",HttpStatus.INTERNAL_SERVER_ERROR),
	CREAR_PERSONA("100","No fue posible crear la persona",HttpStatus.INTERNAL_SERVER_ERROR),
	ACTIVAR_PERSONA("101","No fue posible activar la persona",HttpStatus.INTERNAL_SERVER_ERROR),
	
    ;
	
	private String code;
	private String description;
	private HttpStatus httpCode;
	
	
}


