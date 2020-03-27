package com.example.seatMe.service;

import com.example.seatMe.exception.NotFoundException;
import com.example.seatMe.model.CuisineType;
import com.example.seatMe.model.Restaurant;
import com.example.seatMe.model.Role;
import com.example.seatMe.model.User;
import com.example.seatMe.persistence.RestaurantRepository;
import com.example.seatMe.persistence.UserRepository;
import com.example.seatMe.persistence.dto.RestaurantDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class RestaurantServiceImpl implements RestaurantService {


    @Autowired
    private RestaurantRepository restaurantRepo;

    @Autowired
    private UserRepository userRepo;

    @Override
    public void registerNewRestaurant(RestaurantDTO restaurantDTO) throws NotFoundException {
        User user = userRepo.findById(Integer.valueOf(restaurantDTO.getRestaurantId()).longValue()).orElse(null);
        if(user == null){
            throw new NotFoundException("user not found");
        }
        Optional<Restaurant> existing = restaurantRepo.findByUser(user);
        if(!existing.isPresent()){
            // add a new restaurant in database
            Restaurant restaurant = new Restaurant(
                    restaurantDTO.getName(), restaurantDTO.getAddress(),
                    restaurantDTO.getZipCode(), restaurantDTO.getPhone(),
                    CuisineType.valueOf(restaurantDTO.getCuisineType()),
                    restaurantDTO.getPhotoReferenceUrl());
            restaurant.setUser(user);
            restaurantRepo.save(restaurant);
        }else{
            // restaurant already existed, update info
            existing.get().setName(restaurantDTO.getName());
            existing.get().setAddress(restaurantDTO.getAddress());
            existing.get().setZipCode(restaurantDTO.getZipCode());
            existing.get().setPhone(restaurantDTO.getPhone());
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

}
