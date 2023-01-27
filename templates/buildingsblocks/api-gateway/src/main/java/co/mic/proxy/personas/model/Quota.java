package co.mic.proxy.personas.model;

import java.io.Serializable;
import java.util.Date;

import lombok.Data;

//@RedisHash("Quota")
@Data
public class Quota implements Serializable {
  
    public enum Type { 
        USER,ORIGIN
    }

    private Date started = new Date();
    private String username;
    private String proxy;
    private int countQuota;
    private int countLimit;
}
