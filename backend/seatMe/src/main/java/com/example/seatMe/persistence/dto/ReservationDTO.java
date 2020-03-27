package com.example.seatMe.persistence.dto;


import com.example.seatMe.model.TimeSlot;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ReservationDTO {

    private String firstName;
    private String lastName;
    private String phone;
    private String partySize;
    private String date;
    private String time;
    private String restaurantId;
}
