package com.example.LibraryManagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.LibraryManagement.entity.BorrowRecord;

//truy vấn DL lquan đến mượn/trả sách
@Repository
public interface BorrowRecordRepository extends JpaRepository<BorrowRecord, Long> {
    // Tìm các sách user đang mượn (chưa trả)
    List<BorrowRecord> findByUserUsername(String username);

    List<BorrowRecord> findByUserUsernameAndReturnDateIsNull(String username);

        //Đếm số sách đang được mượn (chưa trả)
        long countByReturnDateIsNull();

        //Đếm sách trễ hạn (chưa trả + quá hạn)
        @Query("""
            SELECT COUNT(b)
            FROM BorrowRecord b
            WHERE b.returnDate IS NULL
            AND b.dueDate < CURRENT_TIMESTAMP
        """)
        long countLateBooks();

    
}