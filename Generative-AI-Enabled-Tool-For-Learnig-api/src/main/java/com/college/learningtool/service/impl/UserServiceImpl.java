package com.college.learningtool.service.impl;

import com.college.learningtool.core.User;
import com.college.learningtool.repositories.UserRepository;
import com.college.learningtool.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Override
    public User getUserById(Long id) {
        return null;
    }
    
    @Override
    @Transactional
    public User saveUser(User user) {
        
        if (user == null) {
            throw new RuntimeException("User cannot be null");
        }
        
        if (user.getUsername() == null || user.getPassword() == null) {
            throw new RuntimeException("Username and password cannot be null");
        }
        
        User retrievedUser = userRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword()).orElse(null);
        
        if (retrievedUser != null) {
            throw new RuntimeException("User already exists");
        }
        
        return userRepository.save(user);
    }
    
    @Override
    public User getUserByUsernameAndPassword(String username, String password) {
        
        if (username == null || password == null) {
            throw new RuntimeException("Username and password cannot be null");
        }
        
        return userRepository.findByUsernameAndPassword(username, password).orElseThrow();
    }
}
