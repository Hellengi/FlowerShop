package com.github.hellengi.flowershop.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.github.hellengi.flowershop.entity.BouquetEntity;

public interface Repository extends JpaRepository<BouquetEntity, Long> {
    List<BouquetEntity> findByTitle(String title);
}
