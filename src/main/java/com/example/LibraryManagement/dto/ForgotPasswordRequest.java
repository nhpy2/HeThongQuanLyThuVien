package com.example.LibraryManagement.dto;

public record ForgotPasswordRequest(String usernameOrEmail, String newPassword) {

}
