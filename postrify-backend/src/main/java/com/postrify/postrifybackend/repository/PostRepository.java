package com.postrify.postrifybackend.repository;

import com.postrify.postrifybackend.model.Post;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
  List<Post> findByUserId(Long userId);
}
