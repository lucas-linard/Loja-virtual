package com.market.backend.controller;

import com.market.backend.dto.create.ItemCarrinhoCreateDTO;
import com.market.backend.model.ItemCarrinho;
import com.market.backend.service.ItemCarrinhoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/cart")
public class ItemCarrinhoController {

    private final ItemCarrinhoService itemCarrinhoService;

    public ItemCarrinhoController(ItemCarrinhoService itemCarrinhoService) {
        this.itemCarrinhoService = itemCarrinhoService;
    }

    @GetMapping
    public ResponseEntity<List<ItemCarrinho>> findAllByUsuario() {
        return ResponseEntity.ok(itemCarrinhoService.findAllByUsuario());
    }

    @PostMapping
    public ResponseEntity<ItemCarrinho> create(@RequestBody ItemCarrinhoCreateDTO itemCarrinhoCreateDTO) {
        ItemCarrinho itemCarrinho = itemCarrinhoService.create(itemCarrinhoCreateDTO);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(itemCarrinho.getId()).toUri();
        return ResponseEntity.created(uri).body(itemCarrinho);
    }

    @PutMapping("/add/{id}")
    public ResponseEntity<ItemCarrinho> addQnt(@PathVariable String id) {
        ItemCarrinho itemCarrinho = itemCarrinhoService.add(id);
        return ResponseEntity.ok(itemCarrinho);
    }

    @PutMapping("/rem/{id}")
    public ResponseEntity<ItemCarrinho> remQnt(@PathVariable String id) {
        ItemCarrinho itemCarrinho = itemCarrinhoService.rem(id);
        return ResponseEntity.ok(itemCarrinho);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        itemCarrinhoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
