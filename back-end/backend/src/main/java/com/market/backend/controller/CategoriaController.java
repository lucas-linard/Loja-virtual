package com.market.backend.controller;

import com.market.backend.dto.CategoriaDTO;
import com.market.backend.service.CategoriaService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {

    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    @GetMapping
    public ResponseEntity<Page<CategoriaDTO>> findAll(@PageableDefault(size = 100) Pageable pageable) {
        return ResponseEntity.ok(categoriaService.findAll(pageable));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<CategoriaDTO> findById(@PathVariable String id) {
        return ResponseEntity.ok(categoriaService.findById(id));
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @PostMapping
    public ResponseEntity<CategoriaDTO> create(@RequestBody CategoriaDTO categoriaDTO) {
        categoriaDTO = categoriaService.create(categoriaDTO);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(categoriaDTO.getId()).toUri();
        return ResponseEntity.created(uri).body(categoriaDTO);
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @PutMapping(value = "/{id}")
    public ResponseEntity<CategoriaDTO> update(@PathVariable String id, @RequestBody CategoriaDTO categoriaDTO) {
        return ResponseEntity.ok(categoriaService.update(id, categoriaDTO));
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        categoriaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
