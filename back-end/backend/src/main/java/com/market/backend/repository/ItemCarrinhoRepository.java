package com.market.backend.repository;

import com.market.backend.model.ItemCarrinho;
import com.market.backend.model.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemCarrinhoRepository extends MongoRepository<ItemCarrinho, String> {

    List<ItemCarrinho> findAllByUsuario(Usuario usuario);
}
