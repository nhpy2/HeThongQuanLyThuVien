package com.example.LibraryManagement.Controller;

import com.example.LibraryManagement.entity.Book;
import com.example.LibraryManagement.repository.BookRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/books")
public class AdminBookController {

    private final BookRepository bookRepository;

    public AdminBookController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    //CREATE BOOK
    @PostMapping
    public Book createBook(@RequestBody Book book) {
        book.setAvailableQuantity(book.getAvailableQuantity());
        return bookRepository.save(book);
    }

    //DELETE BOOK
    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        bookRepository.deleteById(id);
    }
}