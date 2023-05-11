package com.market.backend.service;

import com.market.backend.dto.CategoriaDTO;
import com.market.backend.dto.ImageStringDTO;
import com.market.backend.dto.ProdutoDTO;
import com.market.backend.dto.create.ProdutoCreateDTO;
import com.market.backend.exceptions.exceptions.DuplicatedImageException;
import com.market.backend.exceptions.exceptions.NotFoundException;
import com.market.backend.model.Categoria;
import com.market.backend.model.Produto;
import com.market.backend.model.enums.ETipo;
import com.market.backend.repository.ProdutoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;
    private final CategoriaService categoriaService;

    private static final String FOLDER_PATH = "C:\\temp\\loja-virtual-images\\";

    public ProdutoService(ProdutoRepository produtoRepository, CategoriaService categoriaService) {
        this.produtoRepository = produtoRepository;
        this.categoriaService = categoriaService;
    }

    public List<ProdutoDTO> findByCategoria(CategoriaDTO categoriaDTO) {
        Categoria categoria = categoriaService.fromDto(categoriaDTO);
        return produtoRepository.findByCategorias(categoria)
                .stream()
                .map(produto -> ProdutoDTO.fromProdutoEntity(produto))
                .collect(Collectors.toList());
    }

    public Page<ProdutoDTO> findAll(Pageable pageable) {
        Page<Produto> produtoPage = produtoRepository.findAll(pageable);
        List<ProdutoDTO> produtoDTOS = getDtoListByPage(produtoPage);

        return new PageImpl<>(produtoDTOS, produtoPage.getPageable(), produtoPage.getTotalPages());
    }

    public ProdutoDTO findById(String id) {
        return ProdutoDTO.fromProdutoEntity(produtoRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Não encontrado. Id: " + id)
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

    public ImageStringDTO uploadImage(MultipartFile file) throws IOException {
        Path path = Paths.get(FOLDER_PATH + file.getOriginalFilename());
        if (Files.exists(path)) {
            throw new DuplicatedImageException("Path da imagem: " + FOLDER_PATH + file.getOriginalFilename());
        }

        try {
            file.transferTo(new File(FOLDER_PATH + file.getOriginalFilename()));
        } catch (Exception exception) {
            exception.printStackTrace();
            throw new RuntimeException("Erro ao salvar a imagem.");
        }

        return new ImageStringDTO(FOLDER_PATH + file.getOriginalFilename());
    }

    public ProdutoDTO update(String id, ProdutoCreateDTO newProdutoCreateDTO) {
        ProdutoDTO produtoDtoOld = findById(id);
        Produto produto = fromProdutoDto(produtoDtoOld);

        updateData(produto, newProdutoCreateDTO);
        produto = produtoRepository.save(produto);
        return ProdutoDTO.fromProdutoEntity(produto);
    }

    public void delete(String id) {
        findById(id);
        produtoRepository.deleteById(id);
    }

    private void updateData(Produto oldInstance, ProdutoCreateDTO newInstance) {
        oldInstance.setNome(newInstance.getNome());
        oldInstance.setPreco(newInstance.getPreco());
        oldInstance.setImageUrl(newInstance.getImageUrl());
        oldInstance.setQuantidade(newInstance.getQuantidade());
        oldInstance.setDescricao(newInstance.getDescricao());
        oldInstance.setDesconto(newInstance.getDesconto());
        oldInstance.setTipo(newInstance.getTipo());
        oldInstance.setCategorias(getCategoriasFromDto(newInstance));
        oldInstance.setVariacao(newInstance.getVariacao());
    }

    private List<ProdutoDTO> getDtoListByPage(Page<Produto> produtoPage) {
        return produtoPage.get()
                .map(produto -> ProdutoDTO.fromProdutoEntity(produto))
                .collect(Collectors.toList());
    }

    private Produto fromProdutoCreateDto(ProdutoCreateDTO produtoCreateDTO) {
        List<Categoria> categorias = getCategoriasFromDto(produtoCreateDTO);

        return new Produto(
                null,
                produtoCreateDTO.getNome(),
                produtoCreateDTO.getPreco(),
                produtoCreateDTO.getImageUrl(),
                produtoCreateDTO.getQuantidade(),
                produtoCreateDTO.getDescricao(),
                produtoCreateDTO.getDesconto(),
                produtoCreateDTO.getTipo(),
                categorias,
                produtoCreateDTO.getVariacao()
        );
    }

    private Produto fromProdutoDto(ProdutoDTO produtoDTO) {
        List<Categoria> categorias = new ArrayList<>();

        produtoDTO.getCategorias().forEach(categoriaDTO -> {
            categorias.add(categoriaService.fromDto(categoriaDTO));
        });

        return new Produto(
                produtoDTO.getId(),
                produtoDTO.getNome(),
                produtoDTO.getPreco(),
                produtoDTO.getImageUrl(),
                produtoDTO.getQuantidade(),
                produtoDTO.getDescricao(),
                produtoDTO.getDesconto(),
                produtoDTO.getTipo(),
                categorias,
                produtoDTO.getVariacao()
        );
    }

    private List<Categoria> getCategoriasFromDto(ProdutoCreateDTO produtoCreateDTO) {
        List<Categoria> categorias = new ArrayList<>();

        for (String id : produtoCreateDTO.getCategoriaIds()) {
            CategoriaDTO categoriaDTO = categoriaService.findById(id);
            categorias.add(new Categoria(categoriaDTO.getId(), categoriaDTO.getNome()));
        }

        return categorias;
    }
}
