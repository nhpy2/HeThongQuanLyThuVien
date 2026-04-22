package com.example.LibraryManagement.dto;

import java.time.Instant;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiError(
    String error,
    String message,
    List<FeildErrorDetails> details,
    String path,
    Instant timestamp
) {
    public record FieldErrorDetail(String field, String message) {

    }

}
