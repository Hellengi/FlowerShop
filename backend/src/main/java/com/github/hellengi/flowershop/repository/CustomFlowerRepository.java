package com.github.hellengi.flowershop.repository;

import com.github.hellengi.flowershop.entity.CartCustomEntity;
import com.github.hellengi.flowershop.entity.CartEntity;
import com.github.hellengi.flowershop.entity.CustomEntity;
import com.github.hellengi.flowershop.entity.CustomFlowerEntity;
import com.github.hellengi.flowershop.entity.id.CustomFlowerId;
import com.github.hellengi.flowershop.enums.ItemStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CustomFlowerRepository extends JpaRepository<CustomFlowerEntity, CustomFlowerId> {
    @Query("SELECT cf FROM CustomFlowerEntity cf where cf.custom = :custom AND cf.quantity > 0 ORDER BY cf.id ASC")
    List<CustomFlowerEntity> findFlowersInCustom(@Param("custom") CustomEntity custom);

    @Query("""
    SELECT SUM(cf.quantity * cf.flower.item.price)
    FROM CustomFlowerEntity cf
    WHERE cf.custom = :custom
    """)
    BigDecimal getPriceByCustom(@Param("custom") CustomEntity custom);

    @Query("""
    SELECT MIN(cf.flower.item.stock * 1.0 / cf.quantity)
    FROM CustomFlowerEntity cf
    WHERE cf.custom = :custom AND cf.quantity > 0
    """)
    Double getStockByCustom(@Param("custom") CustomEntity custom);

    @Query("""
    SELECT CASE
        WHEN COUNT(cf) > 0 THEN 'UNAVAILABLE'
        ELSE 'AVAILABLE'
    END
    FROM CustomFlowerEntity cf
    WHERE cf.custom = :custom AND cf.flower.item.status = 'UNAVAILABLE'
    """)
    String getStatusByCustom(@Param("custom") CustomEntity custom);
}
