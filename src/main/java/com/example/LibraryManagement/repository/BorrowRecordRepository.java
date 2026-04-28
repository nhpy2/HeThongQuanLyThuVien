package com.example.LibraryManagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.LibraryManagement.entity.BorrowRecord;

@Repository
public interface BorrowRecordRepository extends JpaRepository<BorrowRecord, Long> {
    // Tìm các sách user đang mượn (chưa trả)
    List<BorrowRecord> findByUser_UsernameAndReturnDateIsNull(String username);
}