package com.postrify.postrifybackend.service;

import com.postrify.postrifybackend.dto.PostResponseDTO;
import com.postrify.postrifybackend.dto.UserDTO;
import com.postrify.postrifybackend.model.Post;
import com.postrify.postrifybackend.model.User;
import com.postrify.postrifybackend.repository.PostRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PostService {

  @Autowired private PostRepository postRepository;

  @Autowired private UserService userService;

  @Transactional(readOnly = true)
  public List<PostResponseDTO> getAllPosts() {
    return postRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public Optional<PostResponseDTO> getPostById(Long id) {
    return postRepository.findById(id).map(this::convertToDTO);
  }

  @Transactional(readOnly = true)
  public List<PostResponseDTO> getPostsByUser(Long userId) {
    return postRepository.findByUserId(userId).stream()
        .map(this::convertToDTO)
        .collect(Collectors.toList());
  }

  @Transactional
  public PostResponseDTO createPost(Post post) {
    Post savedPost = postRepository.save(post);
    return convertToDTO(savedPost);
  }

  @Transactional
  public PostResponseDTO updatePost(Long id, Post postDetails, User currentUser) {
    Post post =
        postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));

    if (!post.getUser().getId().equals(currentUser.getId())) {
      throw new RuntimeException("You don't have permission to update this post");
    }

    post.setTitle(postDetails.getTitle());
    post.setContent(postDetails.getContent());
    Post updatedPost = postRepository.save(post);

    return convertToDTO(updatedPost);
  }

  @Transactional
  public void deletePost(Long id, User currentUser) {
    Post post =
        postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));

    if (!post.getUser().getId().equals(currentUser.getId())) {
      throw new RuntimeException("You don't have permission to delete this post");
    }

    postRepository.delete(post);
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
        post.getUpdatedAt());
  }
}
