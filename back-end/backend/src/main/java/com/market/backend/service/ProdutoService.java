package com.market.backend.service;

import com.market.backend.dto.CategoriaDTO;
import com.market.backend.dto.ProdutoDTO;
import com.market.backend.dto.create.ProdutoCreateDTO;
import com.market.backend.model.Categoria;
import com.market.backend.model.Produto;
import com.market.backend.model.enums.ETipo;
import com.market.backend.repository.ProdutoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;
    private final CategoriaService categoriaService;

    public ProdutoService(ProdutoRepository produtoRepository, CategoriaService categoriaService) {
        this.produtoRepository = produtoRepository;
        this.categoriaService = categoriaService;
    }

    public Page<ProdutoDTO> findAll(Pageable pageable) {
        Page<Produto> produtoPage = produtoRepository.findAll(pageable);
        List<ProdutoDTO> produtoDTOS = getDtoListByPage(produtoPage);

        return new PageImpl<>(produtoDTOS, produtoPage.getPageable(), produtoPage.getTotalPages());
    }

    public ProdutoDTO findById(String id) {
        return ProdutoDTO.fromProdutoEntity(produtoRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Not found!")
        ));
    }

    public ProdutoDTO create(ProdutoCreateDTO produtoCreateDTO) {
        if (produtoCreateDTO.getTipo().equals(ETipo.DIGITAL)) {
            produtoCreateDTO.setQuantidade(Integer.MAX_VALUE);
        }

        Produto produto = fromProdutoCreateDto(produtoCreateDTO);
        produto = produtoRepository.save(produto);

        return ProdutoDTO.fromProdutoEntity(produto);
    }

    private List<ProdutoDTO> getDtoListByPage(Page<Produto> produtoPage) {
        return produtoPage.get()
                .map(produto -> ProdutoDTO.fromProdutoEntity(produto))
                .collect(Collectors.toList());
    }

    private Produto fromProdutoCreateDto(ProdutoCreateDTO produtoCreateDTO) {
        List<Categoria> categorias = new ArrayList<>();

        for (String id : produtoCreateDTO.getCategoriaIds()) {
            CategoriaDTO categoriaDTO = categoriaService.findById(id);
            categorias.add(new Categoria(categoriaDTO.getId(), categoriaDTO.getNome()));
        }

        return new Produto(
                null,
                produtoCreateDTO.getNome(),
                produtoCreateDTO.getPreco(),
                null,
                produtoCreateDTO.getQuantidade(),
                produtoCreateDTO.getDescricao(),
                produtoCreateDTO.getDesconto(),
                produtoCreateDTO.getTipo(),
                categorias,
                produtoCreateDTO.getVariacao()
        );
    }
}
