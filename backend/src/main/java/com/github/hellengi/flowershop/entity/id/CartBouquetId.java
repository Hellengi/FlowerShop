package com.github.hellengi.flowershop.entity.id;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class CartBouquetId implements Serializable {
    private Long cartId;
    private Long bouquetId;

    public CartBouquetId() {}

    public CartBouquetId(Long cartId, Long bouquetId) {
        this.cartId = cartId;
        this.bouquetId = bouquetId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CartBouquetId that)) return false;
        return Objects.equals(cartId, that.cartId) && Objects.equals(bouquetId, that.bouquetId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cartId, bouquetId);
    }
}
