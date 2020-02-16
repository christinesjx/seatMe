package com.example.seatMe.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

@Entity(name = "restaurant_table")
public class Table extends BaseEntity{

    private int minSize;

    private int maxSize;

    private boolean availability;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.ALL)
    private Restaurant restaurant;

    public Table(int minSize, int maxSize, boolean availability, Restaurant restaurant) {
        this.minSize = minSize;
        this.maxSize = maxSize;
        this.availability = availability;
        this.restaurant = restaurant;
    }

    public int getMinSize() {
        return minSize;
    }

    public void setMinSize(int minSize) {
        this.minSize = minSize;
    }

    public int getMaxSize() {
        return maxSize;
    }

    public void setMaxSize(int maxSize) {
        this.maxSize = maxSize;
    }

    public boolean isAvailability() {
        return availability;
    }

    public void setAvailability(boolean availability) {
        this.availability = availability;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }
}
