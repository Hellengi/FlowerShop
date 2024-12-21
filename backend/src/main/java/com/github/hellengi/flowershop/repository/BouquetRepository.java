package com.github.hellengi.flowershop.repository;

import com.github.hellengi.flowershop.entity.BouquetEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BouquetRepository extends JpaRepository<BouquetEntity, Long> {
    @Query("SELECT b FROM BouquetEntity b where b.amount > 0 ORDER BY b.id ASC")
    List<BouquetEntity> findSelectedBouquets();

    @Modifying
    @Transactional
    @Query("UPDATE BouquetEntity b SET b.title = :#{#bouquetEntity.title}, b.price = :#{#bouquetEntity.price} WHERE b.id = :id")
    void update(@Param("bouquetEntity") BouquetEntity bouquetEntity, @Param("id") Long id);
}
