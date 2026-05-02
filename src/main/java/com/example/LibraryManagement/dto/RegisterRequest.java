package com.example.LibraryManagement.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

//nhận dl register + validate khi xử lý
public record RegisterRequest(
    @NotBlank(message = "Username không được trống")
    @Size(min=3, max=50)
    String username,

    @NotBlank(message = "Email không được trống")
    @Email(message="Email không hợp lệ")
    String email,

    @NotBlank(message = "Password không được trống")
    @Size(min=8,message="Tối thiểu 8 ký tự")
    String password,

    @NotBlank(message = "Nhập đúng password da95 nhập")
    @Size(min=8,message="Tối thiểu 8 ký tự")
    String confirmPassword,

    @NotBlank(message = "Fullname không được trống")
    @Size(max=250)
    String fullName
) {

}