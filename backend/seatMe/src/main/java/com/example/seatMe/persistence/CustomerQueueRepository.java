package com.example.seatMe.persistence;

import com.example.seatMe.model.CustomerQueue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerQueueRepository extends JpaRepository<CustomerQueue, Long> {


    List<CustomerQueue> findAllByRestaurantIdOrderByTimestamp(Long restaurantId);


}
