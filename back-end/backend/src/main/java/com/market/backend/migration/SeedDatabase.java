package com.market.backend.migration;

import com.market.backend.model.Usuario;
import com.market.backend.repository.UsuarioRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SeedDatabase {

    private final UsuarioRepository usuarioRepository;

    public SeedDatabase(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Bean
    public void seed() {
        Usuario usuario = usuarioRepository.findByUsername("admin");

        if (usuario == null) {
            Usuario user = new Usuario();
            user.setUsername("admin");
            user.setPassword("$2a$12$QcgI5wVYEkKc7wiHOYAx0uae7RuNu/4ImuUYuB0TaApp1b9DI5XTe");
            user.setRole("ROLE_ADMIN");
            user = usuarioRepository.save(user);
        }
    }
}
