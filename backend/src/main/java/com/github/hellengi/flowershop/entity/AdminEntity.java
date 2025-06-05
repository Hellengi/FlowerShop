package com.github.hellengi.flowershop.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;


@Entity
@Table(name = "admin")
public class AdminEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_admin")
    private Long id;

    @OneToOne
    @JoinColumn(name = "id_user", referencedColumnName = "id_user", nullable = false, unique = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private UserEntity user;

    public AdminEntity() {}

    public AdminEntity(UserEntity user) {
        this.user = user;
    }

    public long getId() {
        return id;
    }

    public UserEntity getUser() {
        return user;
    }
}
