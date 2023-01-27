package co.microservicios.base.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import co.microservicios.base.dto.CiudadDTO;
import co.microservicios.base.util.GSonUtils;

@Component
public class ControllerBusiness {
	
	@Value("${ciudades}")
    private String ciudades ;

	public List<CiudadDTO> getCiudades() {
		return GSonUtils.toList(ciudades, CiudadDTO.class);
	}

}
