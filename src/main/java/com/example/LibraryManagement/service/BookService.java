package com.example.LibraryManagement.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.LibraryManagement.dto.BookDTO;
import com.example.LibraryManagement.entity.Book;
import com.example.LibraryManagement.entity.BookCopy;
import com.example.LibraryManagement.entity.BookStatus;
import com.example.LibraryManagement.repository.BookCopyRepository;
import com.example.LibraryManagement.repository.BookRepository;

//xử lý logic lquan đến sách
@Service
public class BookService {

    private final BookCopyRepository bookCopyRepository;
    private final BookRepository bookRepository; //query DB

    public BookService(BookRepository bookRepository,
         BookCopyRepository bookCopyRepository
    ) {
        this.bookRepository = bookRepository;
        this.bookCopyRepository = bookCopyRepository;
    }

    public List<BookDTO> getAllBooks() { //ko trả enity trực tiếp
        return bookRepository.findAll()
                .stream()
                .map(b -> new BookDTO(
                b.getId(),
                b.getTitle(),
                b.getAuthor(),
                b.getIsbn(),
                b.getAvailableQuantity()
        ))
                .toList();
    }

    public BookDTO createBook(BookDTO dto) {
        Book book = new Book();

        book.setTitle(dto.title());
        book.setAuthor(dto.author());
        book.setIsbn(dto.isbn());
        book.setAvailableQuantity(dto.availableQuantity());

        book = bookRepository.save(book);

        for (int i = 0; i < book.getAvailableQuantity(); i++) {
            BookCopy copy = new BookCopy();
            copy.setBook(book);
            copy.setStatus(BookStatus.AVAILABLE);

            bookCopyRepository.save(copy);
        }

        return new BookDTO(
                book.getId(),
                book.getTitle(),
                book.getAuthor(),
                book.getIsbn(),
                book.getAvailableQuantity()
        );
    }

    //search 
    public Page<BookDTO> searchBooks(String keyword, int page, int size) {
        PageRequest pageable = PageRequest.of(page, size);

        Page<Book> books = (keyword == null || keyword.isBlank())
            ? bookRepository.findAll(pageable)
            : bookRepository.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(
                keyword, keyword, pageable);

        return books.map(b -> new BookDTO(
            b.getId(),
            b.getTitle(),
            b.getAuthor(),
            b.getIsbn(),
            b.getAvailableQuantity()
        ));
    }

    //Lấy chi tiết sách theo ID
    public BookDTO getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sách với ID: " + id));
        return new BookDTO(book.getId(), book.getTitle(), book.getAuthor(), book.getIsbn(), book.getAvailableQuantity());
    }

    //Cập nhật sách
    public BookDTO updateBook(Long id, BookDTO dto) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sách để cập nhật!"));

        //Cập nhật thông tin từ DTO
        book.setTitle(dto.title());
        book.setAuthor(dto.author());
        book.setIsbn(dto.isbn());

        book = bookRepository.save(book);
        return new BookDTO(book.getId(), book.getTitle(), book.getAuthor(), book.getIsbn(), book.getAvailableQuantity());
    }

    

    //Xóa sách
    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy sách để xóa!");
        }
        bookRepository.deleteById(id);
    }

}
