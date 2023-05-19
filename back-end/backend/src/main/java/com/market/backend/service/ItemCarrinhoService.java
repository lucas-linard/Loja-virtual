package com.market.backend.service;

import com.market.backend.dto.ProdutoDTO;
import com.market.backend.dto.create.ItemCarrinhoCreateDTO;
import com.market.backend.exceptions.exceptions.NotFoundException;
import com.market.backend.model.ItemCarrinho;
import com.market.backend.model.Produto;
import com.market.backend.model.Usuario;
import com.market.backend.repository.ItemCarrinhoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemCarrinhoService {

    private final ItemCarrinhoRepository itemCarrinhoRepository;
    private final ProdutoService produtoService;
    private final ServiceUtil serviceUtil;

    public ItemCarrinhoService(ItemCarrinhoRepository itemCarrinhoRepository, ProdutoService produtoService, ServiceUtil serviceUtil) {
        this.itemCarrinhoRepository = itemCarrinhoRepository;
        this.produtoService = produtoService;
        this.serviceUtil = serviceUtil;
    }

    public List<ItemCarrinho> findAllByUsuario() {
        Usuario usuario = serviceUtil.findCurrentUsuario();

        return itemCarrinhoRepository.findAllByUsuario(usuario);
    }

    public ItemCarrinho create(ItemCarrinhoCreateDTO itemCarrinhoCreateDTO) {
        ProdutoDTO produtoDTO = produtoService.findById(itemCarrinhoCreateDTO.getProdutoId());
        Produto produto = produtoService.fromProdutoDto(produtoDTO);

        Usuario usuario = serviceUtil.findCurrentUsuario();

        ItemCarrinho itemCarrinho = new ItemCarrinho();
        itemCarrinho.setUsuario(usuario);
        itemCarrinho.setProduto(produto);
        itemCarrinho.setQuantidade(1);

        itemCarrinho = itemCarrinhoRepository.save(itemCarrinho);

        return itemCarrinho;
    }

    public ItemCarrinho add(String itemCarrinhoId) {
        ItemCarrinho itemCarrinho = itemCarrinhoRepository.findById(itemCarrinhoId)
                .orElseThrow(() -> new NotFoundException("ItemCarrinho nao encontrado. Id: " + itemCarrinhoId));

        Integer qnt = itemCarrinho.getQuantidade() + 1;
        itemCarrinho.setQuantidade(qnt);
        itemCarrinho = itemCarrinhoRepository.save(itemCarrinho);
        return itemCarrinho;
    }

    public ItemCarrinho rem(String itemCarrinhoId) {
        ItemCarrinho itemCarrinho = itemCarrinhoRepository.findById(itemCarrinhoId)
                .orElseThrow(() -> new NotFoundException("ItemCarrinho nao encontrado. Id: " + itemCarrinhoId));

        if (itemCarrinho.getQuantidade() == 1) {
            return null;
        }

        Integer qnt = itemCarrinho.getQuantidade() - 1;
        itemCarrinho.setQuantidade(qnt);
        itemCarrinho = itemCarrinhoRepository.save(itemCarrinho);
        return itemCarrinho;
    }

    public void delete(String itemCarrinhoId) {
        ItemCarrinho itemCarrinho = itemCarrinhoRepository.findById(itemCarrinhoId)
                .orElseThrow(() -> new NotFoundException("ItemCarrinho nao encontrado. Id: " + itemCarrinhoId));

        itemCarrinhoRepository.delete(itemCarrinho);
    }
}
