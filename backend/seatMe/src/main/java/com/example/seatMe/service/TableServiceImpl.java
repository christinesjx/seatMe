package com.example.seatMe.service;

import com.example.seatMe.model.Restaurant;
import com.example.seatMe.model.Table;
import com.example.seatMe.persistence.RestaurantRepository;
import com.example.seatMe.persistence.TableRepository;
import com.example.seatMe.persistence.dto.TableDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class TableServiceImpl implements TableService {

    @Autowired
    private TableRepository tableRepo;

    @Autowired
    private RestaurantRepository restaurantRepo;

    @Override
    public List<Table> findAllTables(Long restaurantId) {
        return tableRepo.findAllByRestaurantIdOrderById(restaurantId).orElse(null);
    }

    @Override
    public void addTable(long restaurantId, TableDTO tableDTO) {
        Restaurant restaurant = restaurantRepo.findById(restaurantId).orElse(null);
        System.out.println(tableDTO.getMinSize());
        System.out.println(tableDTO.getMaxSize());
        if(restaurant != null){
            Table table = new Table(Integer.parseInt(tableDTO.getMinSize()), Integer.parseInt(tableDTO.getMaxSize()));
            restaurant.addTable(table);
            tableRepo.save(table);
        }
    }

    @Override
    public void deleteTable(Long restaurantId, long tableId) {

        Table table = tableRepo.findById(tableId).orElse(null);
            if(table != null){
                tableRepo.deleteById(tableId);
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

    @Override
    public void updateTable(long restaurantId, long tableId, TableDTO tableDTO) {
        Restaurant restaurant = restaurantRepo.findById(restaurantId).orElse(null);
        Table table = tableRepo.findById(tableId).orElse(null);
        if(restaurant != null){
            if(table != null){
                table.setMinSize(Integer.parseInt(tableDTO.getMinSize()));
                table.setMaxSize(Integer.parseInt(tableDTO.getMaxSize()));
                table.setAvailability(true);
                tableRepo.save(table);
            }
        }
    }
}
