package com.postrify.postrifybackend;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.postrify.postrifybackend.controller.AuthController;
import com.postrify.postrifybackend.model.*;
import com.postrify.postrifybackend.security.JwtTokenProvider;
import com.postrify.postrifybackend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;

class AuthControllerTest {

  @Mock private UserService userService;

  @Mock private AuthenticationManager authenticationManager;

  @Mock private JwtTokenProvider jwtTokenProvider;

  @InjectMocks private AuthController authController;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void registerUser_Success() {
    SignUpRequest signUpRequest = new SignUpRequest("testuser", "test@example.com", "password");
    User user =
        new User(
            signUpRequest.getUsername(), signUpRequest.getEmail(), signUpRequest.getPassword());

    when(userService.registerUser(any(User.class))).thenReturn(user);

    ResponseEntity<?> response = authController.registerUser(signUpRequest);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertTrue(response.getBody() instanceof MessageResponse);
    assertEquals(
        "User registered successfully!", ((MessageResponse) response.getBody()).getMessage());

    verify(userService, times(1)).registerUser(any(User.class));
  }

  @Test
  void authenticateUser_Success() {
    LoginRequest loginRequest = new LoginRequest("testuser", "password");
    Authentication authentication = mock(Authentication.class);
    UserDetails userDetails = mock(UserDetails.class);

    when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
        .thenReturn(authentication);
    when(jwtTokenProvider.generateToken(authentication)).thenReturn("mockJwtToken");
    when(authentication.getPrincipal()).thenReturn(userDetails);
    when(userDetails.getUsername()).thenReturn("testuser");

    ResponseEntity<?> response = authController.authenticateUser(loginRequest);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertTrue(response.getBody() instanceof JwtResponse);
    JwtResponse jwtResponse = (JwtResponse) response.getBody();
    assertEquals("mockJwtToken", jwtResponse.getToken());
    assertEquals("testuser", jwtResponse.getUsername());

    verify(authenticationManager, times(1))
        .authenticate(any(UsernamePasswordAuthenticationToken.class));
    verify(jwtTokenProvider, times(1)).generateToken(authentication);
  }

  @Test
  void authenticateUser_Failure() {
    LoginRequest loginRequest = new LoginRequest("testuser", "wrongpassword");

    when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
        .thenThrow(new RuntimeException("Authentication failed"));

    ResponseEntity<?> response = authController.authenticateUser(loginRequest);

    assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    assertTrue(response.getBody() instanceof MessageResponse);
    assertEquals("Invalid credentials!", ((MessageResponse) response.getBody()).getMessage());

    verify(authenticationManager, times(1))
        .authenticate(any(UsernamePasswordAuthenticationToken.class));
    verify(jwtTokenProvider, never()).generateToken(any());
  }
}
