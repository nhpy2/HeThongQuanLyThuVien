package com.example.LibraryManagement.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.LibraryManagement.Config.JwtProperties;
import com.example.LibraryManagement.dto.AuthResponse;
import com.example.LibraryManagement.dto.ForgotPasswordRequest;
import com.example.LibraryManagement.dto.LoginRequest;
import com.example.LibraryManagement.dto.RegisterRequest;
import com.example.LibraryManagement.dto.ResetPasswordRequest;
import com.example.LibraryManagement.dto.UserResponse;
import com.example.LibraryManagement.entity.Role;
import com.example.LibraryManagement.entity.User;
import com.example.LibraryManagement.exception.DuplicateResourceException;
import com.example.LibraryManagement.repository.UserRepository;
import com.example.LibraryManagement.security.JwtService;

//xử lý logic:: kiểm soát user, phát token
@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final UserMapper userMapper;
    private final JwtProperties jwtProperties;
     
    public AuthService (
        UserRepository userRepository,
        PasswordEncoder passwordEncoder,
        JwtService jwtService,
        AuthenticationManager authenticationManager,
        UserDetailsService userDetailsService,
        UserMapper userMapper,
        JwtProperties jwtProperties
    ){
        this.userRepository=userRepository;
        this.passwordEncoder=passwordEncoder;
        this.jwtService=jwtService;
        this.authenticationManager=authenticationManager;
        this.userDetailsService=userDetailsService;
        this.userMapper=userMapper;
        this.jwtProperties=jwtProperties;
        
    }

    //check trùng username/email
    public UserResponse register(RegisterRequest request) {
        if(userRepository.existsByUsername(request.username())){
            throw new DuplicateResourceException("Username đã tồn tại");
        }

        if(userRepository.existsByEmail(request.email())){
            throw new DuplicateResourceException("Email đã tồn tại");
        }

        if (!request.password().equals(request.confirmPassword())) {
            throw new RuntimeException("Password không khớp");
        }

        User user = User.builder()
        .username(request.username())
        .email(request.email())
        .fullName(request.fullName())
        .passwordHash(passwordEncoder.encode(request.password()))
        .role(Role.USER)
        .build();
        
        user = userRepository.save(user); //lưu db
        log.info("User Registered: {}", user.getFullName());
        return userMapper.toResponse(user);
    }

    //check username+pass
    public AuthResponse login(LoginRequest request) {
        try {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.usernameOrEmail(),
                request.password()
            )
        );

        var userDetails = userDetailsService.loadUserByUsername(request.usernameOrEmail());

        //tạo token
        String accessToken = jwtService.generateAccessToken(userDetails);
        String refreshToken = jwtService.generateRefreshToken(userDetails);

        var user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();

        //trả token về frontend
        return AuthResponse.of(
            accessToken,
            refreshToken,
            "Bearer",
            jwtProperties.getAccessTokenExpirationMS() / 1000,
            userMapper.toResponse(user));
        } 
        catch (Exception e) {
            throw new RuntimeException("Invalid username/email or password");
        }
    }

    //lấy ttin profile user theo username
    public UserResponse getProfile(String username) {
        var user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return userMapper.toResponse(user);
    }

    //quên password
    public void forgotPassword(ForgotPasswordRequest request) {
        User user = userRepository.findByUsername(request.usernameOrEmail())
            .orElseGet(() -> userRepository.findByEmail(request.usernameOrEmail())
            .orElseThrow(() -> new RuntimeException("User not found")));

        if (!passwordEncoder.matches(request.newPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid username/email or password");
        }

        user.setPasswordHash(passwordEncoder.encode(request.newPassword()));

        userRepository.save(user);
    }

    //reset pass, đã login
    public void resetPassword(String username, ResetPasswordRequest request) {
        User user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("User not found"));

        //kiểm tra password cũ
        if (!passwordEncoder.matches(request.oldPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Old password is incorrect");
        }

        if (!request.newPassword().equals(request.confirmPassword())) {
            throw new RuntimeException("Password không khớp");
        }

        //set password mới
        user.setPasswordHash(passwordEncoder.encode(request.newPassword()));

        userRepository.save(user);
    }

}
