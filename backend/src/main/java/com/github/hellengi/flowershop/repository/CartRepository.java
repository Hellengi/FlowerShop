package com.github.hellengi.flowershop.repository;

import com.github.hellengi.flowershop.entity.CartEntity;
import com.github.hellengi.flowershop.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<CartEntity, Long> {
    @Query("SELECT COUNT(c) > 0 FROM CartEntity c WHERE c.user = :user AND c.isActive = true")
    boolean existsActiveCartByUser(@Param("user") UserEntity user);

    @Query("SELECT c FROM CartEntity c WHERE c.user = :user AND c.isActive = true")
    CartEntity findActiveCartByUser(@Param("user") UserEntity user);
}
