package com.market.backend.model.enums;

import java.util.Objects;

public enum ETipo {
    FISICO(0, "Fisico"),
    DIGITAL(1, "Digital");

    private Integer codigo;
    private String nome;

    private ETipo(Integer codigo, String nome) {
        this.codigo = codigo;
        this.nome = nome;
    }

    public static ETipo findByCode(Integer codigo) {
        for (ETipo tipo : ETipo.values())
            if (Objects.equals(tipo.codigo, codigo))
                return tipo;

        return null;
    }
}
