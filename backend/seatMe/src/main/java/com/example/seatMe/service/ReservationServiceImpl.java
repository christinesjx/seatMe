package com.example.seatMe.service;

import com.example.seatMe.exception.NotFoundException;
import com.example.seatMe.model.Reservation;
import com.example.seatMe.model.Restaurant;
import com.example.seatMe.model.Table;
import com.example.seatMe.model.TimeSlot;
import com.example.seatMe.persistence.ReservationRepository;
import com.example.seatMe.persistence.RestaurantRepository;
import com.example.seatMe.persistence.TableRepository;
import com.example.seatMe.persistence.dto.ReservationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ReservationServiceImpl implements ReservationService {


    @Autowired
    private RestaurantRepository restaurantRepo;


    @Autowired
    private ReservationRepository reservationRepo;


    @Autowired
    private TableRepository tableRepo;

    @Override
    public Reservation addNewReservation(ReservationDTO reservationDTO) throws NotFoundException {
        System.out.println(reservationDTO.getDate());
        System.out.println(reservationDTO.getPartySize());
        System.out.println(reservationDTO.getTime());
        System.out.println(reservationDTO.getFirstName());
        System.out.println(reservationDTO.getRestaurantId());

        String[] date =  reservationDTO.getDate().split("-");
        Date c = new GregorianCalendar(Integer.parseInt(date[2]), Integer.parseInt(date[1]) - 1, Integer.parseInt(date[0])).getTime();;

        Restaurant existing = restaurantRepo.findById(Integer.valueOf(reservationDTO.getRestaurantId()).longValue()).orElse(null);
        Reservation reservation = new Reservation(reservationDTO.getFirstName(), reservationDTO.getLastName(),
                reservationDTO.getPhone(), reservationDTO.getPartySize(), c, TimeSlot.valueOf("TWO_FIFTEN")); //TODO: enum error


        // TODO
        if (existing != null) {
            reservation.setRestaurant(existing);
            List<Reservation> reservations = reservationRepo.findByRestaurantAndDate(existing, c).orElse(null);
            List<Table> availableTables = tableRepo.findAllByRestaurantIdAndMaxSizeIsGreaterThanOrderByMinSize(existing.getId(), Integer.parseInt(reservationDTO.getPartySize())).orElse(null);
            if (availableTables != null) {
                if (reservations != null) {
                    for (Reservation r : reservations) {
                        for (Table t: availableTables){
                            if(r.getTable().getId().equals(t.getId())){
                                availableTables.remove(t);
                                System.out.println(availableTables.size());
                            }
                        }
                    }
                }
                if (availableTables.size() > 0) {
                    reservation.setTable(availableTables.get(0));
                }
                return reservationRepo.save(reservation);
            }else throw new NotFoundException("No tables Found..");
        }else throw new NotFoundException("No restaurant Found..");
    }

    @Override
    public void removeReservation(Long reservationId) throws NotFoundException {
        Reservation reservation = reservationRepo.findById(reservationId).orElse(null);

        if(reservation == null){
            throw new NotFoundException("reservation not found...");
        }

        reservation.setTable(null);
        reservation.setRestaurant(null);

        reservationRepo.delete(reservation);
    }

    @Override
    public List<String> findAvailableTimeSlot(long restaurantId, Date date, int partySize) {
        List<String> timeSlot = new ArrayList<>();
        timeSlot.add(TimeSlot.ONE_FIFTEN.getTimeSlot());
        timeSlot.add(TimeSlot.TWO_FIFTEN.getTimeSlot());
        timeSlot.add(TimeSlot.THREE_FIFEN.getTimeSlot());

        Restaurant existing = restaurantRepo.findById(restaurantId).orElse(null);

        // TODO
        if (existing != null) {
            List<Reservation> reservations = reservationRepo.findByRestaurantAndDate(existing, date).orElse(null);
            List<Table> availableTables = tableRepo.findAllByRestaurantIdOrderById(existing.getId()).orElse(null);

        }
        return timeSlot;
    }

    @Override
    public List<Reservation> getAllReservation(Restaurant restaurant, String reservationDate) throws NotFoundException {
        String[] date =  reservationDate.split("-");
        Date c = new GregorianCalendar(Integer.parseInt(date[2]), Integer.parseInt(date[1]) - 1, Integer.parseInt(date[0])).getTime();;

        List<Reservation> reservations = reservationRepo.findByRestaurantAndDate(restaurant, c).orElse(null);
        if(reservations == null){
            throw new NotFoundException("no reservation");
        }
        return reservations;
    }

}
