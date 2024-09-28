import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostResponseDTO } from '../../models/post-response.model';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (post) {
      <div>
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
        <div>
          <span>By: {{ post.user.username }}</span>
          <span>{{ post.createdAt | date: 'short' }}</span>
        </div>
        @if (isLogged && post.user.username === username) {
          <button (click)="editPost()">Edit</button>
          <button (click)="deletePost()">Delete</button>
        }
      </div>
    }

    @if (!post) {
      <p>Loading post...</p>
    }
  `,
  styles: ``,
})
export class PostDetailComponent implements OnInit {
  post?: PostResponseDTO;
  isLogged: boolean = false;
  username?: string;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchPost(postId);
    this.isLogged = this.authService.isAuthenticated();
    this.username = localStorage.getItem('username') || '';
  }

  fetchPost(id: number): void {
    this.postService.getPostById(id).subscribe({
      next: (post) => (this.post = post),
      error: (error) => console.error('Error fetching post', error),
    });
  }

  editPost(): void {
    if (this.post) {
      this.router.navigate(['/edit', this.post.id]);
    }
  }

  deletePost(): void {
    if (this.post) {
      if (confirm('Are you sure you want to delete this post?')) {
        this.postService.deletePost(this.post.id).subscribe({
          next: () => {
            console.log('Post deleted successfully');
            this.router.navigate(['/']);
          },
          error: (error) => console.error('Error deleting post', error),
        });
      }
    }
  }
}
