package com.market.backend.dto;

import java.io.Serializable;

public class ImageStringDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private String imageUrl;

    public ImageStringDTO() {

    }

    public ImageStringDTO(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
