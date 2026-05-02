package com.example.LibraryManagement.Controller;

import java.util.Map;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.LibraryManagement.repository.BookRepository;
import com.example.LibraryManagement.repository.BorrowRecordRepository;

@RestController
@RequestMapping("/api/admin/dashboard")
@PreAuthorize("hasRole('ADMIN')")
public class AdminDashboardController {

    private final BookRepository bookRepository;
    private final BorrowRecordRepository borrowRepository;

    public AdminDashboardController(BookRepository bookRepository,
                                    BorrowRecordRepository borrowRepository) {
        this.bookRepository = bookRepository;
        this.borrowRepository = borrowRepository;
    }

    @GetMapping
    public Map<String, Object> stats() {
        long totalBooks = bookRepository.count();
        long borrowed = borrowRepository.countByReturnDateIsNull();
        long late = borrowRepository.countLateBooks();

        return Map.of(
            "totalBooks", totalBooks,
            "borrowed", borrowed,
            "late", late
        );
    }
}