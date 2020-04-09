package com.example.seatMe.service;

import com.example.seatMe.exception.NotFoundException;
import com.example.seatMe.persistence.dto.CustomerDTO;
import org.springframework.stereotype.Service;

public interface CustomerQueueService {

    void addToQueue(long restaurantId, CustomerDTO customerDTO);

    void removeFromQueue(long waitListQueueId) throws NotFoundException;

    //void getEstimatedTime(long restaurantId);
}
