package com.example.LibraryManagement.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.LibraryManagement.dto.BookDTO;
import com.example.LibraryManagement.service.BookService;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService){
        this.bookService = bookService;
    }

    //lấy danh sách sách
    @GetMapping
    public ResponseEntity<List<BookDTO>> getAll(){
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    //thêm sách (admin)
    @PostMapping
    public ResponseEntity<BookDTO> create(@RequestBody BookDTO dto){
        return ResponseEntity.ok(bookService.createBook(dto));
    }
}
