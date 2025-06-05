package com.github.hellengi.flowershop.entity;

import com.github.hellengi.flowershop.enums.ItemStatus;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "item")
public class ItemEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_item")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_seller", referencedColumnName = "id_seller")
    private SellerEntity seller;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private Integer stock;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ItemStatus status;

    public ItemEntity() {}

    public ItemEntity(SellerEntity seller, String title, BigDecimal price, Integer stock) {
        this.seller = seller;
        this.title = title;
        this.description = "";
        this.price = price;
        this.stock = stock;
        this.status = ItemStatus.AVAILABLE;
    }

    public Long getId() {
        return id;
    }

    public SellerEntity getSeller() {
        return seller;
    }

    public void setSeller(SellerEntity seller) {
        this.seller = seller;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public ItemStatus getStatus() {
        return status;
    }

    public void setStatus(ItemStatus status) {
        this.status = status;
    }
}
