package com.example.seatMe.persistence;

import com.example.seatMe.model.Reservation;
import com.example.seatMe.model.Restaurant;
import com.example.seatMe.model.Table;
import com.example.seatMe.model.TimeWindows;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByRestaurant(Restaurant restaurant);
    Optional<List<Reservation>> findByRestaurantAndDate(Restaurant restaurant, Date date);

    List<Reservation> findByRestaurantAndDateAndTable(Restaurant restaurant, Date date, Table table);

    List<Reservation> findByRestaurantAndDateAndTableAndTimeWindows(Restaurant restaurant, Date date, Table table, TimeWindows timeWindows);

}
