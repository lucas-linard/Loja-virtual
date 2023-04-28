package com.market.backend.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException;
import com.market.backend.dto.UserLoginDTO;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private JWTUtils jwtUtils;
    private AuthenticationManager authenticationManager;

    public JWTAuthenticationFilter(JWTUtils jwtUtils,
                                   AuthenticationManager authenticationManager) {
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            UserLoginDTO userLoginDTO = new ObjectMapper()
                    .readValue(request.getInputStream(), UserLoginDTO.class);

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userLoginDTO.getUsername(), userLoginDTO.getPassword(), new ArrayList<>());

            Authentication authentication = authenticationManager.authenticate(authenticationToken);

            String token = jwtUtils.generateToken(authentication.getName(), authentication.getAuthorities());
            response.setHeader("Authorization", "Bearer " + token);

            filterChain.doFilter(request, response);
        } catch (Exception exception) {
            response.setContentType("application/json");

            /** Incorrect username or password */
            if (exception.getClass().equals(BadCredentialsException.class)) {
                response.getWriter().append(badCredentialsPayloadError());
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
            }

            /** Malformed request body */
            if (exception.getClass().equals(UnrecognizedPropertyException.class)) {
                response.getWriter().append(badRequestPayloadError());
                response.setStatus(HttpStatus.BAD_REQUEST.value());
            }
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return !(request.getServletPath().equals("/login"));
    }

    private String badCredentialsPayloadError() {
        long timestamp = System.currentTimeMillis();
        return "{\"timestamp\": " + timestamp + ", "
                + "\"status\": 401, "
                + "\"error\": \"Unauthorized!\", "
                + "\"message\": \"Incorrect username or password.\"}";
    }

    private String badRequestPayloadError() {
        long timestamp = System.currentTimeMillis();
        return "{\"timestamp\": " + timestamp + ", "
                + "\"status\": 400, "
                + "\"error\": \"Bad request!\", "
                + "\"message\": \"Malformed request body.\"}";
    }
}
