package com.contiq.userservice.service;

import com.contiq.userservice.dto.UserDto;

import java.util.List;
import java.util.Map;

public interface UserService {
    List<UserDto> findAll();
    UserDto findByEmail(String email);
    UserDto save(UserDto user);
    UserDto updateNotificationCount(int id, Map<String, Object> user);
    UserDto updatePassword(int id, Map<String, Object> user);

}
