package com.example.LibraryManagement.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.LibraryManagement.entity.Book;

//định nghĩa các truy vấn lquan đến tìm kiếm
public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(String title, String author);

    //Phân trang
    Page<Book> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(
        String title,
        String author,
        Pageable pageable
    );

    Page<Book> findByTitleContainingIgnoreCaseAndCategory_Name(
        String title, String category, Pageable pageable
    );
}
