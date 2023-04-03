package co.microservicios.base.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;


@RestController
@Tag(name = "foobar", description = "the foobar API with documentation annotations")
public class ApiController {

	@Value("${spring.application.version}")
	private String version;

	@GetMapping("version")
	public ResponseEntity<String> version() {
		String a = null;
		a.toString();
		return new ResponseEntity<String>(version, HttpStatus.OK);
	}

}
