package com.github.hellengi.flowershop.dto;

import com.github.hellengi.flowershop.enums.ItemStatus;

import java.math.BigDecimal;
import java.util.List;

public record CartCustomDTO(Long id,
                            String image,
                            String title,
                            List<CustomFlowerDTO> flowers,
                            Integer stock,
                            BigDecimal price,
                            ItemStatus status,
                            Integer quantity) {}
