package co.microservicios.base.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import co.microservicios.base.business.ControllerBusiness;
import co.microservicios.base.dto.CiudadDTO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@ApiResponses(value = { @ApiResponse(code = 200, message = "Accion exitosa"),
		@ApiResponse(code = 500, message = "Internal Server Error") })
@Api(value = "app-tra-correo-service-api ApiController", description = "Microservcio envio de correo", tags = { "",
		"" })
public class ApiController {

	@Autowired
	ControllerBusiness controllerBusiness;

	@Value("${spring.application.version}")
	private String version;


	@GetMapping("version")
	public ResponseEntity<String> version() {
		return new ResponseEntity(version, HttpStatus.OK);
	}

	@ApiOperation(value = "Ciudades DANE", notes = "Retorna las ciudades con su respectivo codigo DANE - Colomibia")
	@GetMapping("ciudades")
	public ResponseEntity<List<CiudadDTO>> getCiudades() {
		return new ResponseEntity<>(controllerBusiness.getCiudades(), HttpStatus.OK);
	}

}
