package com.example.LibraryManagement.Controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.LibraryManagement.entity.Author;
import com.example.LibraryManagement.repository.AuthorRepository;


@RestController
@RequestMapping("/api/admin/authors")
@PreAuthorize("hasRole('ADMIN')")
public class AdminAuthorController {

    private final AuthorRepository repo;

    public AdminAuthorController(AuthorRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public Author create(@RequestBody Author a) {
        return repo.save(a);
    }

    @GetMapping
    public List<Author> getAll() {
        return repo.findAll();
    }
}
