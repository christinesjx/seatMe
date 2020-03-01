package com.example.seatMe.persistence.dto;


import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class TimeSlotDTO {
    private long restaurantId;

    private Date date;

    private int partySize;

}
