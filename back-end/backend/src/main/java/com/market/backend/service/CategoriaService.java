package com.market.backend.service;

import com.market.backend.dto.CategoriaDTO;
import com.market.backend.exceptions.exceptions.NotFoundException;
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
                .orElseThrow(() -> new NotFoundException("Não encontrado. Id: " + id)));
    }

    public CategoriaDTO create(CategoriaDTO categoriaDTO) {
        Categoria categoria = fromDto(categoriaDTO);
        categoria.setId(null);
        categoria = categoriaRepository.save(categoria);

        return CategoriaDTO.fromCategoriaEntity(categoria);
    }

    public CategoriaDTO update(String id, CategoriaDTO categoriaDTO) {
        CategoriaDTO aux = findById(id);
        Categoria categoria = fromDto(aux);
        updateFields(categoria, categoriaDTO);
        categoria = categoriaRepository.save(categoria);

        return CategoriaDTO.fromCategoriaEntity(categoria);
    }

    public void delete(String id) {
        CategoriaDTO aux = findById(id);
        Categoria categoria = fromDto(aux);
        categoriaRepository.deleteById(categoria.getId());
    }

    private List<CategoriaDTO> getListByPage(Page<Categoria> page) {
        return page.get()
                .map(categoria -> CategoriaDTO.fromCategoriaEntity(categoria))
                .collect(Collectors.toList());
    }

    public Categoria fromDto(CategoriaDTO categoriaDTO) {
        return new Categoria(categoriaDTO.getId(), categoriaDTO.getNome());
    }

    private void updateFields(Categoria outdated, CategoriaDTO updated) {
        outdated.setNome(updated.getNome());
    }
}
