package com.example.LibraryManagement.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.LibraryManagement.dto.AuthResponse;
import com.example.LibraryManagement.dto.ForgotPasswordRequest;
import com.example.LibraryManagement.dto.LoginRequest;
import com.example.LibraryManagement.dto.RegisterRequest;
import com.example.LibraryManagement.dto.ResetPasswordRequest;
import com.example.LibraryManagement.dto.UserResponse;
import com.example.LibraryManagement.service.AuthService;
import jakarta.validation.Valid;

//Xử lý api lquan đến register/login
@RestController //trả về JSON: sping tự convert obj -> JSON
@RequestMapping("/api/auth")
public class AuthController {
    //dependency injection: ko xử lý logic, nhận request, trả response
    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService=authService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request) {
        UserResponse created = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/profile")
    public ResponseEntity<UserResponse> profile(Authentication authentication) {
        String username = authentication.getName();
        UserResponse user = authService.getProfile(username);

        return ResponseEntity.ok(user);
    }

    @PostMapping("/forgot-pass")
    public ResponseEntity<?> forgotPassword(
        @RequestBody ForgotPasswordRequest request
    ) {
        authService.forgotPassword(request);

        return ResponseEntity.ok("Password reset successfully");
    }

    @PostMapping("/reset-pass")
    public ResponseEntity<?> changePassword(
        Authentication authentication,
        @RequestBody ResetPasswordRequest request
    ) {
        String username = authentication.getName();

        authService.resetPassword(username, request);

        return ResponseEntity.ok("Password changed");
    }
}
