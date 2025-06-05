package com.github.hellengi.flowershop.repository;

import com.github.hellengi.flowershop.entity.CartBouquetEntity;
import com.github.hellengi.flowershop.entity.CartEntity;
import com.github.hellengi.flowershop.entity.id.CartBouquetId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartBouquetRepository extends JpaRepository<CartBouquetEntity, CartBouquetId> {
    @Query("SELECT cb FROM CartBouquetEntity cb where cb.cart = :cart AND cb.quantity > 0 ORDER BY cb.id ASC")
    List<CartBouquetEntity> findBouquetsInCart(@Param("cart") CartEntity cart);
}
