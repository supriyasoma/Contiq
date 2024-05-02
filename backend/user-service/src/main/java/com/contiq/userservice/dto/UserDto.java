package com.contiq.userservice.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private int id;
    private String name;
    private String email;
    private String password;
    private int notificationCount;

}
