package com.github.hellengi.flowershop.entity.id;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class CartCustomId implements Serializable {
    private Long cartId;
    private Long customId;

    public CartCustomId() {}

    public CartCustomId(Long cartId, Long customId) {
        this.cartId = cartId;
        this.customId = customId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CartCustomId that)) return false;
        return Objects.equals(cartId, that.cartId) && Objects.equals(customId, that.customId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cartId, customId);
    }
}
