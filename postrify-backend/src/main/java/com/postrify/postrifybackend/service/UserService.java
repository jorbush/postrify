package com.postrify.postrifybackend.service;

import com.postrify.postrifybackend.model.User;
import com.postrify.postrifybackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @Autowired
  public UserService(final UserRepository userRepository, final PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public User registerUser(final User user) {
    if (userRepository.existsByUsername(user.getUsername())) {
      throw new RuntimeException("Username is already taken!");
    }
    if (userRepository.existsByEmail(user.getEmail())) {
      throw new RuntimeException("Email is already in use!");
    }
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    return userRepository.save(user);
  }

  public String getUserImage(String username) {
    User user = findByUsername(username);
    return user.getImage();
  }

  public void updateUserImage(String username, String base64Image) {
    User user = findByUsername(username);
    user.setImage(base64Image);
    userRepository.save(user);
  }

  public User findByUsername(final String username) {
    return userRepository
        .findByUsername(username)
        .orElseThrow(() -> new RuntimeException("User not found"));
  }
}
