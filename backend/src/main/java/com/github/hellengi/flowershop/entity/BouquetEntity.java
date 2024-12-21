package com.github.hellengi.flowershop.entity;
import jakarta.persistence.*;

@Entity
@Table(name="bouquet")
public class BouquetEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "bouquet_seq")
    @SequenceGenerator(name = "bouquet_seq", sequenceName = "bouquet_sequence", allocationSize = 1)
    private long id;
    @Column(name = "title")
    private String title;
    @Column(name = "description")
    private String description;
    @Column(name = "price")
    private int price;
    @Column(name = "amount")
    private int amount;
    public BouquetEntity() {}
    public BouquetEntity(String title, int price) {
        this.title = title;
        this.price = price;
        this.amount = 0;
    }
    public BouquetEntity(String title, int price, int amount) {
        this.title = title;
        this.price = price;
        this.amount = amount;
    }
    public long getId() {
        return id;
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
    public int getPrice() {
        return price;
    }
    public void setPrice(int price) {
        this.price = price;
    }
    public int getAmount() {
        return amount;
    }
    public void setAmount(int amount) {
        this.amount = amount;
    }
    @Override
    public String toString() {
        return (title + " (" + amount + " шт по " + price + " руб)");
    }
}
