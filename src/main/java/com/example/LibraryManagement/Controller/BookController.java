package com.example.LibraryManagement.Controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.LibraryManagement.dto.BookDTO;
import com.example.LibraryManagement.service.BookService;

//Api xem, tìm kiếm, quản lý sách, phân trang
//có phân quyền user/admin
@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    //Lấy chi tiết sách theo ID
    @GetMapping("/{id}")
    public ResponseEntity<BookDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(bookService.getBookById(id));
    }

    //Lấy danh sách + Phân trang + tìm kiếm
    @GetMapping("/search")
    public ResponseEntity<Page<BookDTO>> search(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size
    ) {
        return ResponseEntity.ok(bookService.searchBooks(keyword, page, size));
    }

    @GetMapping
    public ResponseEntity<Page<BookDTO>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size
    ) {
        return ResponseEntity.ok(bookService.searchBooks("", page, size));
    }

}
