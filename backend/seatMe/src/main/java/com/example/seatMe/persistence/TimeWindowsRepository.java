package com.example.seatMe.persistence;

import com.example.seatMe.model.TimeWindows;
import com.example.seatMe.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;


public interface TimeWindowsRepository extends JpaRepository<TimeWindows, Long>{

    List<TimeWindows> findAllByRestaurantId(Long restaurantId);

    TimeWindows findByRestaurantIdAndStartTime(Long restaurant_id, LocalTime startTime);

    List<TimeWindows> removeAllByRestaurantId(Long restaurant_id);

}



