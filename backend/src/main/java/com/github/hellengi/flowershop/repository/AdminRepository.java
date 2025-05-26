package com.github.hellengi.flowershop.repository;

import com.github.hellengi.flowershop.entity.AdminEntity;
import com.github.hellengi.flowershop.entity.ClientEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<AdminEntity, Long> {
    @Query("SELECT COUNT(a) > 0 FROM AdminEntity a WHERE a.client = :client")
    Boolean check(@Param("client") ClientEntity client);
    @Query("SELECT COUNT(a) > 0 FROM AdminEntity a WHERE a.client.email = :email")
    Boolean checkByEmail(@Param("email") String email);
}
