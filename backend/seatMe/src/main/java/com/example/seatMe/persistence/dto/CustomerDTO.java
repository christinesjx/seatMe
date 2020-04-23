package com.example.seatMe.persistence.dto;


import lombok.Getter;
import lombok.Setter;
import java.sql.Timestamp;

@Getter
@Setter
public class CustomerDTO {

    private String firstName;
    private String lastName;
    private String phone;
    private String partySize;
    private Timestamp timestamp;

}
