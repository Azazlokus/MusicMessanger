package com.azazl.tasklist.web.controller;

import com.azazl.tasklist.domain.task.Task;
import com.azazl.tasklist.domain.user.User;
import com.azazl.tasklist.service.TaskService;
import com.azazl.tasklist.service.UserService;
import com.azazl.tasklist.web.dto.task.TaskDto;
import com.azazl.tasklist.web.dto.user.UserDto;
import com.azazl.tasklist.web.dto.validation.OnCreate;
import com.azazl.tasklist.web.dto.validation.OnUpdate;
import com.azazl.tasklist.web.mappers.TaskMapper;
import com.azazl.tasklist.web.mappers.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Validated
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;
    private final TaskService taskService;
    private final TaskMapper taskMapper;
    @PutMapping
    public UserDto update(@Validated(OnUpdate.class) @RequestBody UserDto dto)
    {
        User user = userMapper.toEntity(dto);
        User updatedUser = userService.update(user);
        return userMapper.toDto(updatedUser);
    }
    @GetMapping("/{id}")
    public UserDto getById(@PathVariable Long id){
            User user = userService.getById(id);
            return userMapper.toDto(user);
    }
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id){
        userService.delete(id);
    }
    @GetMapping("/{id}/tasks")
    public List<TaskDto> getTasksUserById(@PathVariable Long id){
        List<Task> tasks = taskService.getAllByUserId(id);
        return taskMapper.toDto(tasks);
    }
    @PostMapping("/{id}/tasks")
    public TaskDto createTask(@PathVariable Long id,
                              @Validated(OnCreate.class) @RequestBody TaskDto dto){
        Task task = taskMapper.toEntity(dto);
        Task createdTask = taskService.create(task, id);
        return taskMapper.toDTO(createdTask);
    }
}

