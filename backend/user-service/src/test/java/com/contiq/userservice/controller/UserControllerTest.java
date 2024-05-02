package com.contiq.userservice.controller;

import com.contiq.userservice.config.JwtService;
import com.contiq.userservice.dto.AuthDto;
import com.contiq.userservice.dto.UserDto;
import com.contiq.userservice.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.contiq.userservice.utils.constants.AppConstants.BASE_URL;
import static org.junit.jupiter.api.Assertions.assertEquals;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
class UserControllerTest {

    @Mock
    private UserService userService;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private UserController userController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    void testGetAll_ReturnsListOfUsers() {
        List<UserDto> userList = Arrays.asList(
                new UserDto(1, "User One", "user1@example.com", "password123", 5),
                new UserDto(2, "User Two", "user2@example.com", "password456", 3)
        );

        when(userService.findAll()).thenReturn(userList);

        ResponseEntity<List<UserDto>> response = userController.getAll();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(userList, response.getBody());
    }

    @Test
    void testGetByEmail_ReturnsUserDTO() {
        String email = "user@example.com";
        UserDto userDTO = new UserDto(1, "Test User", email, "password123", 5);

        when(userService.findByEmail(email)).thenReturn(userDTO);

        ResponseEntity<UserDto> response = userController.getByEmail(email);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(userDTO, response.getBody());
    }

    @Test
    void testCreate_ReturnsCreatedUserDTO() {
        UserDto userDTO = new UserDto(1, "Test User", "user@example.com", "password123", 5);

        when(userService.save(userDTO)).thenReturn(userDTO);

        ResponseEntity<UserDto> response = userController.create(userDTO);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(userDTO, response.getBody());
    }

    @Test
    void testGetToken_WithValidCredentials() throws Exception {
        AuthDto auth = new AuthDto("test@example.com", "password123");
        String expectedToken = "test-token";

        when(jwtService.generateToken(auth.getEmail(), auth.getPassword())).thenReturn(expectedToken);

        mockMvc.perform(MockMvcRequestBuilders
                        .post(BASE_URL + "/login")
                        .content("{\"email\":\"test@example.com\",\"password\":\"password123\"}")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(expectedToken));
    }

    @Test
    void testUpdateNotificationCount_ReturnsUpdatedUserDTO() {
        int userId = 1;
        Map<String, Object> updates = new HashMap<>();
        updates.put("notificationCount", 5);

        UserDto userDTO = new UserDto(userId, "Test User", "user@example.com", "password123", 5);

        when(userService.updateNotificationCount(userId, updates)).thenReturn(userDTO);

        ResponseEntity<UserDto> response = userController.updateNotificationCount(userId, updates);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(userDTO, response.getBody());
    }

    @Test
    void testUpdatePassword_ReturnsUpdatedUserDTO() {
        int userId = 1;
        Map<String, Object> updates = new HashMap<>();
        updates.put("password", "newPassword");

        UserDto userDTO = new UserDto(userId, "Test User", "user@example.com", "password123", 5);

        when(userService.updatePassword(userId, updates)).thenReturn(userDTO);

        ResponseEntity<UserDto> response = userController.updatePassword(userId, updates);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(userDTO, response.getBody());
    }
}
