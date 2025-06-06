package com.github.hellengi.flowershop.dto;

import java.time.LocalDateTime;

public record UserDTO(Long id,
                      String name,
                      String email,
                      LocalDateTime registeredAt,
                      String pictureUrl,
                      Long admin_id,
                      Long seller_id,
                      String legalName) {}
