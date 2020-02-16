package com.example.seatMe.service;

import com.example.seatMe.model.Restaurant;
import com.example.seatMe.persistence.dto.RestaurantDTO;

public interface RestaurantService {


    void registerNewRestaurant(RestaurantDTO restaurantDTO);

    void deleteRestaurant(String email);


}
