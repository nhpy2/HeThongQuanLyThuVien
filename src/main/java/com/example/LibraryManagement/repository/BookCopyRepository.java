package com.example.LibraryManagement.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.LibraryManagement.entity.BookCopy;
import com.example.LibraryManagement.entity.BookStatus;

//Mượn sách
@Repository
public interface BookCopyRepository extends JpaRepository<BookCopy, Long> {
    // Tìm các cuốn sách cụ thể đang còn trống
    Optional<BookCopy> findFirstByBookIdAndStatus(Long bookId, BookStatus status);
}
