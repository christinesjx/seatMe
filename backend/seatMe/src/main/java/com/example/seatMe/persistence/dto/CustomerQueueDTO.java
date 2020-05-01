package com.example.seatMe.persistence.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class CustomerQueueDTO {

    private String id;
    private String firstName;
    private String lastName;
    private String phone;
    private String partySize;
    private String timestamp;
}
