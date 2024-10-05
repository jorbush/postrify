package com.postrify.postrifybackend.controller;

import com.postrify.postrifybackend.dto.PostRequest;
import com.postrify.postrifybackend.dto.PostResponseDTO;
import com.postrify.postrifybackend.model.Post;
import com.postrify.postrifybackend.model.User;
import com.postrify.postrifybackend.service.PostService;
import com.postrify.postrifybackend.service.UserService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
public class PostController {

  @Autowired private PostService postService;

  @Autowired private UserService userService;

  @GetMapping
  public Page<PostResponseDTO> getAllPosts(
      @PageableDefault(page = 0, size = 10, sort = "updatedAt", direction = Sort.Direction.DESC)
          Pageable pageable) {
    return postService.getAllPosts(pageable);
  }

  @GetMapping("/{id}")
  public ResponseEntity<PostResponseDTO> getPostById(@PathVariable final Long id) {
    Optional<PostResponseDTO> post = postService.getPostById(id);
    return post.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
  }

  @GetMapping("/user/{userId}")
  public List<PostResponseDTO> getPostsByUser(@PathVariable final Long userId) {
    return postService.getPostsByUser(userId);
  }

  @PostMapping
  public ResponseEntity<PostResponseDTO> createPost(
      @RequestBody final PostRequest postRequest, final Authentication authentication) {
    if (authentication == null) {
      return ResponseEntity.status(401).build();
    }
    String username = authentication.getName();
    User user = userService.findByUsername(username);

    Post post = new Post();
    post.setTitle(postRequest.getTitle());
    post.setContent(postRequest.getContent());
    post.setUser(user);

    PostResponseDTO createdPost = postService.createPost(post);
    return ResponseEntity.ok(createdPost);
  }

  @PutMapping("/{id}")
  public ResponseEntity<PostResponseDTO> updatePost(
      @PathVariable final Long id,
      @RequestBody final PostRequest postRequest,
      final Authentication authentication) {
    if (authentication == null) {
      return ResponseEntity.status(401).build();
    }
    String username = authentication.getName();
    User user = userService.findByUsername(username);

    Post postDetails = new Post();
    postDetails.setTitle(postRequest.getTitle());
    postDetails.setContent(postRequest.getContent());

    PostResponseDTO updatedPost = postService.updatePost(id, postDetails, user);
    return ResponseEntity.ok(updatedPost);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deletePost(
      @PathVariable final Long id, final Authentication authentication) {
    if (authentication == null) {
      return ResponseEntity.status(401).build();
    }
    String username = authentication.getName();
    User user = userService.findByUsername(username);
    postService.deletePost(id, user);
    return ResponseEntity.noContent().build();
  }
}
