package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @GetMapping("/{username}")
    public User getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validateUser(@RequestBody Map<String, String> userCredentials) {
        String username = userCredentials.get("username");
        String password = userCredentials.get("password");
        if (userService.validateUser(username, password)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
