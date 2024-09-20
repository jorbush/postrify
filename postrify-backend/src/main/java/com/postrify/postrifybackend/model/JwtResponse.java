package com.postrify.postrifybackend.model;

public class JwtResponse {
  private String token;
  private String username;

  public JwtResponse(final String token, final String username) {
    this.token = token;
    this.username = username;
  }

  public String getToken() {
    return token;
  }

  public String getUsername() {
    return username;
  }
}
