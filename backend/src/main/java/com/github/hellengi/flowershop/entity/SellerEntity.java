package com.github.hellengi.flowershop.entity;

import jakarta.persistence.*;
import com.github.hellengi.flowershop.entity.ClientEntity;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;


@Entity
@Table(name="seller")
public class SellerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seller_seq")
    @SequenceGenerator(name = "seller_seq", sequenceName = "seller_sequence", allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_client", referencedColumnName = "id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ClientEntity client;

    public SellerEntity() {}
    public SellerEntity(ClientEntity client) {
        this.client = client;
    }

    public long getId() {
        return id;
    }

    public ClientEntity getClient() {
        return client;
    }

    public void setClient(ClientEntity client) {
        this.client = client;
    }
}
