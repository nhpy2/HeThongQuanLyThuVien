package com.example.LibraryManagement.dto;

import java.time.Instant;

import com.example.LibraryManagement.entity.Role;

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