package com.github.hellengi.flowershop.entity;

import jakarta.persistence.*;
import com.github.hellengi.flowershop.entity.UserEntity;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table
public class SellerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_seller")
    private Long id;

    @OneToOne
    @JoinColumn(name = "id_user", referencedColumnName = "id_user", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private UserEntity user;

    @Column(name = "name_legal", unique = true)
    private String name;

    public SellerEntity() {}
    public SellerEntity(UserEntity user) {
        this.user = user;
    }
    public SellerEntity(UserEntity user, String name) {
        this.user = user;
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public UserEntity getUser() {
        return user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
