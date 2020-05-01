package com.example.seatMe.service;

import com.example.seatMe.exception.NotFoundException;
import com.example.seatMe.model.*;
import com.example.seatMe.persistence.ReservationRepository;
import com.example.seatMe.persistence.RestaurantRepository;
import com.example.seatMe.persistence.TableRepository;
import com.example.seatMe.persistence.TimeWindowsRepository;
import com.example.seatMe.persistence.dto.ReservationDTO;
import com.example.seatMe.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ReservationServiceImpl implements ReservationService {


    @Autowired
    private RestaurantRepository restaurantRepo;


    @Autowired
    private ReservationRepository reservationRepo;

    @Autowired
    private TimeWindowsRepository timeWindowsRepo;


    @Autowired
    private TableRepository tableRepo;

    @Override
    public Reservation addNewReservation(ReservationDTO reservationDTO) throws NotFoundException {
        Date reservedDate = DateUtil.formatDate(reservationDTO.getDate());

        Restaurant restaurant = restaurantRepo.findById(Integer.valueOf(reservationDTO.getRestaurantId()).longValue()).orElse(null);


        LocalTime startTime = LocalTime.parse(reservationDTO.getTime());
        TimeWindows timeWindows = timeWindowsRepo.findByRestaurantIdAndStartTime((long) Integer.parseInt(reservationDTO.getRestaurantId()), startTime);
        int partySize = Integer.parseInt(reservationDTO.getPartySize());


        List<Table> tables = findAllAvailableTable(restaurant, reservedDate, startTime, partySize);
        tables.sort(Comparator.comparing(Table::getMaxSize));

        Reservation reservation;
        if(tables.size() > 0){
            reservation = new Reservation(reservationDTO.getFirstName(), reservationDTO.getLastName(),
                    reservationDTO.getPhone(), reservationDTO.getPartySize(), reservedDate);
            reservation.setRestaurant(restaurant);
            reservation.setTimeWindows(timeWindows);
            reservation.setTable(tables.get(0));
            reservationRepo.save(reservation);
        }else throw new NotFoundException("not available, please select another time");

        return reservation;
    }

    @Override
    public void removeReservation(Long reservationId) throws NotFoundException {
        Reservation reservation = reservationRepo.findById(reservationId).orElse(null);

        if(reservation == null){
            throw new NotFoundException("reservation not found...");
        }

        reservation.setTable(null);
        reservation.setRestaurant(null);
        reservation.setTimeWindows(null);
        reservationRepo.delete(reservation);
    }

    @Override
    public List<String> findAvailableTimeSlot(long restaurantId, Date date, int partySize) {
        List<TimeWindows> availableTime = new ArrayList<>();
        Restaurant existing = restaurantRepo.findById(restaurantId).orElse(null);

        if (existing != null) {
            List<Table> allTables = tableRepo.findAllByRestaurantIdAndMaxSizeIsGreaterThanEqualOrderByMinSize(existing.getId(), partySize);
            for (Table t : allTables) {
                if(getAvailableTimeOfTable(existing, date, t) != null){
                    availableTime.addAll(getAvailableTimeOfTable(existing, date, t));
                }
            }
        }

        availableTime.sort(Comparator.comparing(TimeWindows::getStartTime));
        List<String> availableStartTime = new ArrayList<>();
        for(TimeWindows tw: availableTime){
            availableStartTime.add(tw.getStartTime().toString());
        }

        return availableStartTime.stream().distinct().collect(Collectors.toList());
    }

    private List<TimeWindows> getAvailableTimeOfTable(Restaurant restaurant, Date date, Table table) {

        List<TimeWindows> allTimeWindows = timeWindowsRepo.findAllByRestaurantId(restaurant.getId());
        List<Reservation> reservationsOfTable = reservationRepo.findByRestaurantAndDateAndTable(restaurant, date, table);

        if(reservationsOfTable.size() == 0){
            return allTimeWindows;
        }

        List<TimeWindows> reservedTime = new ArrayList<>();
        for (Reservation r : reservationsOfTable) {
            reservedTime.add(r.getTimeWindows());
        }

        allTimeWindows.removeAll(reservedTime);

        return new ArrayList<>(allTimeWindows);
    }

    private boolean isTableAvailable(Restaurant restaurant, Table table, Date date, LocalTime time){
        TimeWindows tw = timeWindowsRepo.findByRestaurantIdAndStartTime(restaurant.getId(), time);
        List<Reservation> reservation = reservationRepo.findByRestaurantAndDateAndTableAndTimeWindows(restaurant, date, table, tw);

        if(reservation.size() == 0){
            return true;
        }
        return false;
    }

    private List<Table> findAllAvailableTable(Restaurant restaurant, Date date, LocalTime time, int partySize){
        List<Table> res = new ArrayList<>();
        if (restaurant != null) {
            List<Table> allTables = tableRepo.findAllByRestaurantIdAndMaxSizeIsGreaterThanEqualOrderByMinSize(restaurant.getId(), partySize);
            for (Table t : allTables) {
                boolean isAvailable = isTableAvailable(restaurant, t, date, time);
                if(isAvailable){
                    res.add(t);
                }
            }
        }
        return res;
    }


    @Override
    public List<ReservationDTO> getReservationOnDate(Restaurant restaurant, String reservationDate) throws NotFoundException {

        Date reservedDate = DateUtil.formatDate(reservationDate);

        List<Reservation> reservations = reservationRepo.findByRestaurantAndDate(restaurant, reservedDate).orElse(null);

        List<ReservationDTO> reservationDTOS = new ArrayList<>();

        if(reservations == null){
            throw new NotFoundException("no reservation");
        }

        convertReservationToReservationDTO(reservations, reservationDTOS);

        return reservationDTOS;
    }

    private void convertReservationToReservationDTO(List<Reservation> reservations, List<ReservationDTO> reservationDTOS) {
        for(Reservation r: reservations){
            ReservationDTO reservationDTO = new ReservationDTO();
            reservationDTO.setReservationId(r.getId().toString());
            reservationDTO.setFirstName(r.getFirstName());
            reservationDTO.setLastName(r.getLastName());
            reservationDTO.setPhone(r.getPhone());
            reservationDTO.setPartySize(r.getPartySize());
            reservationDTO.setDate(DateUtil.getDateWithoutTime(r.getDate()));
            reservationDTO.setTime(r.getTimeWindows().getStartTime().toString());
            reservationDTOS.add(reservationDTO);
        }
    }


    @Override
    public List<ReservationDTO> getAllReservation(Restaurant restaurant) throws NotFoundException {

        List<Reservation> reservations = reservationRepo.findByRestaurant(restaurant);
        List<ReservationDTO> reservationDTOS = new ArrayList<>();

        convertReservationToReservationDTO(reservations, reservationDTOS);
        if(reservations.isEmpty()){
            throw new NotFoundException("no reservation");
        }
        return reservationDTOS;
    }

}
