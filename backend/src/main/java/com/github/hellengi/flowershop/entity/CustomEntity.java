package com.github.hellengi.flowershop.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name="custom")
public class CustomEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_custom")
    private long id;

    @ManyToOne
    @JoinColumn(name = "id_user", referencedColumnName = "id_user", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private UserEntity user;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @Column(name = "title", nullable = false)
    private String title;

    public CustomEntity() {}

    public CustomEntity(UserEntity user, String title) {
        this.user = user;
        this.title = title;
        this.isActive = true;
    }

    public long getId() {
        return id;
    }

    public UserEntity getUser() {
        return user;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
