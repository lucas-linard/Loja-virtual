package com.market.backend.service;

import com.market.backend.dto.CategoriaDTO;
import com.market.backend.dto.ProdutoDTO;
import com.market.backend.model.Produto;
import com.market.backend.repository.ProdutoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public Page<ProdutoDTO> findAll(Pageable pageable) {
        Page<Produto> produtoPage = produtoRepository.findAll(pageable);
        List<ProdutoDTO> produtoDTOS = getDtoListByPage(produtoPage);

        return new PageImpl<>(produtoDTOS, produtoPage.getPageable(), produtoPage.getTotalPages());
    }

    private List<ProdutoDTO> getDtoListByPage(Page<Produto> produtoPage) {
        return produtoPage.get()
                .map(produto -> ProdutoDTO.fromProdutoEntity(produto))
                .collect(Collectors.toList());
    }
}
