package com.example.seatMe.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "restaurant_table")
public class Table extends BaseEntity{

    @Column(name = "min_size")
    private int minSize;

    @Column(name = "max_size")
    private int maxSize;

    @Column(name = "availability")
    private boolean availability;

    @JsonIgnore
    @JoinColumn
    @ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.ALL)
    private Restaurant restaurant;


    public Table(int minSize, int maxSize) {
        this.minSize = minSize;
        this.maxSize = maxSize;
        this.availability = true;
    }
}
