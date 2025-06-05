package com.github.hellengi.flowershop.entity;

import com.github.hellengi.flowershop.enums.OrderStatus;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "order_entity")
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_order")
    private Long id;

    @OneToOne
    @JoinColumn(name = "id_cart", referencedColumnName = "id_cart", nullable = false, unique = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private CartEntity cart;

    @Column(nullable = false)
    private String address;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "delivery_date")
    private LocalDateTime deliveryDate;

    @Column(name = "total_price", nullable = false)
    private BigDecimal totalPrice;

    @Column(nullable = false)
    private OrderStatus status;

    public OrderEntity() {}

    public OrderEntity(CartEntity cart, String address, BigDecimal totalPrice) {
        this.cart = cart;
        this.address = address;
        this.createdAt = LocalDateTime.now();
        this.totalPrice = totalPrice;
        this.status = OrderStatus.PROCESSING;
    }

    public Long getId() {
        return id;
    }

    public CartEntity getCart() {
        return cart;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(LocalDateTime deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public OrderStatus getStatus() {
        return status;
    }

    @Enumerated(EnumType.STRING)
    public void setStatus(OrderStatus status) {
        this.status = status;
    }
}
