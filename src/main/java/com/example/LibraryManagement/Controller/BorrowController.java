package com.example.LibraryManagement.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.LibraryManagement.dto.BorrowRecordDTO;
import com.example.LibraryManagement.service.BorrowService;

//Xử lý: mượn sách -> xem sách đang mượn -> trả sách
@RestController
@RequestMapping("/api/borrow")
public class BorrowController {

    private final BorrowService borrowService;

    public BorrowController(BorrowService borrowService) {
        this.borrowService = borrowService;
    }

    //mượn sách
    @PostMapping("/{bookId}")
    public ResponseEntity<String> borrowBook(@PathVariable Long bookId) {
        // Lấy username từ token JWT đã được xác thực qua SecurityContext
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        try {
            borrowService.borrowBook(bookId, username);
            return ResponseEntity.ok("Mượn sách thành công.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    //ds sách user đang mượn
    @GetMapping("/my")
    public ResponseEntity<List<BorrowRecordDTO>> getMyBorrowedBooks() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        List<BorrowRecordDTO> myBooks = borrowService.getMyBorrowedBooks(username);
        return ResponseEntity.ok(myBooks);
    }

    //trả sách
    @PostMapping("/return/{recordId}")
    public ResponseEntity<String> returnBook(@PathVariable Long recordId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        try {
            borrowService.returnBook(recordId, username);
            return ResponseEntity.ok("Trả sách thành công. Vui lòng kiểm tra mục 'Lịch sử' để xem tiền phạt (nếu có).");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
