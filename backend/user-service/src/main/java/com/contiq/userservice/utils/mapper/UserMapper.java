package com.contiq.userservice.utils.mapper;

import com.contiq.userservice.dto.UserDto;
import com.contiq.userservice.entity.UserEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
public class UserMapper {
    @Autowired
    ModelMapper modelMapper;

    public UserEntity dtoToEntity(UserDto userDTO){
        return modelMapper.map(userDTO, UserEntity.class);
    }

    public UserDto entityToDTO(UserEntity userEntity){
        return modelMapper.map(userEntity, UserDto.class);
    }
}
