package com.contiq.userservice.controller;

import com.contiq.userservice.config.JwtService;
import com.contiq.userservice.dto.AuthDto;
import com.contiq.userservice.dto.UserDto;
import com.contiq.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;
import java.util.List;
import java.util.Map;

import static com.contiq.userservice.utils.constants.AppConstants.*;

@RestController
@Slf4j
@RequestMapping(BASE_URL)
public class UserController {
    private UserService userService;

    private JwtService jwtService;

    @Autowired
    public UserController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    @GetMapping
    public ResponseEntity<List<UserDto>> getAll() {
        log.info("Request received at getAllUsers.");
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping(EMAIL)
    public ResponseEntity<UserDto> getByEmail(@PathVariable String email) {
        log.info("Request received at getByEmail.");
        return ResponseEntity.ok(userService.findByEmail(email));
    }

    @PostMapping
    public ResponseEntity<UserDto> create(@RequestBody UserDto userDTO) {
        log.info("Request received at createUser.");
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(userDTO));
    }

    @PostMapping(LOGIN)
    public String getToken(@RequestBody AuthDto auth){
        log.info("Inside getToken method in Controller Layer");
        return jwtService.generateToken(auth.getEmail(), auth.getPassword());
    }

    @PatchMapping(UPDATE_NOTIFICATION)
    public ResponseEntity<UserDto> updateNotificationCount(
            @PathVariable int id,
            @RequestBody Map<String, Object> updates) {
        log.info("Request received at updateNotificationCount.");
        return ResponseEntity.ok(userService.updateNotificationCount(id, updates));
    }

    @PatchMapping(RESET_PASSWORD)
    public ResponseEntity<UserDto> updatePassword(
            @PathVariable int id,
            @RequestBody Map<String, Object> updates) {
        log.info("Request received at updatePassword.");
        return ResponseEntity.ok(userService.updatePassword(id, updates));
    }

}
