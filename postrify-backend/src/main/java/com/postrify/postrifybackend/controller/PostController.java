package com.postrify.postrifybackend.controller;

import com.postrify.postrifybackend.dto.PostRequest;
import com.postrify.postrifybackend.model.Post;
import com.postrify.postrifybackend.model.User;
import com.postrify.postrifybackend.service.PostService;
import com.postrify.postrifybackend.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;
    private final UserService userService;

    public PostController(PostService postService, UserService userService) {
        this.postService = postService;
        this.userService = userService;
    }

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        return postService.getPostById(id)
            .map(post -> ResponseEntity.ok().body(post))
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public List<Post> getPostsByUser(@PathVariable Long userId) {
        return postService.getPostsByUser(userId);
    }

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody PostRequest postRequest, Authentication authentication) {
        String username = authentication.getName();
        User user = userService.findByUsername(username);
        Post post = new Post();
        post.setTitle(postRequest.getTitle());
        post.setContent(postRequest.getContent());
        post.setUser(user);

        Post createdPost = postService.createPost(post);
        return ResponseEntity.ok(createdPost);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody PostRequest postRequest, Authentication authentication) {
        String username = authentication.getName();
        User user = userService.findByUsername(username);

        Post postDetails = new Post();
        postDetails.setTitle(postRequest.getTitle());
        postDetails.setContent(postRequest.getContent());

        Post updatedPost = postService.updatePost(id, postDetails, user);
        return ResponseEntity.ok(updatedPost);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id, Authentication authentication) {
        String username = authentication.getName();
        User user = userService.findByUsername(username);
        postService.deletePost(id, user);
        return ResponseEntity.noContent().build();
    }
}
