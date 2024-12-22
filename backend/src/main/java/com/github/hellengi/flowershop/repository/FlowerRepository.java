package com.github.hellengi.flowershop.repository;

import com.github.hellengi.flowershop.entity.FlowerEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlowerRepository extends JpaRepository<FlowerEntity, Long> {
    @Modifying
    @Transactional
    @Query("UPDATE FlowerEntity f SET f.title = :#{#flowerEntity.title}, f.price = :#{#flowerEntity.price} WHERE f.id = :id")
    void update(@Param("flowerEntity") FlowerEntity flowerEntity, @Param("id") Long id);

    @Query("SELECT f FROM FlowerEntity f WHERE " +
            "LOWER(f.title) LIKE LOWER(CONCAT('%', :searchText, '%')) " +
            "AND f.price >= :minPrice AND f.price <= :maxPrice")
    List<FlowerEntity> search(@Param("searchText") String searchText,
                              @Param("minPrice") Integer minPrice,
                              @Param("maxPrice") Integer maxPrice);
}
