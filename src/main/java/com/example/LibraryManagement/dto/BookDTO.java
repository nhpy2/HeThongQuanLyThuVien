package com.example.LibraryManagement.dto;

//tránh trả DL sách entity trực tiếp
public record BookDTO(
    Long id,
    String title,
    String author,
    String isbn,
    int availableQuantity
) {

}
