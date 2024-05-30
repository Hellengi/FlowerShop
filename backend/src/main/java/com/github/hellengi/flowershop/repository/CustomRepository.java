package com.github.hellengi.flowershop.repository;

import com.github.hellengi.flowershop.entity.CustomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomRepository extends JpaRepository<CustomEntity, Long> {
    @Query("SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END FROM CustomEntity b where b.title = :title")
    Boolean containsTitle(@Param("title") String title);
}
