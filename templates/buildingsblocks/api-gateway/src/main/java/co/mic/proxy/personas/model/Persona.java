package co.mic.proxy.personas.model;

import java.util.List;

import javax.validation.Valid;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Valid
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Data
public class Persona {
	private List<PUsrDetalle> p_usr_detalle;

	@Valid
	@AllArgsConstructor
	@NoArgsConstructor
	@ToString
	@Builder
	@Data
	public static class PUsrDetalle {

		@JsonProperty("ID")
		private double iD;
		@JsonProperty("TPDID")
		private String tPDID;
		@JsonProperty("NUMERODOCUMENTO")
		private String nUMERODOCUMENTO;
		@JsonProperty("NOMBRES")
		private String nOMBRES;
		@JsonProperty("PRIMERAPELLIDO")
		private String pRIMERAPELLIDO;
		@JsonProperty("SEGUNDOAPELLIDO")
		private String sEGUNDOAPELLIDO;
		@JsonProperty("DIAEXPEDICION")
		private double dIAEXPEDICION;
		@JsonProperty("MESEXPEDICION")
		private double mESEXPEDICION;
		@JsonProperty("ANIOEXPEDICION")
		private double aNIOEXPEDICION;
		@JsonProperty("EMAIL")
		private String eMAIL;
		@JsonProperty("NUMEROLFIJO")
		private String nUMEROLFIJO;
		@JsonProperty("NUMEROCELULAR")
		private String nUMEROCELULAR;
		@JsonProperty("USR_ACTIVO")
		private double uSR_ACTIVO;
	}

}
