package com.example.seatMe.persistence.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class TableDTO {
    private String restaurantId;

    private String minSize;

    private String maxSize;
}
