package com.postrify.postrifybackend.dto;

public class UserDTO {
  private Long id;
  private String username;
  private String email;
  private String image;

  public UserDTO(final Long id, final String username, final String email, final String image) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.image = image;
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

  public String getImage() {
    return image;
  }

  public void setImage(final String image) {
    this.image = image;
  }
}
