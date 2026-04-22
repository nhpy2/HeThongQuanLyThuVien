package com.example.LibraryManagement.Config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix="app.jwt")
public class JwtProperties {
    private String secret="defaultSecMustBeLongEnoughForHS256";
    private Long accessTokenExpirationMS = 900_000L;
    private Long refreshTokenExpirationMS = 604_800_000L;

    public String getSecret(){
        return secret;
    }

    public void setSecret(String secret){
        this.secret = secret;
    }

    public Long getAccessTokenExpirationMS(){
        return accessTokenExpirationMS;
    }

    public void setAccessTokenExpirationMS(Long accessTokenExpirationMS){
        this.accessTokenExpirationMS = accessTokenExpirationMS;
    }

    public Long getRefreshTokenExpirationMS(){
        return refreshTokenExpirationMS;
    }

    public void setRefreshTokenExpirationMS(Long refreshTokenExpirationMS){
        this.refreshTokenExpirationMS = refreshTokenExpirationMS;
    }
}
