package com.postrify.postrifybackend.controller;

import com.postrify.postrifybackend.dto.PostRequest;
import com.postrify.postrifybackend.dto.PostResponseDTO;
import com.postrify.postrifybackend.dto.UserDTO;
import com.postrify.postrifybackend.model.Post;
import com.postrify.postrifybackend.model.User;
import com.postrify.postrifybackend.service.PostService;
import com.postrify.postrifybackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @GetMapping
    public List<PostResponseDTO> getAllPosts() {
        return postService.getAllPosts().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponseDTO> getPostById(@PathVariable Long id) {
        return postService.getPostById(id)
                .map(post -> ResponseEntity.ok().body(convertToDTO(post)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public List<PostResponseDTO> getPostsByUser(@PathVariable Long userId) {
        return postService.getPostsByUser(userId).stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<PostResponseDTO> createPost(@RequestBody PostRequest postRequest, Authentication authentication) {
        String username = authentication.getName();
        User user = userService.findByUsername(username);
        Post post = new Post();
        post.setTitle(postRequest.getTitle());
        post.setContent(postRequest.getContent());
        post.setUser(user);

        Post createdPost = postService.createPost(post);
        return ResponseEntity.ok(convertToDTO(createdPost));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostResponseDTO> updatePost(@PathVariable Long id, @RequestBody PostRequest postRequest, Authentication authentication) {
        String username = authentication.getName();
        User user = userService.findByUsername(username);

        Post postDetails = new Post();
        postDetails.setTitle(postRequest.getTitle());
        postDetails.setContent(postRequest.getContent());

        Post updatedPost = postService.updatePost(id, postDetails, user);
        return ResponseEntity.ok(convertToDTO(updatedPost));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id, Authentication authentication) {
        String username = authentication.getName();
        User user = userService.findByUsername(username);
        postService.deletePost(id, user);
        return ResponseEntity.noContent().build();
    }

    private PostResponseDTO convertToDTO(Post post) {
        User user = post.getUser();
        UserDTO userDTO = new UserDTO(user.getId(), user.getUsername(), user.getEmail());

        return new PostResponseDTO(
                post.getId(),
                post.getTitle(),
                post.getContent(),
                userDTO,
                post.getCreatedAt(),
                post.getUpdatedAt()
        );
    }
}
