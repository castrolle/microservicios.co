package co.mic.proxy.personas.dto;

import javax.validation.Valid;

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
public class TokenRequest{
	private String clientId;
    private String clientSecret;
}

