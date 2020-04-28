package com.example.seatMe.persistence;

import com.example.seatMe.model.Restaurant;
import com.example.seatMe.model.TimeWindows;
import com.example.seatMe.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    Optional<Restaurant> findByUser(User user);


    List<Restaurant> findAllByZipCode(String zipCode);
}
