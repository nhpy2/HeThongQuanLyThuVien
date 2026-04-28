package com.example.LibraryManagement.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record BorrowRecordDTO(
    Long id,
    String bookTitle,
    String author,
    LocalDateTime borrowDate,
    LocalDateTime dueDate,
    BigDecimal fineAmount,
    boolean isOverdue
) {}