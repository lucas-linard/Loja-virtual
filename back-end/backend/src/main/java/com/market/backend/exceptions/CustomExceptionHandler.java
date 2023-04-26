package com.market.backend.exceptions;

import com.market.backend.exceptions.exceptions.DuplicatedImageException;
import com.market.backend.exceptions.exceptions.NotFoundException;
import com.market.backend.exceptions.exceptions.ProcessImageException;
import com.market.backend.exceptions.exceptions.UserExistsException;
import com.market.backend.exceptions.model.DefaultError;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<DefaultError> notFound(NotFoundException exception,
                                                 HttpServletRequest request) {
        DefaultError error = new DefaultError(
                System.currentTimeMillis(),
                HttpStatus.NOT_FOUND.value(),
                "Não encontrado!",
                exception.getMessage(),
                request.getRequestURI()
        );

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler
    public ResponseEntity<DefaultError> duplicatedImage(DuplicatedImageException exception,
                                                        HttpServletRequest request) {
        DefaultError error = new DefaultError(
                System.currentTimeMillis(),
                HttpStatus.BAD_REQUEST.value(),
                "Imagem já existe no servidor.",
                exception.getMessage(),
                request.getRequestURI()
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler
    public ResponseEntity<DefaultError> processImage(ProcessImageException exception,
                                                     HttpServletRequest request) {
        DefaultError error = new DefaultError(
                System.currentTimeMillis(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Erro do servidor.",
                exception.getMessage(),
                request.getRequestURI()
        );

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }

    @ExceptionHandler
    public ResponseEntity<DefaultError> userExists(UserExistsException exception,
                                                   HttpServletRequest request) {
        DefaultError error = new DefaultError(
                System.currentTimeMillis(),
                HttpStatus.BAD_REQUEST.value(),
                "Username já utilizado.",
                exception.getMessage(),
                request.getRequestURI()
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
}
