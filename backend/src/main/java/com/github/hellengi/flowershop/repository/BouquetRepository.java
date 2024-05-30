package com.github.hellengi.flowershop.repository;

import com.github.hellengi.flowershop.entity.BouquetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BouquetRepository extends JpaRepository<BouquetEntity, Long> {
    @Query("SELECT b FROM BouquetEntity b where b.amount > 0 ORDER BY b.id ASC")
    List<BouquetEntity> findSelectedBouquets();
}
