package com.example.seatMe.service;

import com.example.seatMe.exception.NotFoundException;
import com.example.seatMe.model.*;
import com.example.seatMe.persistence.RestaurantRepository;
import com.example.seatMe.persistence.TimeWindowsRepository;
import com.example.seatMe.persistence.UserRepository;
import com.example.seatMe.persistence.dto.RestaurantDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalTime;
import java.util.*;

import static java.time.temporal.ChronoField.MINUTE_OF_DAY;
import static java.time.temporal.ChronoUnit.MINUTES;

@Transactional
@Service
public class RestaurantServiceImpl implements RestaurantService {


    @Autowired
    private RestaurantRepository restaurantRepo;

    @Autowired
    private TimeWindowsRepository timeWindowsRepo;

    @Autowired
    private UserRepository userRepo;

    @Override
    public void registerNewRestaurant(RestaurantDTO restaurantDTO, String email) throws NotFoundException {
        User user = userRepo.findByEmail(email).orElse(null);
        if(user == null){
            throw new NotFoundException("user not found");
        }
        Optional<Restaurant> existing = restaurantRepo.findByUser(user);
        if(!existing.isPresent()){
            // add a new restaurant in database
            LocalTime openTime = LocalTime.parse(restaurantDTO.getStartTime());
            LocalTime closeTime = LocalTime.parse(restaurantDTO.getEndTime());

            Restaurant restaurant = new Restaurant(
                    restaurantDTO.getName(), restaurantDTO.getAddress(),
                    restaurantDTO.getZipCode(), restaurantDTO.getPhone(),
                    CuisineType.valueOf(restaurantDTO.getCuisineType()),
                    restaurantDTO.getPhotoReferenceUrl(), Integer.parseInt(restaurantDTO.getAvgDinningTime()), openTime, closeTime);
            restaurant.setUser(user);
            List<TimeWindows> tws = setTimeSlot(restaurant, restaurantDTO.getStartTime(), restaurantDTO.getEndTime(), restaurantDTO.getAvgDinningTime());
            restaurant.setTimeWindows(tws);
            restaurantRepo.save(restaurant);
        }else{
            // restaurant already existed, update info
            existing.get().setName(restaurantDTO.getName());
            existing.get().setAddress(restaurantDTO.getAddress());
            existing.get().setZipCode(restaurantDTO.getZipCode());
            existing.get().setPhone(restaurantDTO.getPhone());
            existing.get().setPhotoReferenceUrl(restaurantDTO.getPhotoReferenceUrl());
            existing.get().setPhotoReferenceUrl(restaurantDTO.getPhotoReferenceUrl());

            restaurantRepo.save(existing.get());
        }
    }

    @Override
    public void deleteRestaurant(Long id) {
        restaurantRepo.findById(id).ifPresent(existing -> restaurantRepo.delete(existing));
    }

    @Override
    public List<RestaurantDTO> getAllRestaurants() {
        List<Restaurant> restaurantsList = restaurantRepo.findAll();
        List<RestaurantDTO> restaurantsDTOList = new ArrayList<>();
        if(restaurantsList.size() > 0){
            for(Restaurant restaurant: restaurantsList){
                RestaurantDTO restaurantDTO = new RestaurantDTO();
                restaurantDTO.setRestaurantId(restaurant.getId().toString());
                restaurantDTO.setName(restaurant.getName());
                restaurantDTO.setPhone(restaurant.getPhone());
                restaurantDTO.setAddress(restaurant.getAddress());
                restaurantDTO.setCuisineType(restaurant.getCuisineType().name());
                restaurantDTO.setZipCode(restaurant.getZipCode());
                restaurantDTO.setPhotoReferenceUrl(restaurant.getPhotoReferenceUrl());
                restaurantDTO.setStartTime(restaurant.getOpenTime().toString());
                restaurantDTO.setEndTime(restaurant.getCloseTime().toString());
                restaurantDTO.setAvgDinningTime(restaurant.getAvgDinningTime()+" mins");
                restaurantsDTOList.add(restaurantDTO);
            }
        }
        return restaurantsDTOList;
    }

    @Override
    public Restaurant getRestaurants(String username) throws NotFoundException {
        User user = userRepo.findByEmail(username).orElse(null);
        if(user == null){
            throw new NotFoundException("user not found");
        }
        return restaurantRepo.findByUser(user).orElse(null);
    }


    private List<TimeWindows> setTimeSlot(Restaurant restaurant, String restaurantStartTime, String restaurantEndTime, String avgTime){
        LocalTime restaurantStartTime1 = LocalTime.parse(restaurantStartTime);
        LocalTime restaurantEndTime1 = LocalTime.parse(restaurantEndTime);
        List<TimeWindows> timeWindowsList = new ArrayList<>();

        long totalMinutes = restaurantEndTime1.getLong(MINUTE_OF_DAY) - restaurantStartTime1.getLong(MINUTE_OF_DAY);

        LocalTime startTime = restaurantStartTime1;

        int duration = Integer.parseInt(avgTime);
        while(totalMinutes >= duration){

            LocalTime endTime = startTime.plus(duration, MINUTES);
            TimeWindows timeWindows = new TimeWindows(startTime, endTime);
            timeWindows.setRestaurant(restaurant);
            timeWindowsRepo.save(timeWindows);

            timeWindowsList.add(timeWindows);
            totalMinutes -= duration;
            startTime = endTime;
        }

        return timeWindowsList;
    }
}
