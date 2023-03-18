package com.market.backend.dto;

import com.market.backend.model.Categoria;
import com.market.backend.model.Produto;
import com.market.backend.model.embedded.Variacao;
import com.market.backend.model.enums.ETipo;

import java.util.ArrayList;
import java.util.List;

public class ProdutoDTO {
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
}
