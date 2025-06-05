package com.github.hellengi.flowershop.repository;

import com.github.hellengi.flowershop.entity.CartEntity;
import com.github.hellengi.flowershop.entity.CustomEntity;
import com.github.hellengi.flowershop.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomRepository extends JpaRepository<CustomEntity, Long> {
    boolean existsByUserAndTitle(UserEntity user, String title);

    @Query("SELECT COUNT(c) > 0 FROM CustomEntity c WHERE c.user = :user AND c.isActive = true")
    boolean existsActiveCustomByUser(@Param("user") UserEntity user);

    @Query("SELECT c FROM CustomEntity c WHERE c.user = :user AND c.isActive = true")
    CustomEntity findActiveCustomByUser(@Param("user") UserEntity user);
}
