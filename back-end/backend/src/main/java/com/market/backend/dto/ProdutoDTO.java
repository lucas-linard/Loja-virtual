package com.market.backend.dto;

import com.market.backend.model.Categoria;
import com.market.backend.model.Produto;
import com.market.backend.model.embedded.Variacao;
import com.market.backend.model.enums.ETipo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class ProdutoDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;
    private String nome;
    private Double preco;
    private String imageUrl;
    private Integer quantidade;
    private String descricao;
    private Integer desconto;
    private ETipo tipo;
    private List<CategoriaDTO> categorias;
    private Variacao variacao;

    public ProdutoDTO() {

    }

    private ProdutoDTO(String id, String nome, Double preco, String imageUrl, Integer quantidade, String descricao, Integer desconto, ETipo tipo, List<CategoriaDTO> categorias, Variacao variacao) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.imageUrl = imageUrl;
        this.quantidade = quantidade;
        this.descricao = descricao;
        this.desconto = desconto;
        this.tipo = tipo;
        this.categorias = categorias;
        this.variacao = variacao;
    }

    public static ProdutoDTO fromProdutoEntity(Produto produto) {
        List<CategoriaDTO> categoriaDTOS = new ArrayList<>();
        for (Categoria categoria : produto.getCategorias()) {
            categoriaDTOS.add(CategoriaDTO.fromCategoriaEntity(categoria));
        }

        return new ProdutoDTO(
                produto.getId(),
                produto.getNome(),
                produto.getPreco(),
                produto.getImageUrl(),
                produto.getQuantidade(),
                produto.getDescricao(),
                produto.getDesconto(),
                produto.getTipo(),
                categoriaDTOS,
                produto.getVariacao()
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

    public List<CategoriaDTO> getCategorias() {
        return categorias;
    }

    public void setCategorias(List<CategoriaDTO> categorias) {
        this.categorias = categorias;
    }

    public Variacao getVariacao() {
        return variacao;
    }

    public void setVariacao(Variacao variacao) {
        this.variacao = variacao;
    }
}
