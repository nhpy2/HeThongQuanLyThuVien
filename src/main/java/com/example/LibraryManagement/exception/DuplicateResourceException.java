package com.example.LibraryManagement.exception;


//Khi DL trùng (username,email..) trả về 409 - conflict
public class DuplicateResourceException extends RuntimeException{
    public DuplicateResourceException(String message){
            super(message);
        }

}
