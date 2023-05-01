package com.azazlokus;

import com.example.tasklist.domain.message.Message;
import com.example.tasklist.domain.user.User;
import com.example.tasklist.repository.DataSourceConfig;
import com.example.tasklist.repository.impl.UserRepositoryImpl;
import com.example.tasklist.service.UserService;
import com.example.tasklist.web.controller.AuthController;
import com.example.tasklist.web.controller.ControllerAdvice;
import com.example.tasklist.web.controller.TaskController;
import com.example.tasklist.web.controller.UserController;
import com.example.tasklist.web.dto.user.UserDto;
import com.example.tasklist.web.mappers.UserMapper;
import io.jsonwebtoken.lang.Assert;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class LoginTest {
    @Mock
    DataSourceConfig dataSourceConfig;
    @Mock
    private AuthController authController;
    @Mock
    private ControllerAdvice controllerAdvice;
    @Mock
    private TaskController taskController;
    @Mock
    private UserController userController;
    @Mock
    private UserMapper userMapper;
    @Mock
    private UserDto userDto;
    @Mock
    private UserService userService;
    @Mock
    private UserRepositoryImpl userRepository;


    @Test
    public void contextAuthControllerCreation() {

        Assert.notNull(authController);
    }
    @Test
    public void contextControllerAdviceCreation() {

        Assert.notNull(controllerAdvice);
    }
    @Test
    public void contextTaskControllerCreation() {

        Assert.notNull(taskController);
    }
    @Test
    public void contextUserControllerCreation() {

        Assert.notNull(userController);
    }
    @Test
    public void editMessage(){
        Message mess1 = new Message("Hello User!");
        Message mess2 =mess1;
        mess2.setContent("GoodBye, User!");
        Assert.isTrue(mess1.getContent().equals(mess2.getContent()));

    }
    @Test
    public void registerTest(){
        User user = userMapper.toEntity(userDto);
        User createdUser = userService.create(user);

        Assert.notNull(createdUser);
    }

    @Test
    public void isTaskOwnerNotNullTest(){
        boolean isOwner = userRepository.isTaskOwner(1L,4L);

        Assert.notNull(isOwner);
    }
    @Test
    public void isTaskOwnerIsBooleanTest(){
        boolean isOwner = userRepository.isTaskOwner(1L,4L);
        Assert.isInstanceOf(Boolean.class, isOwner);
    }
    @Test
    public void isTaskOwnerTest(){
        boolean isOwner = userRepository.isTaskOwner(1L,4L);
        Assert.isTrue(!isOwner);
    }

}
