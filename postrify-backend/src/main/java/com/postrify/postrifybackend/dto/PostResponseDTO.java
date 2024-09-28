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
      final Long id,
      final String title,
      final String content,
      final UserDTO user,
      final LocalDateTime createdAt,
      final LocalDateTime updatedAt) {
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

  public void setId(final Long id) {
    this.id = id;
  }

  public void setTitle(final String title) {
    this.title = title;
  }

  public void setContent(final String content) {
    this.content = content;
  }

  public void setUser(final UserDTO user) {
    this.user = user;
  }

  public void setCreatedAt(final LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public void setUpdatedAt(final LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
  }
}
