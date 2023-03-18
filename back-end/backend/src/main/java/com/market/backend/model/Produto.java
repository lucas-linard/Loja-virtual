package com.market.backend.model;

import com.market.backend.model.embedded.Variacao;
import com.market.backend.model.enums.ETipo;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Document
public class Produto implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;
    private String nome;
    private Double preco;
    private String imageUrl;
    private Integer quantidade;
    private String descricao;
    private Integer desconto;
    private boolean active = true;
    private ETipo tipo;

    private List<Categoria> categorias = new ArrayList<>();
    private Variacao variacao;

    public Produto() {

    }

    public Produto(String id, String nome, Double preco, String imageUrl, Integer quantidade, String descricao, Integer desconto, boolean active, ETipo tipo, List<Categoria> categorias, Variacao variacao) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.imageUrl = imageUrl;
        this.quantidade = quantidade;
        this.descricao = descricao;
        this.desconto = desconto;
        this.active = active;
        this.tipo = tipo;
        this.categorias = categorias;
        this.variacao = variacao;
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

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Integer getDesconto() {
        return desconto;
    }

    public void setDesconto(Integer desconto) {
        this.desconto = desconto;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public ETipo getTipo() {
        return tipo;
    }

    public void setTipo(ETipo tipo) {
        this.tipo = tipo;
    }

    public List<Categoria> getCategorias() {
        return categorias;
    }

    public void setCategorias(List<Categoria> categorias) {
        this.categorias = categorias;
    }

    public Variacao getVariacao() {
        return variacao;
    }

    public void setVariacao(Variacao variacao) {
        this.variacao = variacao;
    }
}
