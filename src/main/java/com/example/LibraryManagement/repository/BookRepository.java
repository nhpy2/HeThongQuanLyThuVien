package com.example.LibraryManagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.LibraryManagement.entity.Book;

//
public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(String title, String author);
}
