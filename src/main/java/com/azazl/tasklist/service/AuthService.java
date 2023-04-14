package com.azazl.tasklist.service;

import com.azazl.tasklist.web.dto.auth.JwtRequest;
import com.azazl.tasklist.web.dto.auth.JwtResponse;

public interface AuthService {
    JwtResponse login(JwtRequest loginRequest);
    JwtResponse refresh(String refreshToken);
}
