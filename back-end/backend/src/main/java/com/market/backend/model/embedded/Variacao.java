package com.market.backend.model.embedded;

import java.util.ArrayList;
import java.util.List;

public class Variacao {

    private String nome;
    private List<String> variacoes = new ArrayList<>();

    public Variacao() {

    }

    public Variacao(String nome, List<String> variacoes) {
        this.nome = nome;
        this.variacoes = variacoes;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public List<String> getVariacoes() {
        return variacoes;
    }

    public void setVariacoes(List<String> variacoes) {
        this.variacoes = variacoes;
    }
}
