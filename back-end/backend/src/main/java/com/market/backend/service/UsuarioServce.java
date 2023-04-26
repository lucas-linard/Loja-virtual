package com.market.backend.service;

import com.market.backend.dto.UserLoginDTO;
import com.market.backend.exceptions.exceptions.UserExistsException;
import com.market.backend.model.Usuario;
import com.market.backend.repository.UsuarioRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioServce {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder bCryptPasswordEncoder;

    public UsuarioServce(UsuarioRepository usuarioRepository, PasswordEncoder bCryptPasswordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public UserLoginDTO create(UserLoginDTO userLoginDTO) {
        Usuario user = usuarioRepository.findByUsername(userLoginDTO.getUsername());
        if (user != null) {
            throw new UserExistsException("Usuário já cadastrado.");
        }

        Usuario usuario = new Usuario();
        usuario.setUsername(userLoginDTO.getUsername());
        usuario.setPassword(bCryptPasswordEncoder.encode(userLoginDTO.getPassword()));
        usuario.setRole("ROLE_CLIENTE");
        usuario = usuarioRepository.save(usuario);

        return new UserLoginDTO(usuario);
    }
}
