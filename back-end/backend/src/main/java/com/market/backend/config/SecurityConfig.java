package com.market.backend.config;

import com.market.backend.security.JWTAuthenticationFilter;
import com.market.backend.security.JWTAuthorizationFilter;
import com.market.backend.security.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collections;

@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableWebSecurity
@Configuration
public class SecurityConfig {

    /** Ajustar o array qnd implementar authentication, authorization */
    private static final String[] PUBLIC_ENDPOINTS = {
        "/register",
        "/login"
    };

    private static final String[] PUBLIC_ENDPOINTS_GET = {
            "/produtos/**",
            "/categorias/**"
    };

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AuthenticationConfiguration authenticationConfiguration;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        httpSecurity.csrf().disable();
        httpSecurity.cors().configurationSource(corsConfigurationSource());
        httpSecurity.authorizeHttpRequests((requests) -> requests
                .requestMatchers(PUBLIC_ENDPOINTS)
                .permitAll()
                .requestMatchers(HttpMethod.GET, PUBLIC_ENDPOINTS_GET)
                .permitAll()
                .anyRequest()
                .authenticated()
        ).httpBasic().disable();

       httpSecurity.addFilterAfter(new JWTAuthenticationFilter(jwtUtils, authenticationManager(authenticationConfiguration)), UsernamePasswordAuthenticationFilter.class);
       httpSecurity.addFilterBefore(new JWTAuthorizationFilter(jwtUtils), UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    private CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(Collections.singletonList("*"));
        corsConfiguration.setAllowedMethods(Collections.singletonList("*"));
        corsConfiguration.setAllowedHeaders(Collections.singletonList("*"));
        corsConfiguration.setExposedHeaders(Collections.singletonList("Authorization"));

        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);

        return source;
    }
}
