package com.example.seatMe.service;

import com.example.seatMe.model.Table;
import com.example.seatMe.persistence.dto.TableDTO;

import java.util.List;

public interface TableService {

    List<Table> findAllTables(Long restaurantId);

    void addTable(long restaurantId, TableDTO tableDTO);

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

    void updateTable(long restaurantId, long tableId, TableDTO tableDTO);

}
