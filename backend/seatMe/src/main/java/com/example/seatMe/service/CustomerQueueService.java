package com.example.seatMe.service;

import com.example.seatMe.exception.NotFoundException;
import com.example.seatMe.model.CustomerQueue;
import com.example.seatMe.persistence.dto.CustomerDTO;

import java.util.List;

public interface CustomerQueueService {

    void addToQueue(long restaurantId, CustomerDTO customerDTO);

    void removeFromQueue(long waitListQueueId) throws NotFoundException;

    List<CustomerQueue> getQueue(long restaurantId);

    int getEstimatedTime(long restaurantId, int partySize) throws NotFoundException;
}
