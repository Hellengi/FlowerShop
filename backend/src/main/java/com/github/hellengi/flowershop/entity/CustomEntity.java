package com.github.hellengi.flowershop.entity;

import jakarta.persistence.*;

import java.util.HashMap;

@Entity
@Table
public class CustomEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "custom_seq")
    @SequenceGenerator(name = "custom_seq", sequenceName = "custom_sequence", allocationSize = 1)
    private long id;
    @Column(name = "title")
    private String title;
    @Column(name = "info")
    private String info;
    @Column(name = "price")
    private int price;
    public CustomEntity() {}
    public CustomEntity(String title, String info, int price) {
        this.title = title;
        this.info = info;
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
    public String getInfo() {
        return info;
    }
    public void setInfo(String info) {
        this.info = info;
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
