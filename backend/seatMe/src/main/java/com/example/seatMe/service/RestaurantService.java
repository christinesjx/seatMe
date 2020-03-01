package com.example.seatMe.service;

import com.example.seatMe.exception.NotFoundException;
import com.example.seatMe.persistence.dto.RestaurantDTO;

import java.util.List;

public interface RestaurantService {


    /**
     * register a new restaurant
     * update restaurant information
     * @param restaurantDTO
     */
    void registerNewRestaurant(RestaurantDTO restaurantDTO) throws NotFoundException;

    /**
     * delete a restaurant based on id
     * @param id
     */
    void deleteRestaurant(Long id);


    List<RestaurantDTO> getAllRestaurants();
}
