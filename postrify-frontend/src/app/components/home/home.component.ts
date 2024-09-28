import { Component, OnInit } from '@angular/core';
import { PostResponseDTO } from '../../models/post-response.model';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <div class="posts-grid">
        @for (post of posts; track $index) {
          <div class="post-card" (click)="viewPost(post.id)">
            <h3>{{ post.title }}</h3>
            <p>
              {{ post.content | slice: 0 : 100
              }}{{ post.content.length > 100 ? '...' : '' }}
            </p>
            <div class="post-meta">
              <span>By: {{ post.user.username }}</span>
              <span>{{ post.createdAt | date: 'short' }}</span>
            </div>
          </div>
        }
      </div>
      @if (isLogged) {
        <button class="floating-button" (click)="createPost()">+</button>
      }
    </div>
  `,
  styles: `
    .home-container {
      padding: 20px;
      position: relative;
    }

    .posts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
    }

    .post-card {
      background-color: var(--header-bg);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 15px;
      cursor: pointer;
      transition: box-shadow 0.3s;
    }

    .post-card:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .post-meta {
      display: flex;
      justify-content: space-between;
      font-size: 0.9em;
      color: var(--secondary-text-color);
      margin-top: 10px;
    }

    .floating-button {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 60px;
      height: 60px;
      background-color: var(--primary-color);
      color: white;
      border: none;
      border-radius: 50%;
      font-size: 2em;
      cursor: pointer;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      transition: background-color 0.3s;
    }

    .floating-button:hover {
      background-color: var(--primary-color-hover);
    }
  `,
})
export class HomeComponent implements OnInit {
  posts: PostResponseDTO[] = [];
  isLogged: boolean = false;

  constructor(
    private postService: PostService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.fetchPosts();
    this.isLogged = this.authService.isAuthenticated();
  }

  fetchPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  viewPost(id: number): void {
    this.router.navigate(['/post', id]);
  }

  createPost(): void {
    this.router.navigate(['/create']);
  }
}
