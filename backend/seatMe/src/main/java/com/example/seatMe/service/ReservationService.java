package com.example.seatMe.service;

import com.example.seatMe.exception.NotFoundException;
import com.example.seatMe.model.Reservation;
import com.example.seatMe.model.Restaurant;
import com.example.seatMe.model.TimeSlot;
import com.example.seatMe.persistence.dto.ReservationDTO;

import java.util.Date;
import java.util.List;

public interface ReservationService {

    Reservation addNewReservation(ReservationDTO reservationDTO) throws NotFoundException;

    void removeReservation(Long reservationId) throws NotFoundException;

    List<String> findAvailableTimeSlot(long restaurantId, Date date, int partySize);

    List<Reservation> getAllReservation(Restaurant restaurant, String reservationDate) throws NotFoundException;

}
