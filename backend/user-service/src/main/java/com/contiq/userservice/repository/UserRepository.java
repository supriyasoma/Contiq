package com.contiq.userservice.repository;

import com.contiq.userservice.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity,Integer> {
    public UserEntity findByEmail(String email);
}