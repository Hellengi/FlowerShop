package com.github.hellengi.flowershop.dto;

import com.github.hellengi.flowershop.enums.ItemStatus;

import java.math.BigDecimal;

public record CustomFlowerDTO(Long id,
                             String image,
                             String title,
                             String description,
                             Integer stock,
                             BigDecimal price,
                             ItemStatus status,
                             Integer quantity) {}
