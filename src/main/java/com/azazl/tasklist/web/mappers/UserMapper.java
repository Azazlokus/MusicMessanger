package com.azazl.tasklist.web.mappers;

import com.azazl.tasklist.domain.user.User;
import com.azazl.tasklist.web.dto.user.UserDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toDto(User user);
    User toEntity(UserDto dto);

}
