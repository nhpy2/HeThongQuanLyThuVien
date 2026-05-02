package com.example.LibraryManagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.LibraryManagement.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

}