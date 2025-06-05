package com.github.hellengi.flowershop.repository;

import com.github.hellengi.flowershop.entity.CartCustomEntity;
import com.github.hellengi.flowershop.entity.CartEntity;
import com.github.hellengi.flowershop.entity.id.CartCustomId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartCustomRepository extends JpaRepository<CartCustomEntity, CartCustomId> {
    @Query("SELECT cc FROM CartCustomEntity cc where cc.cart = :cart AND cc.quantity > 0 ORDER BY cc.id ASC")
    List<CartCustomEntity> findCustomsInCart(@Param("cart") CartEntity cart);
}
