package com.postrify.postrifybackend.controller;

import com.postrify.postrifybackend.model.JwtResponse;
import com.postrify.postrifybackend.model.LoginRequest;
import com.postrify.postrifybackend.model.MessageResponse;
import com.postrify.postrifybackend.model.SignUpRequest;
import com.postrify.postrifybackend.model.User;
import com.postrify.postrifybackend.security.JwtTokenProvider;
import com.postrify.postrifybackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired private UserService userService;

  @Autowired private AuthenticationManager authenticationManager;

  @Autowired private JwtTokenProvider jwtTokenProvider;

  @PostMapping(value = "/signup", produces = "application/json")
  public ResponseEntity<?> registerUser(@Validated @RequestBody final SignUpRequest signUpRequest) {
    System.out.println("Received signUpRequest: " + signUpRequest.getUsername());
    User user =
        new User(
            signUpRequest.getUsername(), signUpRequest.getEmail(), signUpRequest.getPassword());
    userService.registerUser(user);
    System.out.println("Returning success message");
    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }

  @PostMapping(value = "/signin", produces = "application/json")
  public ResponseEntity<?> authenticateUser(@Validated @RequestBody final LoginRequest loginRequest) {
    try {
      System.out.println("Received loginRequest: " + loginRequest.getUsername());
      Authentication authentication =
          authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(
                  loginRequest.getUsername(), loginRequest.getPassword()));
      SecurityContextHolder.getContext().setAuthentication(authentication);
      String jwt = jwtTokenProvider.generateToken(authentication);
      UserDetails userDetails = (UserDetails) authentication.getPrincipal();
      System.out.println("Returning jwt response");
      return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername()));
    } catch (Exception e) {
      System.out.println("Exception: " + e);
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
          .body(new MessageResponse("Invalid credentials!"));
    }
  }
}
