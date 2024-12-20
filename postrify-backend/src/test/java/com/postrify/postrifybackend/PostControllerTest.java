package com.postrify.postrifybackend;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

import com.postrify.postrifybackend.controller.PostController;
import com.postrify.postrifybackend.dto.PostRequest;
import com.postrify.postrifybackend.dto.PostResponseDTO;
import com.postrify.postrifybackend.dto.UserDTO;
import com.postrify.postrifybackend.model.Post;
import com.postrify.postrifybackend.model.User;
import com.postrify.postrifybackend.service.PostService;
import com.postrify.postrifybackend.service.UserService;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

class PostControllerTest {

  @Mock private PostService postService;

  @Mock private UserService userService;

  @Mock private Authentication authentication;

  @InjectMocks private PostController postController;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @SuppressWarnings("unchecked")
  @Test
  void getAllPosts_Success() {
    UserDTO userDTO = new UserDTO(1L, "jordi", "jordi@mail.com", null);
    PostResponseDTO post1 =
        new PostResponseDTO(
            1L, "Post 1", "Content 1", userDTO, LocalDateTime.now(), LocalDateTime.now());
    PostResponseDTO post2 =
        new PostResponseDTO(
            2L, "Post 2", "Content 2", userDTO, LocalDateTime.now(), LocalDateTime.now());
    List<PostResponseDTO> posts = Arrays.asList(post1, post2);

    Pageable pageable = PageRequest.of(0, 10);
    Page<PostResponseDTO> page = new PageImpl<>(posts, pageable, posts.size());

    when(postService.getAllPosts(pageable)).thenReturn(page);

    Page<PostResponseDTO> result = postController.getAllPosts(pageable);

    assertNotNull(result);
    assertEquals(2, result.getContent().size());
    verify(postService, times(1)).getAllPosts(pageable);
  }

  @SuppressWarnings("null")
  @Test
  void getPostById_Found() {
    Long postId = 1L;
    UserDTO userDTO = new UserDTO(1L, "jordi", "jordi@mail.com", null);
    PostResponseDTO post =
        new PostResponseDTO(
            postId, "Post 1", "Content 1", userDTO, LocalDateTime.now(), LocalDateTime.now());

    when(postService.getPostById(postId)).thenReturn(Optional.of(post));

    ResponseEntity<PostResponseDTO> response = postController.getPostById(postId);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertTrue(response.getBody() instanceof PostResponseDTO);
    assertEquals(postId, response.getBody().getId());
    verify(postService, times(1)).getPostById(postId);
  }

  @Test
  void getPostById_NotFound() {
    Long postId = 1L;
    when(postService.getPostById(postId)).thenReturn(Optional.empty());

    ResponseEntity<PostResponseDTO> response = postController.getPostById(postId);

    assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    assertNull(response.getBody());
    verify(postService, times(1)).getPostById(postId);
  }

  @Test
  void getPostsByUser_Success() {
    Long userId = 1L;
    UserDTO userDTO = new UserDTO(userId, "jordi", "jordi@mail.com", null);
    PostResponseDTO post1 =
        new PostResponseDTO(
            1L, "Post 1", "Content 1", userDTO, LocalDateTime.now(), LocalDateTime.now());
    PostResponseDTO post2 =
        new PostResponseDTO(
            2L, "Post 2", "Content 2", userDTO, LocalDateTime.now(), LocalDateTime.now());
    List<PostResponseDTO> posts = Arrays.asList(post1, post2);

    when(postService.getPostsByUser(userId)).thenReturn(posts);

    List<PostResponseDTO> result = postController.getPostsByUser(userId);

    assertNotNull(result);
    assertEquals(2, result.size());
    verify(postService, times(1)).getPostsByUser(userId);
  }

  @SuppressWarnings("null")
  @Test
  void createPost_Success() {
    PostRequest postRequest = new PostRequest();
    postRequest.setTitle("New Post");
    postRequest.setContent("Content of the new post");

    User user = new User("jordi", "jordi@mail.com", "password");

    when(authentication.getName()).thenReturn("jordi");
    when(userService.findByUsername("jordi")).thenReturn(user);

    PostResponseDTO createdPost =
        new PostResponseDTO(
            1L,
            postRequest.getTitle(),
            postRequest.getContent(),
            new UserDTO(user.getId(), user.getUsername(), user.getEmail(), null),
            LocalDateTime.now(),
            LocalDateTime.now());

    when(postService.createPost(any(Post.class))).thenReturn(createdPost);

    ResponseEntity<PostResponseDTO> response =
        postController.createPost(postRequest, authentication);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertTrue(response.getBody() instanceof PostResponseDTO);
    assertEquals(postRequest.getTitle(), response.getBody().getTitle());
    assertEquals(postRequest.getContent(), response.getBody().getContent());

    verify(userService, times(1)).findByUsername("jordi");
    verify(postService, times(1)).createPost(any(Post.class));
  }

  @Test
  void createPost_UserNotFound() {
    PostRequest postRequest = new PostRequest();
    postRequest.setTitle("New Post");
    postRequest.setContent("Content of the new post");

    when(authentication.getName()).thenReturn("jordi");
    when(userService.findByUsername("jordi")).thenThrow(new RuntimeException("User not found"));

    RuntimeException exception =
        assertThrows(
            RuntimeException.class,
            () -> {
              postController.createPost(postRequest, authentication);
            });

    assertEquals("User not found", exception.getMessage());

    verify(userService, times(1)).findByUsername("jordi");
    verify(postService, times(0)).createPost(any(Post.class));
  }

  @SuppressWarnings("null")
  @Test
  void updatePost_Success() {
    Long postId = 1L;
    PostRequest postRequest = new PostRequest();
    postRequest.setTitle("Updated Post");
    postRequest.setContent("Updated content of the post");

    User user = new User("jordi", "jordi@mail.com", "password");

    when(authentication.getName()).thenReturn("jordi");
    when(userService.findByUsername("jordi")).thenReturn(user);

    PostResponseDTO updatedPost =
        new PostResponseDTO(
            postId,
            postRequest.getTitle(),
            postRequest.getContent(),
            new UserDTO(user.getId(), user.getUsername(), user.getEmail(), null),
            LocalDateTime.now(),
            LocalDateTime.now());

    when(postService.updatePost(eq(postId), any(Post.class), eq(user))).thenReturn(updatedPost);

    ResponseEntity<PostResponseDTO> response =
        postController.updatePost(postId, postRequest, authentication);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertTrue(response.getBody() instanceof PostResponseDTO);
    assertEquals(postRequest.getTitle(), response.getBody().getTitle());
    assertEquals(postRequest.getContent(), response.getBody().getContent());

    verify(userService, times(1)).findByUsername("jordi");
    verify(postService, times(1)).updatePost(eq(postId), any(Post.class), eq(user));
  }

  @Test
  void updatePost_PostNotFound() {
    Long postId = 1L;
    PostRequest postRequest = new PostRequest();
    postRequest.setTitle("Updated Post");
    postRequest.setContent("Updated content of the post");

    User user = new User("jordi", "jordi@mail.com", "password");

    when(authentication.getName()).thenReturn("jordi");
    when(userService.findByUsername("jordi")).thenReturn(user);

    when(postService.updatePost(eq(postId), any(Post.class), eq(user)))
        .thenThrow(new RuntimeException("Post not found"));

    RuntimeException exception =
        assertThrows(
            RuntimeException.class,
            () -> {
              postController.updatePost(postId, postRequest, authentication);
            });

    assertEquals("Post not found", exception.getMessage());

    verify(userService, times(1)).findByUsername("jordi");
    verify(postService, times(1)).updatePost(eq(postId), any(Post.class), eq(user));
  }

  @Test
  void updatePost_Forbidden() {
    Long postId = 1L;
    PostRequest postRequest = new PostRequest();
    postRequest.setTitle("Updated Post");
    postRequest.setContent("Updated content of the post");

    User user = new User("jordi", "jordi@mail.com", "password");

    when(authentication.getName()).thenReturn("jordi");
    when(userService.findByUsername("jordi")).thenReturn(user);

    when(postService.updatePost(eq(postId), any(Post.class), eq(user)))
        .thenThrow(new RuntimeException("You do not have permission to update this post"));

    RuntimeException exception =
        assertThrows(
            RuntimeException.class,
            () -> {
              postController.updatePost(postId, postRequest, authentication);
            });

    assertEquals("You do not have permission to update this post", exception.getMessage());

    verify(userService, times(1)).findByUsername("jordi");
    verify(postService, times(1)).updatePost(eq(postId), any(Post.class), eq(user));
  }
}
