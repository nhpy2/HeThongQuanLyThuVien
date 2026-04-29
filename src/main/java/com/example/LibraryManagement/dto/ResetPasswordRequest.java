package com.example.LibraryManagement.dto;

//reset khi đã lofin
//nhập pw cũ, đúng -> cho pheps đổi
public record ResetPasswordRequest(
    String oldPassword, 
    String newPassword,
    String confirmPassword
) {

}
