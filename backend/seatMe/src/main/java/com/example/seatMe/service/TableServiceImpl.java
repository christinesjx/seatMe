package com.example.seatMe.service;

import com.example.seatMe.model.Restaurant;
import com.example.seatMe.model.Table;
import com.example.seatMe.persistence.RestaurantRepository;
import com.example.seatMe.persistence.TableRepository;
import com.example.seatMe.persistence.dto.TableDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;


@Service
public class TableServiceImpl implements TableService {

    @Autowired
    private TableRepository tableRepo;

    @Autowired
    private RestaurantRepository restaurantRepo;

    @Override
    public void addTable(TableDTO tableDTO) {
        Restaurant restaurant = restaurantRepo.findById(Integer.valueOf(tableDTO.getRestaurantId()).longValue()).orElse(null);
        if(restaurant != null){
            Table table = new Table(Integer.parseInt(tableDTO.getMinSize()), Integer.parseInt(tableDTO.getMaxSize()));
            restaurant.addTable(table);
            tableRepo.save(table);
        }
    }

    @Override
    public void deleteTable(Long restaurantId, long tableId) {
        Restaurant restaurant = restaurantRepo.findById(restaurantId).orElse(null);
        Table table = tableRepo.findById(tableId).orElse(null);
        if(restaurant != null){
            if(table != null){
                tableRepo.delete(table);
            }
        }
    }

    @Override
    public void changeTableAvailability(Long restaurantId, long tableId) {
        Restaurant restaurant = restaurantRepo.findById(restaurantId).orElse(null);
        Table table = tableRepo.findById(tableId).orElse(null);
        if(restaurant != null){
            if(table != null){
                table.setAvailability(!table.isAvailability());
                tableRepo.save(table);
            }
        }
    }
}
