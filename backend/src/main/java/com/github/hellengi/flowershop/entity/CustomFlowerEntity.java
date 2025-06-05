package com.github.hellengi.flowershop.entity;

import com.github.hellengi.flowershop.entity.id.CustomFlowerId;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name="flower_in_custom")
public class CustomFlowerEntity {
    @EmbeddedId
    private CustomFlowerId id;

    @MapsId("customId")
    @ManyToOne
    @JoinColumn(name = "id_custom", referencedColumnName = "id_custom", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private CustomEntity custom;

    @MapsId("flowerId")
    @ManyToOne
    @JoinColumn(name = "id_flower", referencedColumnName = "id_flower", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private FlowerEntity flower;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    public CustomFlowerEntity() {}

    public CustomFlowerEntity(CustomFlowerId id, CustomEntity custom, FlowerEntity flower, Integer quantity) {
        this.id = id;
        this.custom = custom;
        this.flower = flower;
        this.quantity = quantity;
    }

    public CustomFlowerId getId() {
        return id;
    }

    public CustomEntity getCustom() {
        return custom;
    }

    public FlowerEntity getFlower() {
        return flower;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
