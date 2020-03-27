package com.example.seatMe.service;

import com.example.seatMe.persistence.dto.TableDTO;

public interface TableService {


    void addTable(TableDTO tableDTO);

    /**
     * given the restaurantId, delete a table
     * @param restaurantId
     * @param tableId
     */
    void deleteTable(Long restaurantId, long tableId);

    /**
     * given the restaurantId and tableId, delete a table
     * @param restaurantId
     * @param tableId
     */
    void changeTableAvailability(Long restaurantId, long tableId);
}
