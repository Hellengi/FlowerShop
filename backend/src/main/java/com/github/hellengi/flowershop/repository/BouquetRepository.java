package com.github.hellengi.flowershop.repository;

import com.github.hellengi.flowershop.entity.BouquetEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface BouquetRepository extends JpaRepository<BouquetEntity, Long> {
    @Modifying(clearAutomatically = true)
    @Transactional
    @Query("UPDATE BouquetEntity b SET b.item.title = :title, b.item.price = :price WHERE b.id = :id")
    void updateBouquet(@Param("id") Long id, @Param("title") String title, @Param("price") BigDecimal price);

    @Query("SELECT b FROM BouquetEntity b ORDER BY b.item.title ASC")
    List<BouquetEntity> findBouquetsOrderByTitle();

    @Query("SELECT b FROM BouquetEntity b WHERE " +
            "LOWER(b.item.title) LIKE LOWER(CONCAT('%', :searchName, '%')) " +
            "AND b.item.price >= :minPrice AND b.item.price <= :maxPrice")
    List<BouquetEntity> searchBouquet(@Param("searchName") String searchName,
                                    @Param("minPrice") Integer minPrice,
                                    @Param("maxPrice") Integer maxPrice);
}
