package com.example.seatMe.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "reservation")
public class Reservation extends BaseEntity {

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "phone")
    private String phone;

    @Column(name = "party_size")
    private String partySize;

    @Column(name = "date")
    private Date date;


    @JsonIgnore
    @JoinColumn
    @ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.ALL)
    private TimeWindows timeWindows;

    @JsonIgnore
    @JoinColumn
    @ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.ALL)
    private Table table;

    @JsonIgnore
    @JoinColumn
    @ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.ALL)
    private Restaurant restaurant;

    public Reservation(String firstName, String lastName, String phone, String partySize, Date date) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.partySize = partySize;
        this.date = date;
    }

}
