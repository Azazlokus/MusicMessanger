package com.azazl.tasklist.repository;

import com.azazl.tasklist.domain.task.Task;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.Optional;


public interface TaskRepository {
    Optional<Task> findById(Long id);
    List<Task> findAllByUser(Long userId);
    List<Task> assignToUserById(Long taskId, Long userId);
    void update(Task task);
    void create(Task task);
    void delete(Long id);


}
