import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-post-update',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="form-container">
      <h2>Update Post</h2>
      <form (ngSubmit)="onSubmit()" #postForm="ngForm">
        <div class="form-group">
          <label for="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            [(ngModel)]="post.title"
            required
            minlength="3"
            maxlength="31"
            #titleInput="ngModel"
          />
          <div class="character-count">{{ post.title.length }}/31</div>
          @if (titleInput.invalid && (titleInput.dirty || titleInput.touched)) {
            <div class="error-message">
              @if (titleInput.errors?.['required']) {
                <div>Title is required.</div>
              }
              @if (titleInput.errors?.['minlength']) {
                <div>Title must be at least 3 characters long.</div>
              }
            </div>
          }
        </div>
        <div class="form-group">
          <label for="content">Content:</label>
          <textarea
            id="content"
            name="content"
            [(ngModel)]="post.content"
            required
            minlength="10"
            maxlength="5000"
            #contentInput="ngModel"
          ></textarea>
          <div class="character-count">{{ post.content.length }}/5000</div>
          @if (
            contentInput.invalid && (contentInput.dirty || contentInput.touched)
          ) {
            <div class="error-message">
              @if (contentInput.errors?.['required']) {
                <div>Content is required.</div>
              }
              @if (contentInput.errors?.['minlength']) {
                <div>Content must be at least 10 characters long.</div>
              }
            </div>
          }
        </div>
        <button type="submit" [disabled]="!postForm.form.valid">
          Update Post
        </button>
      </form>
    </div>
  `,
  styles: [
    `
      .form-container {
        max-width: 600px;
        margin: 2rem auto;
        padding: 2rem;
        border-radius: 8px;
        background-color: var(--card-bg);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .form-container h2 {
        text-align: center;
        margin-bottom: 20px;
      }

      .form-group {
        margin-bottom: 15px;
        position: relative;
      }

      .form-group label {
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .form-group input,
      .form-group textarea {
        width: 95%;
        padding: 0.5rem;
        font-family: 'Quicksand', sans-serif;
        background-color: var(--input-bg);
        color: var(--text-color);
        border: 1px solid var(--border-color);
        border-radius: 4px;
        font-size: 16px;
      }

      textarea {
        height: 30vh;
      }

      .character-count {
        position: absolute;
        right: 10px;
        bottom: 5px;
        font-size: 0.8em;
        color: var(--secondary-text-color);
      }

      .error-message {
        color: var(--error-color);
        font-size: 0.9em;
        margin-top: 5px;
      }

      button[type='submit'] {
        width: 100%;
        padding: 12px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 1em;
        cursor: pointer;
      }

      button[type='submit']:disabled {
        background-color: var(--disabled-color);
        cursor: not-allowed;
      }

      button[type='submit']:hover:not(:disabled) {
        background-color: var(--primary-color-hover);
      }
    `,
  ],
})
export class PostUpdateComponent implements OnInit {
  post: Post = {
    title: '',
    content: '',
  };

  constructor(
    private postService: PostService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.postService.getPostById(Number(postId)).subscribe({
        next: (data) => {
          this.post = data;
        },
        error: (error) => {
          console.error('Error fetching post data', error);
          this.toastService.show('Error fetching post data', 'error');
        },
      });
    }
  }

  onSubmit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    this.postService.updatePost(Number(postId), this.post).subscribe({
      next: (data) => {
        console.log('Post updated successfully', data);
        this.toastService.show('Post updated successfully', 'success');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error updating post', error);
        this.toastService.show('Error updating post', 'error');
        if (error.status === 401) {
          this.toastService.show(
            'You need to be logged in to update a post',
            'error',
          );
          this.router.navigate(['/login']);
        }
      },
    });
  }
}
