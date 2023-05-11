package com.market.backend.repository;

import com.market.backend.model.Categoria;
import com.market.backend.model.Produto;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProdutoRepository extends MongoRepository<Produto, String> {

    List<Produto> findByCategorias(Categoria categoria);
}
