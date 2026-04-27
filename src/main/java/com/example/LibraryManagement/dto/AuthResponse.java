package com.example.LibraryManagement.dto;

//trả POST /api/auth/login
//token gọi api, ttin user, thgian hết hạn
public record AuthResponse(
    String accessToken,
    String refreshToken,
    String tokenType,
    Long expiresInSeconds,
    UserResponse user
) {
    public AuthResponse{
        if(tokenType==null||tokenType.isBlank()) {
            tokenType="Bearer";
        }
    }

    public static AuthResponse of(
        String accessToken, 
        String refreshToken, 
        String tokenType, 
        Long expiresInSeconds, 
        UserResponse user 
    ){
        return new AuthResponse(accessToken, refreshToken, tokenType,
             expiresInSeconds, user);
    }
}
