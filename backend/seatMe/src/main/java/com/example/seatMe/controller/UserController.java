package com.example.seatMe.controller;

import com.example.seatMe.model.User;

import com.example.seatMe.service.UserService;
import com.example.seatMe.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin
@Controller
public class UserController {

    @Autowired
    private UserService userService;


    @Autowired
    private UserValidator userValidator;

    @GetMapping(value = "/test")
    public ResponseEntity test() {
        return ResponseEntity.ok("hello");
    }

    @RequestMapping(value = "/registration", method = RequestMethod.POST)
    public ResponseEntity registration(@Valid @RequestBody User user, BindingResult bindingResult) {
        userValidator.validate(user, bindingResult);

        if (bindingResult.hasErrors()) {
            return ResponseEntity.ok(bindingResult.getAllErrors());
        }

        User newUser = userService.save(user);
        return ResponseEntity.ok("userId: " + newUser.getId());
    }
}