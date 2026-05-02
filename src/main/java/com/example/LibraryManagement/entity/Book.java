package com.example.LibraryManagement.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

//đại diện cho đầu sách 
@Entity
public class Book {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String auth;
    private String isbn;
    private int availableQuantity; //số lượng sách có thể mượn
    
    //1 đầu sách có n bản 
    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    @ManyToOne
    private Author author;

    @ManyToOne
    private Category category;

    @ManyToOne
    private Publisher publisher;
    
    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    private List<BookCopy> Copies;

    public Book() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAuthor() {
        return auth;
    }

    public void setAuthor(String auth) {
        this.auth = auth;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getAvailableQuantity() {
    return availableQuantity;
    }

    public void setAvailableQuantity(int availableQuantity) {
        this.availableQuantity = availableQuantity;
    }

}
