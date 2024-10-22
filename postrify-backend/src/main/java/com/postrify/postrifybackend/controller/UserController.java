package com.postrify.postrifybackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.postrify.postrifybackend.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

  @Autowired
  private UserService userService;

  @GetMapping("/{username}/image")
  public ResponseEntity<String> getUserImage(@PathVariable String username) {
    String base64Image = userService.getUserImage(username);
    return ResponseEntity.ok(base64Image);
  }

  @PutMapping("/{username}/image")
  public ResponseEntity<String> updateUserImage(
      @PathVariable String username,
      @RequestBody String base64Image) {
    userService.updateUserImage(username, base64Image);
    return ResponseEntity.ok("User image updated successfully!");
  }
}
