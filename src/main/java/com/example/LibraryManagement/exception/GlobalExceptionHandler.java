package com.example.LibraryManagement.exception;

import java.time.Instant;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.example.LibraryManagement.dto.ApiError;

import jakarta.servlet.http.HttpServletRequest;

//xử lý lỗi toàn hệ thống
public class GlobalExceptionHandler {
    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ApiError> handleDuplicate(DuplicateResourceException ex, HttpServletRequest request) {
        return ResponseEntity.badRequest().body(
            new ApiError("DUPLICATE", ex.getMessage(), null, request.getRequestURI(), Instant.now())
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleAll(Exception ex, HttpServletRequest request) {
        return ResponseEntity.status(500).body(
            new ApiError("ERROR", ex.getMessage(), null, request.getRequestURI(), Instant.now())
        );
    }
}
