package com.example.LibraryManagement.exception;


//Ko tìm thấy resource(user,...) trả về lỗi 404
public class ResourceNotFoundException extends RuntimeException{
    public ResourceNotFoundException(String message){
        super(message);
    }

    public ResourceNotFoundException(String resource, Object id) {
        super(resource + "Không tồn tại với id: " + id);
    }
}
