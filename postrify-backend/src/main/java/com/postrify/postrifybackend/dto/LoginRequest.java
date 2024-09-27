package com.postrify.postrifybackend.dto;

import javax.validation.constraints.NotBlank;

public class LoginRequest {
  @NotBlank private String username;

  @NotBlank private String password;

  public LoginRequest(final String username, final String password) {
    this.username = username;
    this.password = password;
  }

  public String getUsername() {
    return username;
  }

  public String getPassword() {
    return password;
  }
}
