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
    <div class="post-detail-container">
      @if (post) {
        <article class="post-content">
          <button class="btn btn-back" (click)="goBack()">
            <svg xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg>
          </button>
          <div class="post-header">
            <h1 class="post-title">{{ post.title }}</h1>
          </div>
          <div class="post-meta">
            <span class="author">By: {{ post.user.username }}</span>
            <span class="date">{{ post.createdAt | date: 'mediumDate' }}</span>
          </div>
          <p class="post-body">{{ post.content }}</p>
          @if (isLogged && post.user.username === username) {
            <div class="post-actions">
              <button class="btn btn-edit" (click)="editPost()">Edit</button>
              <button class="btn btn-delete" (click)="deletePost()">Delete</button>
            </div>
          }
        </article>
      } @else {
        <div class="loading">
          <div class="spinner"></div>
          <p>Loading post...</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .post-detail-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    .post-content {
      background-color: var(--header-bg);
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 2rem;
      position: relative;
    }

    .btn-back {
      position: absolute;
      top: 1rem;
      left: 1rem;
      background-color: transparent;
      color: var(--header-text);
      border: 1px solid var(--header-text);
      padding: 0.5rem 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-back:hover {
      color: var(--primary-color);
    }

    .post-header {
      display: flex;
      justify-content: center;
      width: 100%;
      align-items: center;
    }

    .post-title {
      font-size: 2.5rem;
      margin-top: 2rem;
      margin-bottom: 1rem;
      color: var(--primary-color);
      text-align: center;
    }

    .post-meta {
      display: flex;
      justify-content: space-between;
      color: var(--secondary-text-color);
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
    }

    .post-body {
      font-size: 1.1rem;
      line-height: 1.6;
      color: var(--body-text-color);
    }

    .post-actions {
      margin-top: 2rem;
      display: flex;
      justify-content: center;
      gap: 1rem;
    }

    .btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.3s ease;
    }

    .btn-edit {
      background-color: #4CAF50;
      color: white;
    }

    .btn-edit:hover {
      background-color: #45a049;
    }

    .btn-delete {
      background-color: #f44336;
      color: white;
    }

    .btn-delete:hover {
      background-color: #da190b;
    }

    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 200px;
    }

    .spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid var(--primary-color);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
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

  goBack(): void {
    this.router.navigate(['/']);
  }
}
