package com.github.hellengi.flowershop.repository;

import com.github.hellengi.flowershop.entity.ClientEntity;
import com.github.hellengi.flowershop.entity.SellerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerRepository extends JpaRepository<SellerEntity, Long> {
    @Query("SELECT COUNT(s) > 0 FROM SellerEntity s WHERE s.client = :client")
    Boolean check(@Param("client") ClientEntity client);
}
