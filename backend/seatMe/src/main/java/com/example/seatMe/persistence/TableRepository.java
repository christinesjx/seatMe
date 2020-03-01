package com.example.seatMe.persistence;

import com.example.seatMe.model.Restaurant;
import com.example.seatMe.model.Table;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TableRepository extends JpaRepository<Table, Long> {

    Optional<List<Table>> findAllByRestaurantId(Long restaurantId);

    Optional<List<Table>> findAllByRestaurantIdAndMaxSizeIsGreaterThanOrderByMinSize(Long restaurantId, int partSize);

    Optional<List<Table>> findAllByRestaurantIdAndAvailability(Long restaurantId, boolean b);
}
