package com.github.hellengi.flowershop.repository;

import com.github.hellengi.flowershop.entity.BouquetEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface ItemRepository extends JpaRepository<BouquetEntity, Long> {
    @Modifying(clearAutomatically = true)
    @Transactional
    @Query("UPDATE ItemEntity i SET i.title = :title, i.price = :price WHERE i.id = :id")
    void updateItem(@Param("id") Long id, @Param("title") String title, @Param("price") BigDecimal price);
}
