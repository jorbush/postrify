import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostResponseDTO } from '../../models/post-response.model';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { ReadingTimePipe } from '../../pipes/reading-time.pipe';
import { BoldTextPipe } from '../../pipes/bold-text.pipe';
import { Subscription } from 'rxjs';
import { UserImageService } from '../../services/user-image.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, ReadingTimePipe, BoldTextPipe],
  template: `
    <div class="post-detail-container">
      @if (post) {
        <article class="post-content">
          <div class="post-buttons">
            <button class="btn btn-back" (click)="goBack()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 6l-6 6l6 6" />
              </svg>
            </button>
            @if (isLogged && post.user.username === username) {
              <div class="post-actions">
                <button class="btn btn-edit" (click)="editPost()">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-edit"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"
                    />
                    <path
                      d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"
                    />
                    <path d="M16 5l3 3" />
                  </svg>
                </button>
                <button class="btn btn-delete" (click)="deletePost()">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 7l16 0" />
                    <path d="M10 11l0 6" />
                    <path d="M14 11l0 6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                </button>
              </div>
            }
          </div>
          <div class="post-header">
            <h1 class="post-title">{{ post.title }}</h1>
          </div>
          <div class="post-meta">
            <span class="author">
              <div
                class="user-photo"
                [style.backgroundImage]="
                  post.user.image
                    ? 'url(' + post.user.image + ')'
                    : 'url(/assets/placeholder.jpg)'
                "
              ></div>
              {{ post.user.username }}
            </span>
            <span class="reading-time" aria-label="Estimated reading time">{{
              post.content | readingTime
            }}</span>
            <span class="date">{{ post.createdAt | date: 'mediumDate' }}</span>
          </div>
          <p class="post-body" [innerHTML]="post.content | boldText"></p>
        </article>
      } @else {
        <div class="loading">
          <div class="spinner"></div>
          <p>Loading post...</p>
        </div>
      }
    </div>
  `,
  styles: [
    `
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

      .post-buttons {
        display: flex;
        justify-content: space-between;
      }

      .post-actions {
        display: flex;
        justify-content: center;
      }

      .btn-back,
      .btn-edit,
      .btn-delete {
        top: 1rem;
        left: 1rem;
        background-color: transparent;
        color: var(--header-text);
        padding: 0.5rem 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        border: none;
      }

      .btn-back:hover,
      .btn-edit:hover,
      .btn-delete:hover {
        color: var(--primary-color);
        transform: scale(1.1);
      }

      .post-header {
        display: flex;
        justify-content: center;
        width: 100%;
        align-items: center;
      }

      .post-title {
        font-size: 2.5rem;
        margin-top: 1rem;
        margin-bottom: 2rem;
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
        white-space: pre-wrap;
        text-align: justify;
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
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      @media (pointer: coarse) {
        .btn-back,
        .btn-edit,
        .btn-delete {
          background-color: initial;
          color: var(--header-text);
        }
      }

      .author,
      .reading-time,
      .date {
        display: flex;
        align-items: center;
        gap: 0.4rem;
      }

      .user-photo {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
        position: relative;
        border: 2px solid var(--border-color);
      }

      @media (max-width: 500px) {
        .post-detail-container {
          padding: 0.5rem;
        }
        .post-title {
          font-size: 2rem;
        }
        .post-content {
          padding: 1rem;
        }
      }
    `,
  ],
})
export class PostDetailComponent implements OnInit {
  private imageUpdateSubscription: Subscription | undefined;

  post?: PostResponseDTO;
  isLogged = false;
  username?: string;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,
    private userImageService: UserImageService,
  ) {}

  ngOnInit(): void {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchPost(postId);
    this.isLogged = this.authService.isAuthenticated();
    this.username = localStorage.getItem('username') || '';
    this.imageUpdateSubscription =
      this.userImageService.imageUpdated$.subscribe(() => {
        this.fetchPost(postId);
      });
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
          error: (error) => {
            console.error('Error deleting post', error);
            this.toastService.show('Error deleting post', 'error');
            if (error.status === 401) {
              this.toastService.show(
                'You need to be logged in to delete a post',
                'error',
              );
              this.router.navigate(['/login']);
            }
          },
        });
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
