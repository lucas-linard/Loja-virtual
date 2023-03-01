package com.market.backend.service;

import com.market.backend.dto.CategoriaDTO;
import com.market.backend.model.Categoria;
import com.market.backend.repository.CategoriaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public Page<CategoriaDTO> findAll(Pageable pageable) {
        Page<Categoria> categoriaPage = categoriaRepository.findAll(pageable);
        List<CategoriaDTO> categoriaDTOList = getListByPage(categoriaPage);

        return new PageImpl<>(categoriaDTOList, categoriaPage.getPageable(), categoriaPage.getTotalPages());
    }

    public CategoriaDTO findById(String id) {
        return CategoriaDTO.fromCategoriaEntity(categoriaRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Not found!")));
    }

    private List<CategoriaDTO> getListByPage(Page<Categoria> page) {
        return page.get()
                .map(categoria -> CategoriaDTO.fromCategoriaEntity(categoria))
                .collect(Collectors.toList());
    }
}
