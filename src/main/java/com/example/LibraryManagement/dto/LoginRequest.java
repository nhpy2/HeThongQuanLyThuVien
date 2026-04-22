package com.example.LibraryManagement.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
    @NotBlank(message = "Username/Email không được trống")
    String usernameOrEmail,
    String passwordString
){
    
}