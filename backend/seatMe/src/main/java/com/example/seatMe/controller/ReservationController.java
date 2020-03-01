package com.example.seatMe.controller;


import com.example.seatMe.exception.NotFoundException;
import com.example.seatMe.persistence.dto.ReservationDTO;
import com.example.seatMe.persistence.dto.RestaurantDTO;
import com.example.seatMe.persistence.dto.TimeSlotDTO;
import com.example.seatMe.service.ReservationService;
import com.example.seatMe.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@Controller
@RequestMapping("/reservation")
public class ReservationController {

    @Autowired
    ReservationService reservationService;

    @Autowired
    RestaurantService restaurantService;

    @PostMapping("/add")
    public ResponseEntity<String> addNewReservation(@Valid @RequestBody ReservationDTO reservationDTO) throws NotFoundException {
        reservationService.addNewReservation(reservationDTO);
        return ResponseEntity.ok("reservation has been created successfully");
    }

    @ResponseBody
    @GetMapping("restaurant/all")
    public List<RestaurantDTO> getRestaurant() {
        return (restaurantService.getAllRestaurants());
    }

    @ResponseBody
    @GetMapping("restaurant/timeslot")
    public List<String> getAvailableTimeSlot(@Valid @RequestBody TimeSlotDTO timeSlotDTO) {
        return reservationService.findAvailableTimeSlot(timeSlotDTO.getRestaurantId(), timeSlotDTO.getDate(), timeSlotDTO.getPartySize());
    }

    @DeleteMapping
    public ResponseEntity<String> deleteReservation(@RequestParam Long reservationId) throws NotFoundException {
        reservationService.removeReservation(reservationId);
        return ResponseEntity.ok("reservation has been deleted successfully");
    }
}