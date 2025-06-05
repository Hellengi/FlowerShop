package com.github.hellengi.flowershop.entity;

import com.github.hellengi.flowershop.entity.id.CartCustomId;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name="custom_in_cart")
public class CartCustomEntity {
    @EmbeddedId
    private CartCustomId id;

    @MapsId("cartId")
    @ManyToOne
    @JoinColumn(name = "id_cart", referencedColumnName = "id_cart", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private CartEntity cart;

    @MapsId("customId")
    @ManyToOne
    @JoinColumn(name = "id_custom", referencedColumnName = "id_custom", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private CustomEntity custom;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    public CartCustomEntity(CartCustomId id, CartEntity cart, CustomEntity custom) {
        this.id = id;
        this.cart = cart;
        this.custom = custom;
        this.quantity = 1;
    }

    public CartCustomEntity() {}

    public CartCustomEntity(CartCustomId id, CartEntity cart, CustomEntity custom, Integer quantity) {
        this.id = id;
        this.cart = cart;
        this.custom = custom;
        this.quantity = quantity;
    }

    public CartCustomId getId() {
        return id;
    }

    public CartEntity getCart() {
        return cart;
    }

    public CustomEntity getCustom() {
        return custom;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
