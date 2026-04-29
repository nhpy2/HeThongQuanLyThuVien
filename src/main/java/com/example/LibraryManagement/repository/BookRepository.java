package com.example.LibraryManagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.LibraryManagement.entity.Book;

//
public interface BookRepository extends JpaRepository<Book, Long> {

}
