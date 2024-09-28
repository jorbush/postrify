package com.postrify.postrifybackend.dto;

public class UserDTO {
  private Long id;
  private String username;
  private String email;

  public UserDTO(final Long id, final String username, final String email) {
    this.id = id;
    this.username = username;
    this.email = email;
  }

  public Long getId() {
    return id;
  }

  public String getUsername() {
    return username;
  }

  public String getEmail() {
    return email;
  }

  public void setId(final Long id) {
    this.id = id;
  }

  public void setUsername(final String username) {
    this.username = username;
  }

  public void setEmail(final String email) {
    this.email = email;
  }
}
