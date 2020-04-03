package com.example.seatMe.persistence.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RestaurantDTO {

    private String name;
    private String address;
    private String zipCode;
    private String phone;
    private String cuisineType;
    private String photoReferenceUrl = null;

}
