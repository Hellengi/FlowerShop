package com.github.hellengi.flowershop.repository;

import com.github.hellengi.flowershop.entity.FlowerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlowerRepository extends JpaRepository<FlowerEntity, Long> {
}
