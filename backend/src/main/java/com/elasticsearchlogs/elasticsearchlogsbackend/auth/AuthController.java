package com.elasticsearchlogs.elasticsearchlogsbackend.auth;


import com.elasticsearchlogs.elasticsearchlogsbackend.auth.jwt.AuthService;
import com.elasticsearchlogs.elasticsearchlogsbackend.auth.jwt.dto.AuthResponse;
import com.elasticsearchlogs.elasticsearchlogsbackend.auth.jwt.dto.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @CookieValue(name = "accessToken", required = false) String accessToken,
            @CookieValue(name = "refreshToken", required = false) String refreshToken,
            @RequestBody LoginRequest loginRequest) {

        return authService.login(loginRequest, accessToken, refreshToken);
    }

    @PostMapping("/logout")
    public ResponseEntity<AuthResponse> logout(HttpServletRequest request, HttpServletResponse response) {
        return ResponseEntity.ok(new AuthResponse(AuthResponse.Status.SUCCESS, authService.logout(request, response)));
    }
}
