package com.github.hellengi.flowershop.entity.id;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class CustomFlowerId implements Serializable {
    private Long customId;
    private Long flowerId;

    public CustomFlowerId() {}

    public CustomFlowerId(Long customId, Long flowerId) {
        this.customId = customId;
        this.flowerId = flowerId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CustomFlowerId that)) return false;
        return Objects.equals(customId, that.customId) && Objects.equals(flowerId, that.flowerId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(customId, flowerId);
    }
}
