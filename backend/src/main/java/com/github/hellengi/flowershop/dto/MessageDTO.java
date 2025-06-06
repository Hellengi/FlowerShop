package com.github.hellengi.flowershop.dto;

import com.github.hellengi.flowershop.entity.UserEntity;
import com.github.hellengi.flowershop.enums.MessageStatus;

import java.time.LocalDateTime;

public record MessageDTO(Long id,
                         UserEntity from,
                         UserEntity to,
                         String message,
                         LocalDateTime createdAt,
                         LocalDateTime updatedAt,
                         String pictureUrl,
                         MessageStatus status) {}
