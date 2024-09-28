package com.postrify.postrifybackend.dto;

public class PostRequest {
  private String title;
  private String content;

  public String getTitle() {
    return title;
  }

  public void setTitle(final String title) {
    this.title = title;
  }

  public String getContent() {
    return content;
  }

  public void setContent(final String content) {
    this.content = content;
  }
}
