package com.example.LibraryManagement.dto;

import java.time.Instant;

import com.example.LibraryManagement.entity.Role;

//trả dl user an toàn ra frontend, ẩn ttin nhạy cảm
public record UserResponse( 
    Long id,
    String username,
    String email,
    Role role,
    String fullName,
    Instant createdAt,
    Instant updatedAt
) {

}