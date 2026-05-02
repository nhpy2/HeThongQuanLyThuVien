package com.example.LibraryManagement.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

//DB mượn sách của user
public record BorrowRecordDTO(
    Long id,
    String bookTitle,
    String author,
    LocalDateTime borrowDate,
    LocalDateTime dueDate,
    BigDecimal fineAmount,
    boolean paid,
    boolean isOverdue
) {}