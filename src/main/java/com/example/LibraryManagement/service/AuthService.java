package com.example.LibraryManagement.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.LibraryManagement.dto.RegisterRequest;
import com.example.LibraryManagement.dto.UserResponse;
import com.example.LibraryManagement.entity.Role;
import com.example.LibraryManagement.entity.User;
import com.example.LibraryManagement.exception.DuplicateResourceException;
import com.example.LibraryManagement.repository.UserRepository;
import com.example.LibraryManagement.security.JwtService;


@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final UserMapper userMapper;
     
    public AuthService (
        UserRepository userRepository,
        PasswordEncoder passwordEncoder,
        JwtService jwtService,
        AuthenticationManager authenticationManager,
        UserDetailsService userDetailsService,
        UserMapper userMapper
    ){
        this.userRepository=userRepository;
        this.passwordEncoder=passwordEncoder;
        this.jwtService=jwtService;
        this.authenticationManager=authenticationManager;
        this.userDetailsService=userDetailsService;
        this.userMapper=userMapper;
        
        
    }

    public UserResponse register(RegisterRequest request) {
        if(userRepository.existsByUsername(request.username())){
            throw new DuplicateResourceException("Username đã tồn tại");
        }

        if(userRepository.existsByEmail(request.email())){
            throw new DuplicateResourceException("Email đã tồn tại");
        }

        User user = User.builder()
        .username(request.username())
        .email(request.email())
        .passwordHash(passwordEncoder.encode(request.password()))
        .role(Role.USER)
        .build();
        
        user = userRepository.save(user);
        log.info("User Registered: {}", user.getFullName());
        return userMapper.toResponse(user);
    }

}
