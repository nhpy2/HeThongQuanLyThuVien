package com.example.LibraryManagement.security;

import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.LibraryManagement.repository.UserRepository;

//lấy ttin user từ db để xác thực
@Service
public class UserDetailsServiceImpl implements UserDetailsService{

    private final UserRepository userRepository;

    public UserDetailsServiceImpl (UserRepository userRepository){
        this.userRepository=userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        com.example.LibraryManagement.entity.User user = userRepository.findByUsername(username)
        .orElseGet(() -> userRepository.findByEmail(username).orElse(null));

        if(user==null) {
            throw new UsernameNotFoundException("User not found: "+username);

        }
        return new User( //convert sang format SpringSecurity
            user.getUsername(),
            user.getPasswordHash(),
            Collections.singletonList(new SimpleGrantedAuthority("ROLE_"+user.getRole().name()))
        );
    }

}
