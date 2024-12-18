package com.github.hellengi.flowershop.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.github.hellengi.flowershop.entity.ClientEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<ClientEntity, Long> {
    @Query("SELECT u FROM ClientEntity u WHERE " +
            "(u.email = :email AND u.password = :password)")
    ClientEntity checkPassword(@Param("email") String mail,
                             @Param("password") String password);
    @Query("SELECT u FROM ClientEntity u WHERE u.name = :name")
    ClientEntity getClient(@Param("name") String name);
    @Modifying
    @Transactional
    @Query("DELETE FROM ClientEntity c WHERE c = :client")
    void dropClient(@Param("client") ClientEntity client);
}
