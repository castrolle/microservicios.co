package co.mic.proxy.personas.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import co.mic.proxy.personas.business.ControllerBusiness;
import co.mic.proxy.personas.dto.TokenRequest;
import co.mic.proxy.personas.dto.TokenResponse;
import co.mic.proxy.personas.util.JwtTokenUtil;

@RestController
public class ApiController {


    @Autowired
    ControllerBusiness controllerBusiness;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    
	@Value("${spring.application.version}")
	private String version;
	
	@Value("${spring.application.username}")
	private String username;
	
	@Value("${spring.application.password}")
	private String password;
	
	@Value("${jwt.token.timeOut}")
	private long accessTokenTimeOut; // 60 segundos * 30 minutos

	@GetMapping("version")
    public ResponseEntity<String> version() {
        return new ResponseEntity(version, HttpStatus.OK);
    }

    @PostMapping(path="access-token", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TokenResponse> login(@RequestBody TokenRequest tokenRequest) {
        TokenResponse response = new TokenResponse();
        if(tokenRequest.getClientId() != null && !tokenRequest.getClientId().isEmpty() && tokenRequest.getClientId().toUpperCase().equals(username.toUpperCase())) {
        	
        	if(tokenRequest.getClientSecret() != null && !tokenRequest.getClientSecret().isEmpty() && tokenRequest.getClientSecret().equals(password)) {
        		String token = getJWTToken(tokenRequest.getClientId());
        		response.setAccessToken(token);
        		response.setExpiresIn(String.valueOf(accessTokenTimeOut));
        		response.setIdToken("id");
        		return new ResponseEntity(response, HttpStatus.OK);	
        	}
        }
        
        return new ResponseEntity(response, HttpStatus.PROXY_AUTHENTICATION_REQUIRED);
    }

    
    private String getJWTToken(String name) {
    	String token =jwtTokenUtil.generateToken(name);
    	return token;
    }
  

}

