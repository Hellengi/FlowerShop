package com.github.hellengi.flowershop.repository;

import com.github.hellengi.flowershop.entity.AdminEntity;
import com.github.hellengi.flowershop.entity.UserEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<AdminEntity, Long> {
    @Query("SELECT COUNT(a) > 0 FROM AdminEntity a WHERE a.user = :user")
    Boolean existsByUser(@Param("user") UserEntity user);
    @Query("SELECT COUNT(a) > 0 FROM AdminEntity a WHERE a.user.email = :email")
    Boolean existsByEmail(@Param("email") String email);
    @Modifying(clearAutomatically = true)
    @Transactional
    @Query("DELETE FROM AdminEntity a WHERE a.user.email = :email")
    void deleteByEmail(String email);

    AdminEntity findByUser(UserEntity user);
}
