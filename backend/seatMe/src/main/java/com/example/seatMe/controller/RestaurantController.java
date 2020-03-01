package com.example.seatMe.controller;

import com.example.seatMe.exception.NotFoundException;
import com.example.seatMe.persistence.dto.RestaurantDTO;
import com.example.seatMe.persistence.dto.TableDTO;
import com.example.seatMe.persistence.dto.TimeSlotDTO;
import com.example.seatMe.service.ReservationService;
import com.example.seatMe.service.RestaurantService;
import com.example.seatMe.service.TableService;
import io.jsonwebtoken.Jwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@Controller
@RequestMapping("/restaurants")
public class RestaurantController {

    @Autowired
    TableService tableService;

    @Autowired
    RestaurantService restaurantService;

    @Autowired
    ReservationService reservationService;

    @PostMapping("/registration")
    public ResponseEntity<String> registerNewRestaurant(@Valid @RequestBody RestaurantDTO restaurantDTO) throws NotFoundException {
        restaurantService.registerNewRestaurant(restaurantDTO);
        return ResponseEntity.ok("restaurant has been created/updated successfully");
    }

    @DeleteMapping
    public ResponseEntity<String> deleteRestaurant(@RequestParam int restaurantId) {
        restaurantService.deleteRestaurant((long) restaurantId);
        return ResponseEntity.ok("restaurant has been deleted successfully");
    }

    @PostMapping("table/add")
    public ResponseEntity<String> addNewTable(@Valid @RequestBody TableDTO tableDTO) {
        tableService.addTable(tableDTO);
        return ResponseEntity.ok("table has been added successfully");
    }

    @PostMapping("table/update")
    public ResponseEntity<String> updateTable(@Valid @RequestBody TableDTO tableDTO) {
        //TODO
        return ResponseEntity.ok("table has been updated successfully");
    }

    @GetMapping("reservations/all")
    public ResponseEntity<String> getAllReservations(@RequestParam int restaurantId) {
        //TODO
        return ResponseEntity.ok("");
    }

    @DeleteMapping("table")
    public ResponseEntity<String> deleteTable(@RequestParam Long tableId, @RequestParam Long restaurantId) {
        tableService.deleteTable(restaurantId, tableId);
        return ResponseEntity.ok("table has been deleted successfully");
    }

    @PostMapping("table/availability")
    public ResponseEntity<String> changeTableAvailability(@RequestParam Long restaurantId, @RequestParam int tableId) {
        tableService.changeTableAvailability(restaurantId, tableId);
        return ResponseEntity.ok("table availability changed successfully");
    }



}
