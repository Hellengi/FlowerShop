package com.github.hellengi.flowershop.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "seller")
public class SellerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_seller")
    private Long id;

    @OneToOne
    @JoinColumn(name = "id_user", referencedColumnName = "id_user", nullable = false, unique = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private UserEntity user;

    @Column(name = "legal_name", nullable = false, unique = true)
    private String name;

    public SellerEntity() {}

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
