package com.example.LibraryManagement.Config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

//Lưu cấu hình JWT: secret + thgian hết hạn

@Configuration //bean cấu hình, spring qly nó
@ConfigurationProperties(prefix="app.jwt") //tự động map các gtri từ file config vào class
public class JwtProperties {
    private String secret="defaultSecMustBeLongEnoughForHS256"; //tạo token + verify token (HS256: ít nhất 32 ký tự)
    private Long accessTokenExpirationMS = 900_000L; //thgian sống của token
    private Long refreshTokenExpirationMS = 604_800_000L; //thgian sống của refresh token: 7 ngày

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
