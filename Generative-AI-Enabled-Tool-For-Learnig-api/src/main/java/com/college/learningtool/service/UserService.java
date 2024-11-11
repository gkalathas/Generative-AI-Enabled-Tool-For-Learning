package com.college.learningtool.service;

import com.college.learningtool.core.User;

public interface UserService {
    
    User getUserById(Long id);
    
    User saveUser(User user);
    
    User getUserByUsernameAndPassword(String username, String password);
}
