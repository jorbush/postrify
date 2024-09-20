package com.postrify.postrifybackend.model;

import javax.validation.constraints.NotBlank;

public class LoginRequest {
  @NotBlank private String username;

  @NotBlank private String password;

  public LoginRequest(String username, String password) {
    this.username = username;
    this.password = password;
  }

  public String getUsername() {
    return username;
  }

  public String getPassword() {
    System.out.println("Returning password: " + password);
    return password;
  }
}
