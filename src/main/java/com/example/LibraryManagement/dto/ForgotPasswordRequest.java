package com.example.LibraryManagement.dto;

//reset khi chưa login
//ko check pw cũ, ko cần token
public record ForgotPasswordRequest(
    String usernameOrEmail, 
    String newPassword,
    String confirmPassword

) {

}
