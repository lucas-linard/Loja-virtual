package com.market.backend.exceptions.exceptions;

public class DuplicatedImageException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public DuplicatedImageException(String message) {
        super(message);
    }

    public DuplicatedImageException(String message, Throwable cause) {
        super(message, cause);
    }
}
