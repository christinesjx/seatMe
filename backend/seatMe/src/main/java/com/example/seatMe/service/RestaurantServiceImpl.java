package com.example.seatMe.service;

import com.example.seatMe.model.CuisineType;
import com.example.seatMe.model.Restaurant;
import com.example.seatMe.persistence.RestaurantRepository;
import com.example.seatMe.persistence.dto.RestaurantDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RestaurantServiceImpl implements RestaurantService {


    @Autowired
    private RestaurantRepository restaurantRepo;

    @Override
    public void registerNewRestaurant(RestaurantDTO restaurantDTO) {
        Restaurant restaurant = new Restaurant(restaurantDTO.getEmail(), restaurantDTO.getPassword(),
                restaurantDTO.getName(), restaurantDTO.getAddress(),
                restaurantDTO.getZipCode(), restaurantDTO.getPhone(),
                CuisineType.Chinese, "");

        restaurantRepo.save(restaurant);
    }

    @Override
    public void deleteRestaurant(String email) {

    }
}
