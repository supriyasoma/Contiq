package com.contiq.userservice.service;

import com.contiq.userservice.dto.UserDto;
import com.contiq.userservice.entity.UserEntity;
import com.contiq.userservice.exception.UserException;
import com.contiq.userservice.repository.UserRepository;
import com.contiq.userservice.service.implementation.UserServiceImpl;
import com.contiq.userservice.utils.mapper.UserMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.never;

class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testFindAll_ReturnsListOfUserDTOs() {
        when(userRepository.findAll()).thenReturn(List.of(new UserEntity(), new UserEntity()));
        when(userMapper.entityToDTO(any(UserEntity.class))).thenReturn(new UserDto());

        var result = userService.findAll();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(userRepository, times(1)).findAll();
        verify(userMapper, times(2)).entityToDTO(any(UserEntity.class));
    }

    @Test
    void testFindByEmail_UserFound_ReturnsUserDTO() {
        String email = "test@example.com";
        UserEntity userEntity = new UserEntity();
        when(userRepository.findByEmail(email)).thenReturn(userEntity);
        when(userMapper.entityToDTO(userEntity)).thenReturn(new UserDto());

        var result = userService.findByEmail(email);

        assertNotNull(result);
        verify(userRepository, times(1)).findByEmail(email);
        verify(userMapper, times(1)).entityToDTO(userEntity);
    }

    @Test
    void testFindByEmail_UserNotFound_ThrowsUserNotFound() {
        String email = "nonexistent@example.com";
        when(userRepository.findByEmail(email)).thenReturn(null);

        assertThrows(UserException.class, () -> userService.findByEmail(email));
        verify(userRepository, times(1)).findByEmail(email);
        verify(userMapper, never()).entityToDTO(any(UserEntity.class));
    }

    @Test
    void testSave_ReturnsCreatedUserDTO() {
        UserDto userDTO = new UserDto(1, "Test User", "test@example.com", "password123", 0);
        UserEntity userEntity = new UserEntity();

        when(userRepository.findByEmail(userDTO.getEmail())).thenReturn(null);
        when(userMapper.dtoToEntity(userDTO)).thenReturn(userEntity);
        when(userRepository.save(userEntity)).thenReturn(userEntity);
        when(userMapper.entityToDTO(userEntity)).thenReturn(userDTO);

        var result = userService.save(userDTO);

        assertNotNull(result);
        assertEquals(userDTO, result);
        verify(userRepository, times(1)).findByEmail(userDTO.getEmail());
        verify(userMapper, times(1)).dtoToEntity(userDTO);
        verify(userRepository, times(1)).save(userEntity);
        verify(userMapper, times(1)).entityToDTO(userEntity);
    }

    @Test
    void testSave_EmailAlreadyExists_ThrowsUserNotFound() {
        UserDto userDTO = new UserDto(1, "Test User", "existing@example.com", "password123", 0);

        when(userRepository.findByEmail(userDTO.getEmail())).thenReturn(new UserEntity());

        assertThrows(UserException.class, () -> userService.save(userDTO));
        verify(userRepository, times(1)).findByEmail(userDTO.getEmail());
        verify(userMapper, never()).dtoToEntity(userDTO);
        verify(userRepository, never()).save(any(UserEntity.class));
        verify(userMapper, never()).entityToDTO(any(UserEntity.class));
    }

    @Test
    void testSave_Encryption() {
        UserDto userDTO = new UserDto(1, "Test User", "test@example.com", "password123", 0);
        UserEntity userEntity = new UserEntity();
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String originalPassword = userDTO.getPassword();

        when(userRepository.findByEmail(userDTO.getEmail())).thenReturn(null);
        when(userMapper.dtoToEntity(userDTO)).thenReturn(userEntity);
        when(userRepository.save(userEntity)).thenReturn(userEntity);
        when(userMapper.entityToDTO(userEntity)).thenReturn(userDTO);

        var result = userService.save(userDTO);

        assertNotNull(result);
        assertEquals(userDTO, result);
        assertNotEquals(originalPassword, result.getPassword());
        assertTrue(passwordEncoder.matches(originalPassword, result.getPassword()));

        verify(userRepository, times(1)).findByEmail(userDTO.getEmail());
        verify(userMapper, times(1)).dtoToEntity(userDTO);
        verify(userRepository, times(1)).save(userEntity);
        verify(userMapper, times(1)).entityToDTO(userEntity);
    }

    @Test
    void testSave_ExceptionThrown_ThrowsUserNotFound() {
        UserDto userDTO = new UserDto(1, "Test User", "test@example.com", "password123", 0);

        when(userRepository.findByEmail(userDTO.getEmail())).thenReturn(null);
        when(userMapper.dtoToEntity(userDTO)).thenReturn(new UserEntity());
        when(userRepository.save(any(UserEntity.class))).thenThrow(new RuntimeException());

        assertThrows(UserException.class, () -> userService.save(userDTO));
        verify(userRepository, times(1)).findByEmail(userDTO.getEmail());
        verify(userMapper, times(1)).dtoToEntity(userDTO);
        verify(userRepository, times(1)).save(any(UserEntity.class));
        verify(userMapper, never()).entityToDTO(any(UserEntity.class));
    }

    @Test
    void testUpdateNotificationCount() {
        int userId = 1;
        UserEntity mockUser = new UserEntity();
        mockUser.setId(userId);
        mockUser.setNotificationCount(10);

        when(userRepository.findById(userId)).thenReturn(Optional.of(mockUser));
        when(userRepository.save(any(UserEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));
        UserDto mockUserDTO = new UserDto();
        mockUserDTO.setId(userId);
        mockUserDTO.setNotificationCount(15);

        when(userMapper.entityToDTO(any(UserEntity.class))).thenReturn(mockUserDTO);

        Map<String, Object> userUpdates = new HashMap<>();
        int newNotificationCount = 15;
        userUpdates.put("notificationCount", newNotificationCount);

        UserDto result = userService.updateNotificationCount(userId, userUpdates);

        assertNotNull(result);
        assertEquals(newNotificationCount, result.getNotificationCount());
        assertEquals(userId, result.getId());

        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, times(1)).save(any(UserEntity.class));
        verify(userMapper, times(1)).entityToDTO(any(UserEntity.class));
    }

    @Test
    void testUpdateNotificationCount_UserNotFound_ThrowsUserNotFound() {
        int userId = 1;
        Map<String, Object> userUpdates = new HashMap<>();
        userUpdates.put("notificationCount", 5);

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(UserException.class, () -> userService.updateNotificationCount(userId, userUpdates));
        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, never()).save(any(UserEntity.class));
        verify(userMapper, never()).entityToDTO(any(UserEntity.class));
    }

    @Test
    void testUpdatePassword_PasswordChanged_ReturnsUpdatedUserDTO() {
        int userId = 1;
        Map<String, Object> userUpdates = new HashMap<>();
        userUpdates.put("password", "newPassword");

        UserEntity userEntity = new UserEntity();
        userEntity.setId(userId);
        String originalPassword = "oldPassword";
        userEntity.setPassword(new BCryptPasswordEncoder().encode(originalPassword));

        when(userRepository.findById(userId)).thenReturn(Optional.of(userEntity));
        when(userRepository.save(userEntity)).thenReturn(userEntity);

        when(userMapper.entityToDTO(userEntity)).thenAnswer(invocation -> {
            UserDto userDTO = new UserDto();
            userDTO.setId(userEntity.getId());
            userDTO.setPassword((String) userUpdates.get("password"));
            return userDTO;
        });

        var result = userService.updatePassword(userId, userUpdates);

        assertNotNull(result);
        assertEquals(userId, result.getId());
        assertNotEquals(originalPassword, result.getPassword());
        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, times(1)).save(userEntity);
        verify(userMapper, times(1)).entityToDTO(userEntity);
    }

    @Test
    void testUpdatePassword_UserFound_SameAsPreviousPassword_ThrowsUserNotFound() {
        int userId = 1;
        Map<String, Object> userUpdates = new HashMap<>();
        userUpdates.put("password", "oldPassword");

        UserEntity userEntity = new UserEntity();
        userEntity.setId(userId);
        String originalPassword = "oldPassword";
        userEntity.setPassword(new BCryptPasswordEncoder().encode(originalPassword));

        when(userRepository.findById(userId)).thenReturn(Optional.of(userEntity));

        assertThrows(UserException.class, () -> userService.updatePassword(userId, userUpdates));
        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, never()).save(any(UserEntity.class));
        verify(userMapper, never()).entityToDTO(any(UserEntity.class));
    }

    @Test
    void testUpdatePassword_UserNotFound_ThrowsUserNotFound() {
        int userId = 1;
        Map<String, Object> userUpdates = new HashMap<>();
        userUpdates.put("password", "newPassword");

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(UserException.class, () -> userService.updatePassword(userId, userUpdates));
        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, never()).save(any(UserEntity.class));
        verify(userMapper, never()).entityToDTO(any(UserEntity.class));
    }

    @Test
    void testUpdatePassword_PasswordFieldMissing_ThrowsUserNotFound() {
        int userId = 1;
        Map<String, Object> userUpdates = new HashMap<>();

        UserEntity userEntity = new UserEntity();
        userEntity.setId(userId);
        userEntity.setPassword("oldPassword");

        when(userRepository.findById(userId)).thenReturn(Optional.of(userEntity));

        assertThrows(UserException.class, () -> userService.updatePassword(userId, userUpdates));

        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, never()).save(any(UserEntity.class));
        verify(userMapper, never()).entityToDTO(any(UserEntity.class));
    }

    @Test
    void testUpdateNotificationCount_NotificationCountFieldMissing_ThrowsUserNotFound() {
        int userId = 1;
        Map<String, Object> userUpdates = new HashMap<>();

        UserEntity userEntity = new UserEntity();
        userEntity.setId(userId);
        userEntity.setNotificationCount(10);

        when(userRepository.findById(userId)).thenReturn(Optional.of(userEntity));

        assertThrows(UserException.class, () -> userService.updateNotificationCount(userId, userUpdates));

        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, never()).save(any(UserEntity.class));
        verify(userMapper, never()).entityToDTO(any(UserEntity.class));
    }

}
