package com.example.seatMe.controller;

import com.example.seatMe.exception.NotFoundException;
import com.example.seatMe.model.Reservation;
import com.example.seatMe.model.Restaurant;
import com.example.seatMe.model.Table;
import com.example.seatMe.persistence.dto.RestaurantDTO;
import com.example.seatMe.persistence.dto.TableDTO;
import com.example.seatMe.service.ReservationService;
import com.example.seatMe.service.RestaurantService;
import com.example.seatMe.service.TableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    public long getRestaurantIdFromEmail(String email) throws NotFoundException {
        return restaurantService.getRestaurants(email).getId();
    }

    @CrossOrigin
    @PostMapping("/{email}/info")
    public ResponseEntity<String> registerNewRestaurant(@Valid @RequestBody RestaurantDTO restaurantDTO, @PathVariable String email) throws NotFoundException {
        restaurantService.registerNewRestaurant(restaurantDTO, email);
        return ResponseEntity.ok("restaurant has been created/updated successfully");
    }

    @CrossOrigin
    @ResponseBody
    @GetMapping("/{email}")
    public ResponseEntity<String> isRestaurant(@PathVariable String email) throws NotFoundException {
        getRestaurantIdFromEmail(email);
        return ResponseEntity.ok("true");
    }

    @ResponseBody
    @GetMapping("/{email}/tables")
    public List<Table> getAllTables(@PathVariable String email) throws NotFoundException {
        long restaurantId = getRestaurantIdFromEmail(email);
        return tableService.findAllTables(restaurantId);
    }


    @PostMapping("/{email}/table")
    public ResponseEntity<String> addNewTable(@Valid @RequestBody TableDTO tableDTO, @PathVariable String email) throws NotFoundException {
        long restaurantId = getRestaurantIdFromEmail(email);
        tableService.addTable(restaurantId, tableDTO);
        return ResponseEntity.ok("table has been added successfully");
    }

    @PostMapping("/{email}/table/update/{id}")
    public ResponseEntity<String> updateTable(@Valid @RequestBody TableDTO tableDTO, @PathVariable String email, @PathVariable String id) throws NotFoundException {
        long restaurantId = getRestaurantIdFromEmail(email);
        tableService.updateTable(restaurantId, Integer.parseInt(id), tableDTO);
        return ResponseEntity.ok("table has been updated successfully");
    }

    @DeleteMapping("/{email}/table/{id}")
    public ResponseEntity<String> deleteTable(@PathVariable String email, @PathVariable String id) throws NotFoundException {
        long restaurantId = getRestaurantIdFromEmail(email);
        System.out.println(id);
        tableService.deleteTable(restaurantId, Integer.parseInt(id));
        return ResponseEntity.ok("table has been deleted successfully");
    }


/*    @DeleteMapping("")
    public ResponseEntity<String> deleteRestaurant(@RequestParam int restaurantId) {
        restaurantService.deleteRestaurant((long) restaurantId);
        return ResponseEntity.ok("restaurant has been deleted successfully");
    }*/



    @ResponseBody
    @GetMapping("reservations/all")
    public List<Reservation> getAllReservations(@RequestParam String username) throws NotFoundException {
        Restaurant restaurant = restaurantService.getRestaurants(username);
        return reservationService.getAllReservation(restaurant);
    }


    @PostMapping("/{email}/table/{id}")
    public ResponseEntity<String> changeTableAvailability(@PathVariable String email, @PathVariable String id) throws NotFoundException {
        long restaurantId = getRestaurantIdFromEmail(email);
        tableService.changeTableAvailability(restaurantId, Integer.parseInt(id));
        return ResponseEntity.ok("table availability changed successfully");
    }
}
