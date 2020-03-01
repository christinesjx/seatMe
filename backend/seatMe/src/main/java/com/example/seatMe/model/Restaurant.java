package com.example.seatMe.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "restaurant")
public class Restaurant extends BaseEntity {

    @NotEmpty(message = "Restaurant name is required")
    @Column(name = "name")
    private String name;

    @NotEmpty(message = "Restaurant address is required")
    @Column(name = "address")
    private String address;

    @Column(name = "zip_code")
    private String zipCode;

    @Column(name = "phone")
    private String phone;

    @Column(name = "cuisine_type")
    private CuisineType cuisineType;

    @Column(name = "photo_reference_url")
    private String photoReferenceUrl;

    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @OneToOne(cascade = CascadeType.ALL)
    private User user;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Table> tables = new ArrayList<>();

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reservation> reservations = new ArrayList<>();


    public void addTable(Table table) {
        tables.add(table);
        table.setRestaurant(this);
    }

    public void removeTable(Table table) {
        tables.remove(table);
        table.setRestaurant(null);
    }

    public Restaurant(String name, String address, String zipCode, String phone, CuisineType cuisineType, String photoReference) {
        this.name = name;
        this.address = address;
        this.zipCode = zipCode;
        this.phone = phone;
        this.cuisineType = cuisineType;
        this.photoReferenceUrl = photoReference;
    }
}



