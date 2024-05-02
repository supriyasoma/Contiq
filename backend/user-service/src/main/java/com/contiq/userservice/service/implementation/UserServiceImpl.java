package com.contiq.userservice.service.implementation;

import com.contiq.userservice.dto.UserDto;
import com.contiq.userservice.entity.UserEntity;
import com.contiq.userservice.exception.UserException;

import com.contiq.userservice.repository.UserRepository;

import java.util.List;

import com.contiq.userservice.service.UserService;
import com.contiq.userservice.utils.mapper.UserMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public List<UserDto> findAll() {
        log.info("Inside Service findAllUser():");
        List<UserEntity> userEntityList = userRepository.findAll();
        return userEntityList.stream()
                .map(userMapper::entityToDTO)
                .toList();
    }

    @Override
    public UserDto findByEmail(String email) {
        log.info("Inside Service findByEmail():");
        UserEntity userEntity = userRepository.findByEmail(email);

        if (userEntity != null) {
            return userMapper.entityToDTO(userEntity);
        } else {
            throw new UserException("User with email not found: " + email);
        }
    }


    @Override
    public UserDto save(UserDto userDTO) {
        log.info("Inside createUser method in Service Layer");
        try {
            Optional<UserEntity> userOptional = Optional.ofNullable(userRepository.findByEmail(userDTO.getEmail()));
            if (userOptional.isPresent()) {
                throw new UserException("Email is already exists!");
            }
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            UserEntity user = userMapper.dtoToEntity(userDTO);
            UserEntity savedUser = userRepository.save(user);
            return userMapper.entityToDTO(savedUser);
        } catch(Exception e) {
            throw new UserException("Error creating user");
        }
    }

    @Override
    public UserDto updateNotificationCount(int id, Map<String, Object> userUpdates) {
        log.info("Inside Service updateNotificationCount():");
        Optional<UserEntity> result = userRepository.findById(id);
        if (result.isPresent()) {
            UserEntity userEntity = result.get();
            if (userUpdates.containsKey("notificationCount")) {
                int newNotificationCount = (int) userUpdates.get("notificationCount");
                userEntity.setNotificationCount(newNotificationCount);
                return userMapper.entityToDTO(userRepository.save(userEntity));
            }
            else {
                throw new UserException("Password field is required in the updates");
            }
        } else {
            throw new UserException("Did not find User id: " + id);
        }
    }

    @Override
    public UserDto updatePassword(int id, Map<String, Object> userUpdates) {
        log.info("Inside updatePassword method in Service Layer");
        Optional<UserEntity> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            UserEntity user = optionalUser.get();

            if (userUpdates.containsKey("password")) {
                String newPassword = (String) userUpdates.get("password");

                PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
                String hashedNewPassword = passwordEncoder.encode(newPassword);

                if (!passwordEncoder.matches(newPassword, user.getPassword())) {
                    user.setPassword(hashedNewPassword);
                    userRepository.save(user);
                    return userMapper.entityToDTO(user);
                } else {
                    throw new UserException("Please provide a different new password");
                }
            } else {
                throw new UserException("Password field is required in the updates");
            }
        }
        throw new UserException("User with ID " + id + " not found");
    }
}
