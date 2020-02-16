package com.example.seatMe.controller;

import com.example.seatMe.persistence.dto.RestaurantDTO;
import com.example.seatMe.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;

@Controller
@RequestMapping("/restaurants")
public class RestaurantController {

    @Autowired
    RestaurantService restaurantService;


    @PostMapping("/registration")
    public ResponseEntity<String> registerNewRestaurant(@Valid @RequestBody RestaurantDTO restaurantDTO) {
        restaurantService.registerNewRestaurant(restaurantDTO);
        return ResponseEntity.ok("restaurant has been created/updated successfully");
    }

}
