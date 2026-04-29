package com.example.LibraryManagement.dto;

import jakarta.validation.constraints.NotBlank;

//nhận dl login từ client (username or email)
public record LoginRequest(
    @NotBlank(message = "Username/Email không được trống")
    String usernameOrEmail,

    @NotBlank(message = "Password không được trống")
    String password
){
    
}