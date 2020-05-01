package com.example.seatMe.service;

import com.example.seatMe.exception.NotFoundException;
import com.example.seatMe.model.CustomerQueue;
import com.example.seatMe.model.Restaurant;
import com.example.seatMe.persistence.CustomerQueueRepository;
import com.example.seatMe.persistence.ReservationRepository;
import com.example.seatMe.persistence.RestaurantRepository;
import com.example.seatMe.persistence.TableRepository;
import com.example.seatMe.persistence.dto.CustomerDTO;
import com.example.seatMe.persistence.dto.CustomerQueueDTO;
import com.example.seatMe.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    @Override
    public List<CustomerQueueDTO> getQueue(long restaurantId) {
        List<CustomerQueue> customerQueueList =  customerQueueRepo.findAllByRestaurantIdOrderByTimestamp(restaurantId);

        List<CustomerQueueDTO> customerQueueDTOS = new ArrayList<>();
        for(CustomerQueue c: customerQueueList){
            CustomerQueueDTO customerQueueDTO = new CustomerQueueDTO();
            String time = DateUtil.getTimeFromTimestamp(c.getTimestamp());

            customerQueueDTO.setId(c.getId().toString());
            customerQueueDTO.setFirstName(c.getFirstName());
            customerQueueDTO.setLastName(c.getFirstName());
            customerQueueDTO.setPartySize(c.getPartySize());
            customerQueueDTO.setPhone(c.getPhone());
            customerQueueDTO.setTimestamp(time);

            customerQueueDTOS.add(customerQueueDTO);
        }

        return customerQueueDTOS;
    }


    @Override
    public int getEstimatedTime(long restaurantId, int partySize) throws NotFoundException {
        Restaurant restaurant = restaurantRepo.findById(restaurantId).orElse(null);

        if (restaurant == null){
            throw new NotFoundException("restaurantId " + restaurantId + " not found");
        }

        int numberInLine = customerQueueRepo.findAllByRestaurantIdOrderByTimestamp(restaurantId).size() + 1;
        int avgDinningTimeOfRestaurant = restaurant.getAvgDinningTime();
        int numberOfCurrentAvailableTable = tableRepository.findAllByRestaurantIdAndAvailabilityAndMaxSizeIsGreaterThanEqualAndMinSizeIsLessThanEqual(restaurantId, true, partySize, partySize).size();
        int numberOfTableInRestaurant = tableRepository.findAllByRestaurantIdAndMaxSizeIsGreaterThanEqualAndMinSizeIsLessThanEqual(restaurantId, partySize, partySize).size();

        int waitTime;
        if (numberInLine <= numberOfCurrentAvailableTable){
            waitTime = 0;
        }else{
            waitTime = (numberInLine * avgDinningTimeOfRestaurant) / numberOfTableInRestaurant;
            System.out.println("waitTime " +waitTime);
        }

        return waitTime;
    }

}
