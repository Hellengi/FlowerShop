package com.github.hellengi.flowershop.entity;

import com.github.hellengi.flowershop.entity.id.CartBouquetId;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name="bouquet_In_cart")
public class CartBouquetEntity {
    @EmbeddedId
    private CartBouquetId id;

    @MapsId("cartId")
    @ManyToOne
    @JoinColumn(name = "id_cart", referencedColumnName = "id_cart", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private CartEntity cart;

    @MapsId("bouquetId")
    @ManyToOne
    @JoinColumn(name = "id_bouquet", referencedColumnName = "id_bouquet", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private BouquetEntity bouquet;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    public CartBouquetEntity() {}

    public CartBouquetEntity(CartBouquetId id, CartEntity cart, BouquetEntity bouquet, Integer quantity) {
        this.id = id;
        this.cart = cart;
        this.bouquet = bouquet;
        this.quantity = quantity;
    }

    public CartBouquetId getId() {
        return id;
    }

    public CartEntity getCart() {
        return cart;
    }

    public BouquetEntity getBouquet() {
        return bouquet;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
