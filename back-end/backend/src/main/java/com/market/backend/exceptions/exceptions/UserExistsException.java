package com.market.backend.exceptions.exceptions;

public class UserExistsException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public UserExistsException(String message) {
        super(message);
    }

    public UserExistsException(String message, Throwable cause) {
        super(message, cause);
    }
}
