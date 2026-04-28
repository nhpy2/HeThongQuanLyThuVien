package com.example.LibraryManagement.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.LibraryManagement.entity.User;

//repository xử lý toàn bộ truy vấn lquan đến User
public interface UserRepository extends JpaRepository<User,Long>{
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);
    
    Optional<User> findByResetToken(String token);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    @Query("SELECT u FROM User u WHERE " + 
        "(:search IS NULL OR LOWER(u.username) LIKE LOWER(CONCAT('%',:search,'%')) OR LOWER(u.email) LIKE LOWER (CONCAT('%',:search,'%')))" + 
        "AND(:role IS NULL OR u.role=role)"
    )
    Page<User> findBySearchAndRole(@Param("search") String search, @Param("role") String role, Pageable pageable);

    
}
