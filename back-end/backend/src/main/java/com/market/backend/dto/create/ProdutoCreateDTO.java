package com.market.backend.dto.create;

import com.market.backend.model.embedded.Variacao;
import com.market.backend.model.enums.ETipo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class ProdutoCreateDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private String nome;
    private Double preco;
    private String imageUrl;
    private Integer quantidade;
    private String descricao;
    private Integer desconto;
    private ETipo tipo;
    private List<String> categoriaIds = new ArrayList<>();
    private Variacao variacao;

    public ProdutoCreateDTO() {

    }

    public ProdutoCreateDTO(String nome, Double preco, String imageUrl, Integer quantidade, String descricao, Integer desconto, ETipo tipo, List<String> categoriaIds, Variacao variacao) {
        this.nome = nome;
        this.preco = preco;
        this.imageUrl = imageUrl;
        this.quantidade = quantidade;
        this.descricao = descricao;
        this.desconto = desconto;
        this.tipo = tipo;
        this.categoriaIds = categoriaIds;
        this.variacao = variacao;
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

    public ETipo getTipo() {
        return tipo;
    }

    public void setTipo(ETipo tipo) {
        this.tipo = tipo;
    }

    public List<String> getCategoriaIds() {
        return categoriaIds;
    }

    public void setCategoriaIds(List<String> categoriaIds) {
        this.categoriaIds = categoriaIds;
    }

    public Variacao getVariacao() {
        return variacao;
    }

    public void setVariacao(Variacao variacao) {
        this.variacao = variacao;
    }
}
