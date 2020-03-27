package com.example.seatMe.model;


public enum TimeSlot {
    ONE_FIFTEN("1:15"), TWO_FIFTEN("2:15"), THREE_FIFEN("3:15");

    private String timeSlot;

    TimeSlot(String timeSlot) {
        this.timeSlot = timeSlot;
    }

    public String getTimeSlot() {
        return timeSlot;
    }


}