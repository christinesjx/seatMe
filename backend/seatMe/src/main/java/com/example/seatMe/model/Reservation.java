package com.example.seatMe.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import java.util.Date;

@Entity(name = "reservation")
public class Reservation extends BaseEntity {

    private String firstName;
    private String lastName;
    private int phone;
    private int partySize;
    private Date date;
    private TimeSlot time;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.ALL)
    private Table table;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.ALL)
    private Restaurant restaurant;

    public Reservation(String firstName, String lastName, int phone, int partySize, Date date, TimeSlot time) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.partySize = partySize;
        this.date = date;
        this.time = time;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getPhone() {
        return phone;
    }

    public void setPhone(int phone) {
        this.phone = phone;
    }

    public int getPartySize() {
        return partySize;
    }

    public void setPartySize(int partySize) {
        this.partySize = partySize;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public TimeSlot getTime() {
        return time;
    }

    public void setTime(TimeSlot time) {
        this.time = time;
    }
}
