package com.market.backend.exceptions.exceptions;

public class ProcessImageException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public ProcessImageException(String message) {
        super(message);
    }

    public ProcessImageException(String message, Throwable cause) {
        super(message, cause);
    }
}
