package com.example.seatMe.persistence.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class TableDTO {
    private long restaurantId;

    private int minSize;

    private int maxSize;
}
