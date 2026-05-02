package com.example.LibraryManagement.Controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.LibraryManagement.entity.Publisher;
import com.example.LibraryManagement.repository.PublisherRepository;


@RestController
@RequestMapping("/api/admin/publishers")
@PreAuthorize("hasRole('ADMIN')")
public class AdminPublisherController {

    private final PublisherRepository repo;

    public AdminPublisherController(PublisherRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public Publisher create(@RequestBody Publisher p) {
        return repo.save(p);
    }

    @GetMapping
    public List<Publisher> getAll() {
        return repo.findAll();
    }
}
