package com.example.LibraryManagement.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.*;

import java.util.List;

//cấu hình spring cho phép frontend gọi api
@Configuration
public class CorsConfig {
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        //dùng * cho allowedOrigins, kấy token/cookie
        config.setAllowCredentials(true); 
        config.setAllowedOrigins(List.of("http://localhost:3000"));
        config.setAllowedHeaders(List.of("*"));
        //lấy request
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); 

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        //cho toàn bộ api
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}