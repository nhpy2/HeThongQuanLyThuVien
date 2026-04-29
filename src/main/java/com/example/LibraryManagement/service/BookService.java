package com.example.LibraryManagement.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.LibraryManagement.dto.BookDTO;
import com.example.LibraryManagement.entity.Book;
import com.example.LibraryManagement.repository.BookRepository;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository){
        this.bookRepository = bookRepository;
    }

    public List<BookDTO> getAllBooks(){
        return bookRepository.findAll()
            .stream()
            .map(b -> new BookDTO(
                b.getId(),
                b.getTitle(),
                b.getAuthor(),
                b.getIsbn()
            ))
            .toList();
    }

    public BookDTO createBook(BookDTO dto){
        Book book = new Book();

        book.setTitle(dto.title());
        book.setAuthor(dto.author());
        book.setIsbn(dto.isbn());

        book = bookRepository.save(book);

        return new BookDTO(
            book.getId(),
            book.getTitle(),
            book.getAuthor(),
            book.getIsbn()
        );
    }
}