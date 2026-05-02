package com.example.LibraryManagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.LibraryManagement.entity.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long>{
    List<Reservation> findByUserUsername(String username);
    List<Reservation> findByBookIdAndFulfilledFalse(Long bookId);
}
