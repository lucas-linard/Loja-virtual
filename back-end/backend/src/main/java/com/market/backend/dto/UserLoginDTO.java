package com.market.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.market.backend.model.Usuario;

import java.io.Serializable;

public class UserLoginDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;
    private String username;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private String role;

    public UserLoginDTO() {

    }

    public UserLoginDTO(String id, String username, String password, String role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public UserLoginDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.username = usuario.getUsername();
        this.password = usuario.getPassword();
        this.role = usuario.getRole();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
