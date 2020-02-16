package com.example.seatMe.model;

import javax.persistence.Entity;
import javax.validation.constraints.NotEmpty;

@Entity(name = "restaurant")
public class Restaurant extends BaseEntity {

    // Primary identifier of user
    @NotEmpty(message = "Email is required")
    private String email;

    // Salted hashed password using BCrypt
    @NotEmpty(message = "Password is required")
    private String password;

    @NotEmpty(message = "Restaurant name is required")
    private String name;

    @NotEmpty(message = "Restaurant address is required")
    private String address;

    private int zipCode;

    private int phone;

    private CuisineType cuisineType;
    private String photoReference;


    public Restaurant(@NotEmpty(message = "Email is required") String email, @NotEmpty(message = "Password is required") String password, @NotEmpty(message = "Restaurant name is required") String name, @NotEmpty(message = "Restaurant address is required") String address, @NotEmpty(message = "ZipCode is required") int zipCode, @NotEmpty(message = "Phone number is required") int phone, CuisineType cuisineType, String photoReference) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.address = address;
        this.zipCode = zipCode;
        this.phone = phone;
        this.cuisineType = cuisineType;
        this.photoReference = photoReference;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getZipCode() {
        return zipCode;
    }

    public void setZipCode(int zipCode) {
        this.zipCode = zipCode;
    }

    public int getPhone() {
        return phone;
    }

    public void setPhone(int phone) {
        this.phone = phone;
    }

    public CuisineType getCuisineType() {
        return cuisineType;
    }

    public void setCuisineType(CuisineType cuisineType) {
        this.cuisineType = cuisineType;
    }

    public String getPhotoReference() {
        return photoReference;
    }

    public void setPhotoReference(String photoReference) {
        this.photoReference = photoReference;
    }
}



