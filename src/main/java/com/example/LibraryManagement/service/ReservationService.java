package com.example.LibraryManagement.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.LibraryManagement.entity.Book;
import com.example.LibraryManagement.entity.Reservation;
import com.example.LibraryManagement.entity.User;
import com.example.LibraryManagement.repository.BookRepository;
import com.example.LibraryManagement.repository.ReservationRepository;
import com.example.LibraryManagement.repository.UserRepository;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    public ReservationService(
        ReservationRepository reservationRepository,
        UserRepository userRepository,
        BookRepository bookRepository
    ) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }

    //đặt trước sách
    public void reserve(Long bookId, String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        Reservation r = new Reservation();
        r.setUser(user);
        r.setBook(book);
        r.setReservedAt(LocalDateTime.now());
        r.setFulfilled(false);

        reservationRepository.save(r);
    }

    //lấy ds sách đặt trước của user
    public List<Reservation> getMyReservations(String username) {
        return reservationRepository.findByUserUsername(username);
    }

    // ADMIN: đánh dấu đã xử lý reservation
    public void fulfill(Long reservationId) {
        Reservation r = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        r.setFulfilled(true);
        reservationRepository.save(r);
    }
}
