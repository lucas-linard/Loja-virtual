package com.market.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Document
public class ItemCarrinho implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;
    private Produto produto;
    private Usuario usuario;
    private Integer quantidade;

    public ItemCarrinho() {

    }

    public ItemCarrinho(String id, Produto produto, Usuario usuario, Integer quantidade) {
        this.id = id;
        this.produto = produto;
        this.usuario = usuario;
        this.quantidade = quantidade;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }
}
