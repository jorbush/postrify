// src/main/java/com/postrify/postrifybackend/dto/PostResponseDTO.java
package com.postrify.postrifybackend.dto;

import java.time.LocalDateTime;

public class PostResponseDTO {
  private Long id;
  private String title;
  private String content;
  private UserDTO user;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  public PostResponseDTO(
      Long id,
      String title,
      String content,
      UserDTO user,
      LocalDateTime createdAt,
      LocalDateTime updatedAt) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.user = user;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public Long getId() {
    return id;
  }

  public String getTitle() {
    return title;
  }

  public String getContent() {
    return content;
  }

  public UserDTO getUser() {
    return user;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public LocalDateTime getUpdatedAt() {
    return updatedAt;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public void setUser(UserDTO user) {
    this.user = user;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public void setUpdatedAt(LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
  }
}
