package com.market.backend.dto;

import com.market.backend.model.Categoria;

public class CategoriaDTO {

    private String id;
    private String nome;

    public CategoriaDTO() {

    }

    private CategoriaDTO(String id, String nome) {
        this.id = id;
        this.nome = nome;
    }

    public static CategoriaDTO fromCategoriaEntity(Categoria categoria) {
        return new CategoriaDTO(
                categoria.getId(),
                categoria.getNome()
        );
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
