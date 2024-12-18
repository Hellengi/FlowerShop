package com.github.hellengi.flowershop.entity;

import jakarta.persistence.*;

@Entity
@Table(name="flower")
public class FlowerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "flower_seq")
    @SequenceGenerator(name = "flower_seq", sequenceName = "flower_sequence", allocationSize = 1)
    private long id;
    @Column(name = "title")
    private String title;
    @Column(name = "description")
    private String description;
    @Column(name = "price")
    private int price;
    public FlowerEntity() {}
    public FlowerEntity(String title, int price) {
        this.title = title;
        this.price = price;
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
    @Override
    public String toString() {
        return (title + " (" + price + " руб)");
    }
}
