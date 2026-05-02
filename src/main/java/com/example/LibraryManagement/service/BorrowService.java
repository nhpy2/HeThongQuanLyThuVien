package com.example.LibraryManagement.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.LibraryManagement.dto.BorrowRecordDTO;
import com.example.LibraryManagement.entity.Book;
import com.example.LibraryManagement.entity.BookCopy;
import com.example.LibraryManagement.entity.BookStatus;
import com.example.LibraryManagement.entity.BorrowRecord;
import com.example.LibraryManagement.entity.User;
import com.example.LibraryManagement.repository.BookCopyRepository;
import com.example.LibraryManagement.repository.BorrowRecordRepository;
import com.example.LibraryManagement.repository.UserRepository;
import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;

//xử lý mượn/trả, tính tiền phạt
@Service
public class BorrowService {

    private final BookCopyRepository bookCopyRepository;
    private final BorrowRecordRepository borrowRecordRepository;
    private final UserRepository userRepository;

    public BorrowService(BookCopyRepository bookCopyRepository,
            BorrowRecordRepository borrowRecordRepository,
            UserRepository userRepository) {
        this.bookCopyRepository = bookCopyRepository;
        this.borrowRecordRepository = borrowRecordRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public void borrowBook(Long bookId, String username) {
        //Tìm User
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User không tồn tại"));

        //Tìm cuốn sách khả dụng
        //Sử dụng PESSIMISTIC_WRITE để khóa row này lại, không cho transaction khác xen vào
        BookCopy copy = bookCopyRepository.findFirstByBookIdAndStatus(bookId, BookStatus.AVAILABLE)
                .orElseThrow(() -> new RuntimeException("Sách hiện tại đã hết hoặc đang được mượn!"));

        //Cập nhật trạng thái sách
        copy.setStatus(BookStatus.BORROWED);
        bookCopyRepository.save(copy);

        //Tạo record mượn sách
        BorrowRecord record = new BorrowRecord();
        record.setBookCopy(copy);
        record.setUser(user);
        record.setBorrowDate(LocalDateTime.now());
        record.setDueDate(LocalDateTime.now().plusDays(14)); // Mặc định cho mượn 14 ngày

        borrowRecordRepository.save(record);
        bookCopyRepository.save(copy);
        
        
    }

    public List<BorrowRecordDTO> getMyBorrowedBooks(String username) {
        return borrowRecordRepository.findByUserUsernameAndReturnDateIsNull(username)
                .stream()
                .map(record -> new BorrowRecordDTO(
                    record.getId(),
                    record.getBookCopy().getBook().getTitle(),
                    record.getBookCopy().getBook().getAuthor(),
                    record.getBorrowDate(),
                    record.getDueDate(),
                    record.getFineAmount(),
                    record.isPaid(),
                    record.getDueDate().isBefore(LocalDateTime.now())
                ))
                .toList();
    }

    public List<BorrowRecordDTO> getMyBorrowHistory(String username) {

    return borrowRecordRepository.findByUserUsername(username)
            .stream()
            .map(r -> new BorrowRecordDTO(
                r.getId(),
                r.getBookCopy().getBook().getTitle(),
                r.getBookCopy().getBook().getAuthor(),
                r.getBorrowDate(),
                r.getDueDate(),
                r.getFineAmount(),
                r.isPaid(),
                r.getReturnDate() != null &&
                r.getReturnDate().isAfter(r.getDueDate())
            ))
            .toList();
    }

    //Định nghĩa mức phạt: 5.000 VNĐ / ngày trễ
    private static final BigDecimal FINE_PER_DAY = BigDecimal.valueOf(5000);

    @Transactional
    public void returnBook(Long recordId, String username) {
        //Tìm bản ghi mượn sách
        BorrowRecord record = borrowRecordRepository.findById(recordId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bản ghi mượn sách!"));

        //Kiểm tra quyền sở hữu (Bảo mật)
        if (!record.getUser().getUsername().equals(username)) {
            throw new RuntimeException("Bạn không thể trả sách của người khác!");
        }

        //Kiểm tra xem đã trả chưa
        if (record.getReturnDate() != null) {
            throw new RuntimeException("Cuốn sách này đã được trả rồi!");
        }

        //Cập nhật ngày trả và tính tiền phạt
        LocalDateTime returnDate = LocalDateTime.now();
        record.setReturnDate(returnDate);

        //Tính toán tiền phạt nếu trễ hạn
        if (returnDate.isAfter(record.getDueDate())) {
            // Tính số ngày trễ
            long daysLate = ChronoUnit.DAYS.between(record.getDueDate(), returnDate);
            // Tính số tiền: ngày trễ * đơn giá
            BigDecimal fine = BigDecimal.valueOf(daysLate).multiply(FINE_PER_DAY);
            record.setFineAmount(fine);
        } else {
            //Nếu trả đúng hạn, tiền phạt là 0
            record.setFineAmount(BigDecimal.ZERO);
        }

        //Cập nhật trạng thái cuốn sách thành AVAILABLE
        BookCopy copy = record.getBookCopy();
        copy.setStatus(BookStatus.AVAILABLE);

        //Lưu thay đổi
        bookCopyRepository.save(copy);
        borrowRecordRepository.save(record);
    }

    
}
