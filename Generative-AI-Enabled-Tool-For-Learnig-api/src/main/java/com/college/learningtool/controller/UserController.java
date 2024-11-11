package com.college.learningtool.controller;

import com.college.learningtool.core.User;
import com.college.learningtool.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/save")
    public User saveUser(@RequestBody User user) {
        return userService.saveUser(user);
    }
    
    @GetMapping("/getByUsername")
    public User getUserByUsernameAndPassword(@RequestParam String username, @RequestParam String password) {
        return userService.getUserByUsernameAndPassword(username, password);
    }
}
