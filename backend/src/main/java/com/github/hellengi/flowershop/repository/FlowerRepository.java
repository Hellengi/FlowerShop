package com.github.hellengi.flowershop.repository;

import com.github.hellengi.flowershop.entity.BouquetEntity;
import com.github.hellengi.flowershop.entity.FlowerEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface FlowerRepository extends JpaRepository<FlowerEntity, Long> {
    @Modifying(clearAutomatically = true)
    @Transactional
    @Query("UPDATE FlowerEntity f SET f.item.title = :title, f.item.price = :price WHERE f.id = :id")
    void updateFlower(@Param("id") Long id, @Param("title") String title, @Param("price") BigDecimal price);

    @Query("SELECT f FROM FlowerEntity f ORDER BY f.item.title ASC")
    List<FlowerEntity> findFlowersOrderByTitle();

    @Query("SELECT f FROM FlowerEntity f WHERE " +
            "LOWER(f.item.title) LIKE LOWER(CONCAT('%', :searchName, '%')) " +
            "AND f.item.price >= :minPrice AND f.item.price <= :maxPrice")
    List<FlowerEntity> searchFlower(@Param("searchName") String searchName,
                              @Param("minPrice") Integer minPrice,
                              @Param("maxPrice") Integer maxPrice);
}
