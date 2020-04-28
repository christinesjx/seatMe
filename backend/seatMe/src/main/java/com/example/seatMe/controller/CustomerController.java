package com.example.seatMe.controller;

import com.example.seatMe.exception.NotFoundException;
import com.example.seatMe.persistence.dto.CustomerDTO;
import com.example.seatMe.persistence.dto.ReservationDTO;
import com.example.seatMe.persistence.dto.RestaurantDTO;
import com.example.seatMe.service.CustomerQueueService;
import com.example.seatMe.service.ReservationService;
import com.example.seatMe.service.RestaurantService;
import com.example.seatMe.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.*;

@CrossOrigin
@Controller
public class CustomerController {

    @Autowired
    ReservationService reservationService;

    @Autowired
    RestaurantService restaurantService;

    @Autowired
    CustomerQueueService customerQueueService;

    @PostMapping("reservation/add")
    public ResponseEntity<String> addNewReservation(@Valid @RequestBody ReservationDTO reservationDTO) throws NotFoundException {
        reservationService.addNewReservation(reservationDTO);
        return ResponseEntity.ok("reservation has been created successfully");
    }

    @ResponseBody
    @GetMapping("reservation/restaurant/all")
    public List<RestaurantDTO> getRestaurant() {
        return (restaurantService.getAllRestaurants());
    }


    @ResponseBody
    @GetMapping("reservation/restaurant/timeslot")
    public List<String> getAvailableTimeSlot(@RequestParam("restaurantId") String restaurantId, @RequestParam("date") String date, @RequestParam("partySize") String partySize) {
        Date reservedDate = DateUtil.formatDate(date);
        return reservationService.findAvailableTimeSlot(Integer.valueOf(restaurantId).longValue(), reservedDate, Integer.parseInt(partySize));
    }

    @PostMapping("waitList/{restaurantId}/add")
    public ResponseEntity<String> addToWaitList(@Valid @RequestBody CustomerDTO customerDTO, @PathVariable String restaurantId){
        System.out.println("restaurantId" + restaurantId);
        customerQueueService.addToQueue(Integer.parseInt(restaurantId), customerDTO);
        return ResponseEntity.ok("customer has been added to queue");
    }


    @GetMapping("reservation/waitList")
    public ResponseEntity<String> getEstimatedTime(@RequestParam String partySize, @RequestParam String restaurantId, @RequestParam String timestamp) throws NotFoundException {
        int estimatedTime = customerQueueService.getEstimatedTime(Integer.parseInt(restaurantId), Integer.parseInt(partySize));
        return ResponseEntity.ok(estimatedTime + "");
    }

/*
    @DeleteMapping
    public ResponseEntity<String> deleteReservation(@RequestParam Long reservationId) throws NotFoundException {
        reservationService.removeReservation(reservationId);
        return ResponseEntity.ok("reservation has been deleted successfully");
    }*/
}