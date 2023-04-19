package com.azazl.tasklist.repository;

import com.azazl.tasklist.domain.user.Role;
import com.azazl.tasklist.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.mapstruct.Mapper;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;


public interface UserRepository {

    Optional<User> findById(Long id);

    Optional<User> findByUsername(String username);

    void update(User user);

    void create(User user);

    void insertUserRole(@Param("userId") Long userId, @Param("role") Role role);

    boolean isTaskOwner(@Param("userId") Long userId, @Param("taskId") Long taskId);

    void delete(Long id);

}

