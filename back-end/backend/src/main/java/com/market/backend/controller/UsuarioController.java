package com.market.backend.controller;

import com.market.backend.dto.UserLoginDTO;
import com.market.backend.service.UsuarioServce;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
public class UsuarioController {

    private final UsuarioServce usuarioServce;

    public UsuarioController(UsuarioServce usuarioServce) {
        this.usuarioServce = usuarioServce;
    }

    @PostMapping(value = "/register")
    public ResponseEntity<UserLoginDTO> create(@RequestBody UserLoginDTO userLoginDTO) {
        UserLoginDTO user = usuarioServce.create(userLoginDTO);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(user.getId()).toUri();
        return ResponseEntity.created(uri).body(user);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<Void> login() {
        return ResponseEntity.ok().build();
    }
}
