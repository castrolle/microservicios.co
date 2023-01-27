package co.mic.proxy.personas.exceptions;


import co.mic.proxy.personas.enums.ErrorEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GeneralErrorResponse {

	 private ErrorEnum error;
	    private String message;

}



