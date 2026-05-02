package com.example.LibraryManagement.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.LibraryManagement.entity.Reservation;
import com.example.LibraryManagement.service.ReservationService;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    //user đặt giữ sách
    @PostMapping("/{bookId}")
    public ResponseEntity<String> reserve(@PathVariable Long bookId) {

        String username = SecurityContextHolder.getContext()
                .getAuthentication().getName();

        reservationService.reserve(bookId, username);

        return ResponseEntity.ok("Reservation created");
    }

    //user xem reservation của mình
    @GetMapping("/my-reservation")
    public ResponseEntity<List<Reservation>> getMy() {

        String username = SecurityContextHolder.getContext()
                .getAuthentication().getName();

        return ResponseEntity.ok(reservationService.getMyReservations(username));
    }
}
