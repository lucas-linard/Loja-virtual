package com.market.backend.dto.create;

import java.io.Serializable;

public class ItemCarrinhoCreateDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private String produtoId;

    public ItemCarrinhoCreateDTO() {

    }

    public ItemCarrinhoCreateDTO(String produtoId) {
        this.produtoId = produtoId;
    }

    public String getProdutoId() {
        return produtoId;
    }

    public void setProdutoId(String produtoId) {
        this.produtoId = produtoId;
    }
}
