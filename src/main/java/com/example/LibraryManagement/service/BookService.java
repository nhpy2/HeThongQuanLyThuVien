package com.example.LibraryManagement.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.LibraryManagement.dto.BookDTO;
import com.example.LibraryManagement.entity.Book;
import com.example.LibraryManagement.repository.BookRepository;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<BookDTO> getAllBooks() {
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

    public BookDTO createBook(BookDTO dto) {
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

    public List<BookDTO> searchBooks(String keyword) {
        return bookRepository.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(keyword, keyword)
                .stream()
                .map(b -> new BookDTO(b.getId(), b.getTitle(), b.getAuthor(), b.getIsbn()))
                .toList();
    }
    // 1. Lấy chi tiết sách theo ID
    public BookDTO getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sách với ID: " + id));
        return new BookDTO(book.getId(), book.getTitle(), book.getAuthor(), book.getIsbn());
    }

    // 2. Cập nhật sách
    public BookDTO updateBook(Long id, BookDTO dto) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sách để cập nhật!"));

        // Cập nhật thông tin từ DTO
        book.setTitle(dto.title());
        book.setAuthor(dto.author());
        book.setIsbn(dto.isbn());

        book = bookRepository.save(book);
        return new BookDTO(book.getId(), book.getTitle(), book.getAuthor(), book.getIsbn());
    }

    // 3. Xóa sách
    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy sách để xóa!");
        }
        bookRepository.deleteById(id);
    }
}
