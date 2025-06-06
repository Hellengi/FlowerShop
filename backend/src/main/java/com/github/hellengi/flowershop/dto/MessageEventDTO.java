package com.github.hellengi.flowershop.dto;

public record MessageEventDTO(Long fromUserId,
                              Long toUserId,
                              String content) {}
