package com.example.seatMe.persistence;

import com.example.seatMe.model.Restaurant;
import com.example.seatMe.model.Table;
import com.example.seatMe.model.TimeWindows;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TableRepository extends JpaRepository<Table, Long> {

    Optional<List<Table>> findAllByRestaurantIdOrderById(Long restaurantId);

    List<Table> findAllByRestaurantIdAndMaxSizeIsGreaterThanEqualOrderByMinSize(Long restaurantId, int partySize);

    Optional<List<Table>> findAllByRestaurantIdAndAvailability(Long restaurantId, boolean b);

    List<Table> findAllByRestaurantIdAndAvailabilityAndMaxSizeIsGreaterThanEqualAndMinSizeIsLessThanEqual(long restaurantId, boolean currentAvailability, int partySize1, int partySize2);

    List<Table> findAllByRestaurantIdAndMaxSizeIsGreaterThanEqualAndMinSizeIsLessThanEqual(long restaurantId, int partySize1, int partySize2);


}
