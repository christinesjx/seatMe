package com.example.seatMe.persistence.dto;


import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ReservationDTO {

    private String reservationId = null;
    private String firstName;
    private String lastName;
    private String phone;
    private String partySize;
    private String date;
    private String time;
    private String restaurantId;
}
