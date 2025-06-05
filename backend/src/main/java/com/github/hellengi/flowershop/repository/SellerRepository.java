package com.github.hellengi.flowershop.repository;

import com.github.hellengi.flowershop.entity.UserEntity;
import com.github.hellengi.flowershop.entity.SellerEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerRepository extends JpaRepository<SellerEntity, Long> {
    @Query("SELECT COUNT(s) > 0 FROM SellerEntity s WHERE s.user = :user")
    Boolean existsByUser(@Param("user") UserEntity user);
    @Query("SELECT COUNT(s) > 0 FROM SellerEntity s WHERE s.user.email = :email")
    Boolean existsByEmail(@Param("email") String email);
    @Query("SELECT COUNT(s) > 0 FROM SellerEntity s WHERE s.name = :name")
    Boolean existsByName(@Param("name") String name);
    @Modifying(clearAutomatically = true)
    @Transactional
    @Query("DELETE FROM SellerEntity s WHERE s.user.email = :email")
    void deleteByEmail(String email);

    SellerEntity findByUser(UserEntity user);
}
