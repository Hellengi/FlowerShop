package com.github.hellengi.flowershop.entity;
import com.github.hellengi.flowershop.enums.ItemStatus;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;

@Entity
@Table(name = "bouquet")
public class BouquetEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_bouquet")
    private long id;

    @OneToOne(cascade = CascadeType.PERSIST, optional = false)
    @JoinColumn(name = "id_item", referencedColumnName = "id_item", nullable = false, unique = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ItemEntity item;

    @Column(name = "picture_url")
    private String image;

    public BouquetEntity() {}

    public BouquetEntity(ItemEntity item) {
        this.item = item;
    }

    public BouquetEntity(ItemEntity item, String image) {
        this.item = item;
        this.image = image;
    }

    public BouquetEntity(SellerEntity seller, String title, BigDecimal price, Integer stock) {
        this.item = new ItemEntity(seller, title, price, stock);
    }

    public BouquetEntity(SellerEntity seller, String title, BigDecimal price, Integer stock, String image) {
        this.item = new ItemEntity(seller, title, price, stock);
        this.image = image;
    }

    public long getId() {
        return id;
    }

    public ItemEntity getItem() {
        return item;
    }

    public long getItemId() {
        return item.getId();
    }

    public String getTitle() {
        return item.getTitle();
    }

    public void setTitle(String title) {
        item.setTitle(title);
    }

    public String getDescription() {
        return item.getDescription();
    }

    public void setDescription(String description) {
        item.setDescription(description);
    }

    public BigDecimal getPrice() {
        return item.getPrice();
    }

    public void setPrice(BigDecimal price) {
        item.setPrice(price);
    }

    public Integer getStock() {
        return item.getStock();
    }

    public void setStock(Integer amount) {
        item.setStock(amount);
    }

    public ItemStatus getStatus() {
        return item.getStatus();
    }

    public void setStatus(ItemStatus status) {
        item.setStatus(status);
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
