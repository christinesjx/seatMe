package com.example.seatMe.service;


import com.example.seatMe.model.User;

import java.util.Optional;

public interface UserService {
    User save(User user);

    Optional<User> findByEmail(String email);
}