package com.example.seatMe.service;

import com.example.seatMe.exception.NotFoundException;
import com.example.seatMe.model.CustomerQueue;
import com.example.seatMe.model.Restaurant;
import com.example.seatMe.persistence.CustomerQueueRepository;
import com.example.seatMe.persistence.ReservationRepository;
import com.example.seatMe.persistence.RestaurantRepository;
import com.example.seatMe.persistence.TableRepository;
import com.example.seatMe.persistence.dto.CustomerDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerQueueServiceImpl implements CustomerQueueService{


    @Autowired
    private RestaurantRepository restaurantRepo;


    @Autowired
    private CustomerQueueRepository customerQueueRepo;

    @Autowired
    private TableRepository tableRepository;

    @Autowired
    private ReservationRepository reservationRepo;


    @Override
    public void addToQueue(long restaurantId, CustomerDTO customerDTO) {
        Restaurant restaurant = restaurantRepo.findById(restaurantId).orElse(null);
        if(restaurant != null){
            CustomerQueue customer = new CustomerQueue(customerDTO.getFirstName(), customerDTO.getLastName(), customerDTO.getPhone(), customerDTO.getPartySize(), customerDTO.getTimestamp());
            restaurant.addToWaitList(customer);
            customerQueueRepo.save(customer);
        }
    }

    @Override
    public void removeFromQueue(long waitListQueueId) throws NotFoundException {
        CustomerQueue customer = customerQueueRepo.findById(waitListQueueId).orElse(null);
        if(customer == null){
            throw new NotFoundException("customer not found...");
        }
        customer.setRestaurant(null);
        customerQueueRepo.delete(customer);
    }
}
