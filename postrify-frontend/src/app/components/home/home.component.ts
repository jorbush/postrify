import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostResponseDTO } from '../../models/post-response.model';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Page } from '../../models/page.model';
import { Subscription } from 'rxjs';
import { UserImageService } from '../../services/user-image.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <div class="posts-grid-container">
        <div class="posts-grid">
          @for (post of posts; track post.id) {
            <div
              class="post-card"
              (click)="viewPost(post.id)"
              role="button"
              tabindex="0"
              (keyup.enter)="viewPost(post.id)"
              (keyup.space)="viewPost(post.id)"
            >
              <h3>{{ post.title }}</h3>
              <p>
                {{ post.content | slice: 0 : 100
                }}{{ post.content.length > 100 ? '...' : '' }}
              </p>
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
                <span class="date">{{ post.createdAt | date: 'short' }}</span>
              </div>
            </div>
          }
        </div>
      </div>
      @if (totalElements > 1) {
        <div class="pagination-controls">
          <button (click)="previousPage()" [disabled]="currentPage === 0">
            Back
          </button>

          <span *ngFor="let page of [].constructor(totalPages); let i = index">
            <button (click)="goToPage(i)" [class.active]="i === currentPage">
              {{ i + 1 }}
            </button>
          </span>

          <button
            (click)="nextPage()"
            [disabled]="currentPage === totalPages - 1"
          >
            Next
          </button>
        </div>
      }
      @if (isLogged) {
        <button
          class="floating-button"
          (click)="createPost()"
          aria-label="Create new post"
        ></button>
      }
    </div>
  `,
  styles: `
    .home-container {
      padding: 20px;
      position: relative;
    }

    .posts-grid-container {
      min-height: 65vh;
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
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 0.85rem;
      padding-top: 2rem;
    }

    .post-card:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .post-meta {
      display: flex;
      justify-content: space-between;
      font-size: 0.9em;
      color: var(--secondary-text-color);
    }

    .floating-button {
      position: fixed;
      bottom: 30px;
      right: 30px;
      background-color: var(--primary-color);
      color: white;
      border: none;
      border-radius: 50%;
      font-size: 2em;
      cursor: pointer;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      transition: background-color 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 60px;
      min-height: 60px;
      max-width: 60px;
      width: auto;
      height: auto;
      aspect-ratio: 1;
      overflow: hidden;
    }

    .floating-button::before {
      content: '+';
    }

    @supports (-webkit-touch-callout: none) {
      .floating-button::before {
        display: inline-block;
        transform: translateY(-7%);
      }
    }

    .floating-button:hover {
      background-color: var(--primary-color-hover);
    }

    .pagination-controls {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      flex-wrap: wrap;
      gap: 5px;
    }

    .pagination-controls button {
      padding: 8px 12px;
      margin: 0 2px;
      border: 1px solid var(--border-color);
      background-color: var(--header-bg);
      color: var(--text-color);
      border-radius: 4px;
      cursor: pointer;
      transition:
        background-color 0.3s,
        color 0.3s;
    }

    .pagination-controls button:hover:not([disabled]) {
      background-color: var(--primary-color);
      color: white;
    }

    .pagination-controls button.active {
      background-color: var(--primary-color);
      color: white;
      border-color: var(--primary-color);
    }

    .pagination-controls button[disabled] {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .author,
    .date {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .post-card h3,
    .post-card p {
      margin: 0;
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
  `,
})
export class HomeComponent implements OnInit, OnDestroy {
  private imageUpdateSubscription: Subscription | undefined;

  posts: PostResponseDTO[] = [];
  isLogged = false;
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  totalElements = 0;

  constructor(
    private postService: PostService,
    private router: Router,
    private authService: AuthService,
    private userImageService: UserImageService,
  ) {}

  ngOnInit(): void {
    this.fetchPosts(this.currentPage, this.pageSize);
    this.isLogged = this.authService.isAuthenticated();
    this.imageUpdateSubscription =
      this.userImageService.imageUpdated$.subscribe(() => {
        this.fetchPosts(this.currentPage, this.pageSize);
      });
  }

  fetchPosts(page: number, size: number): void {
    this.postService.getAllPosts(page, size).subscribe({
      next: (pageData: Page<PostResponseDTO>) => {
        this.posts = pageData.content;
        this.currentPage = pageData.page.number;
        this.pageSize = pageData.page.size;
        this.totalPages = pageData.page.totalPages;
        this.totalElements = pageData.page.totalElements;
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

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.fetchPosts(page, this.pageSize);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.fetchPosts(this.currentPage + 1, this.pageSize);
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.fetchPosts(this.currentPage - 1, this.pageSize);
    }
  }

  ngOnDestroy(): void {
    if (this.imageUpdateSubscription) {
      this.imageUpdateSubscription.unsubscribe();
    }
  }
}
