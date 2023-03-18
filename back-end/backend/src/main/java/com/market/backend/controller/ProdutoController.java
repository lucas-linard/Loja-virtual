package com.market.backend.controller;

import com.market.backend.dto.ImageStringDTO;
import com.market.backend.dto.ProdutoDTO;
import com.market.backend.dto.create.ProdutoCreateDTO;
import com.market.backend.service.ProdutoService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @GetMapping
    public ResponseEntity<Page<ProdutoDTO>> findAll(@PageableDefault(size = 100) Pageable pageable) {
        return ResponseEntity.ok(produtoService.findAll(pageable));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<ProdutoDTO> findById(@PathVariable String id) {
        return ResponseEntity.ok(produtoService.findById(id));
    }

    @PostMapping
    public ResponseEntity<ProdutoDTO> create(@RequestBody ProdutoCreateDTO produtoCreateDTO) {
        ProdutoDTO produtoDTO = produtoService.create(produtoCreateDTO);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(produtoDTO.getId()).toUri();
        return ResponseEntity.created(uri).body(produtoDTO);
    }

    @PostMapping(value = "/upload-image")
    public ResponseEntity<ImageStringDTO> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        ImageStringDTO imageStringDTO = produtoService.uploadImage(file);
        return ResponseEntity.ok(imageStringDTO);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<ProdutoDTO> update(@PathVariable String id, @RequestBody ProdutoCreateDTO produtoDTO) {
        ProdutoDTO response = produtoService.update(id, produtoDTO);
        return ResponseEntity.ok(response);
    }
}
