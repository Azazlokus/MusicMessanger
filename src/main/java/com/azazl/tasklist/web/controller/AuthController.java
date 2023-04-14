package com.azazl.tasklist.web.controller;

import com.azazl.tasklist.domain.user.User;
import com.azazl.tasklist.service.AuthService;
import com.azazl.tasklist.service.UserService;
import com.azazl.tasklist.web.dto.auth.JwtRequest;
import com.azazl.tasklist.web.dto.auth.JwtResponse;
import com.azazl.tasklist.web.dto.user.UserDto;
import com.azazl.tasklist.web.dto.validation.OnCreate;
import com.azazl.tasklist.web.mappers.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Validated
public class AuthController {
    private final AuthService authService;
    private final UserService userService;
    private final UserMapper userMapper;
    @PostMapping("/login")
    public JwtResponse login(@Validated @RequestBody JwtRequest  loginRequest){
        return authService.login(loginRequest);
    }
    @PostMapping("/register")
    public UserDto register(@Validated(OnCreate.class) @RequestBody UserDto userDto){
        User user = userMapper.toEntity(userDto);
        User createdUser = userService.create(user);
        return userMapper.toDto(createdUser);
    }
    @PostMapping("/refresh")
    public JwtResponse refresh(@RequestBody String refreshToken){
        return authService.refresh(refreshToken);
    }
}
