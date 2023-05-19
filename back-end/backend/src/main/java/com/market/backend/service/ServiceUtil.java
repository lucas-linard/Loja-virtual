package com.market.backend.service;

import com.market.backend.model.Usuario;
import com.market.backend.repository.UsuarioRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class ServiceUtil {

    private final UsuarioRepository usuarioRepository;

    public ServiceUtil(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario findCurrentUsuario() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String username = (String) authentication.getPrincipal();

        Usuario usuario = usuarioRepository.findByUsername(username);

        if (usuario == null) {
            throw new UsernameNotFoundException(username);
        }

        return usuario;
    }
}
