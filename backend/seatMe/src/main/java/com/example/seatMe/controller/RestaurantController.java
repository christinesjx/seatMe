package com.example.seatMe.controller;

import com.example.seatMe.exception.NotFoundException;
import com.example.seatMe.model.CustomerQueue;
import com.example.seatMe.model.Restaurant;
import com.example.seatMe.model.Table;
import com.example.seatMe.persistence.dto.*;
import com.example.seatMe.service.CustomerQueueService;
import com.example.seatMe.service.ReservationService;
import com.example.seatMe.service.RestaurantService;
import com.example.seatMe.service.TableService;
import com.example.seatMe.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
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

    @Autowired
    CustomerQueueService customerQueueService;

    private long getRestaurantIdFromEmail(String email) throws NotFoundException {
        return restaurantService.getRestaurants(email).getId();
    }

    @PostMapping("/{email}/info")
    public ResponseEntity<String> registerNewRestaurant(@Valid @RequestBody RestaurantDTO restaurantDTO, @PathVariable String email) throws NotFoundException {
        restaurantService.registerNewRestaurant(restaurantDTO, email);
        return ResponseEntity.ok("restaurant has been created/updated successfully");
    }

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

    @ResponseBody
    @GetMapping("/{email}/queue")
    public List<CustomerQueueDTO> getQueue(@PathVariable String email) throws NotFoundException {
        Restaurant restaurant = restaurantService.getRestaurants(email);
        return customerQueueService.getQueue(restaurant.getId());
    }

    @DeleteMapping("/{email}/queue/{id}")
    public ResponseEntity<String> removeFromQueue(@PathVariable String id, @PathVariable String email) throws NotFoundException {
        customerQueueService.removeFromQueue(Integer.parseInt(id));
        return ResponseEntity.ok("customer has been removed from the queue");
    }

    @ResponseBody
    @GetMapping("/timeslot")
    public List<String> getAvailableTimeSlot(@RequestParam("email") String email, @RequestParam("date") String date, @RequestParam("partySize") String partySize) throws NotFoundException {
        Restaurant restaurant = restaurantService.getRestaurants(email);
        Date reservedDate = DateUtil.formatDate(date);
        return reservationService.findAvailableTimeSlot(restaurant.getId(), reservedDate, Integer.parseInt(partySize));
    }

    /*
    @DeleteMapping("")
    public ResponseEntity<String> deleteRestaurant(@RequestParam int restaurantId) {
        restaurantService.deleteRestaurant((long) restaurantId);
        return ResponseEntity.ok("restaurant has been deleted successfully");
    }
    */

    @PostMapping("waitList/{email}/queue")
    public ResponseEntity<String> addToWaitList(@Valid @RequestBody CustomerDTO customerDTO, @PathVariable String email) throws NotFoundException {
        long restaurantId = getRestaurantIdFromEmail(email);
        customerQueueService.addToQueue((restaurantId), customerDTO);
        return ResponseEntity.ok("customer has been added to queue");
    }


    @PostMapping("/{email}/reservation")
    public ResponseEntity<String> addNewReservation(@Valid @RequestBody ReservationDTO reservationDTO, @PathVariable String email) throws NotFoundException {
        long restaurantId = getRestaurantIdFromEmail(email);

        reservationDTO.setRestaurantId(String.valueOf(restaurantId));
        reservationService.addNewReservation(reservationDTO);
        return ResponseEntity.ok("reservation has been created successfully");
    }


    @ResponseBody
    @GetMapping("/{email}/reservation")
    public List<ReservationDTO> getAllReservations(@PathVariable String email) throws NotFoundException {
        Restaurant restaurant = restaurantService.getRestaurants(email);
        return reservationService.getAllReservation(restaurant);
    }

    @ResponseBody
    @GetMapping("/{email}/reservation/{date}")
    public List<ReservationDTO> getReservationsOnDate(@PathVariable String email, @PathVariable String date) throws NotFoundException {
        Restaurant restaurant = restaurantService.getRestaurants(email);
        return reservationService.getReservationOnDate(restaurant, date);
    }


    @PostMapping("/{email}/table/{id}")
    public ResponseEntity<String> changeTableAvailability(@PathVariable String email, @PathVariable String id) throws NotFoundException {
        long restaurantId = getRestaurantIdFromEmail(email);
        tableService.changeTableAvailability(restaurantId, Integer.parseInt(id));
        return ResponseEntity.ok("table availability changed successfully");
    }


    @DeleteMapping("/{email}/reservation/{id}")
    public ResponseEntity<String> deleteReservation(@PathVariable String email, @PathVariable String id) throws NotFoundException {
        getRestaurantIdFromEmail(email);
        reservationService.removeReservation((long) Integer.parseInt(id));
        return ResponseEntity.ok("reservation has been deleted successfully");
    }
}
