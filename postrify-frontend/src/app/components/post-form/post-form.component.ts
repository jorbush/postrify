import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="form-container">
      <h2>Create New Post</h2>
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
          />
        </div>
        <div class="form-group">
          <label for="content">Content:</label>
          <textarea
            id="content"
            name="content"
            [(ngModel)]="post.content"
            required
            minlength="10"
          ></textarea>
        </div>
        <button type="submit" [disabled]="!postForm.form.valid">Submit</button>
      </form>
    </div>
  `,
  styles: `
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
})
export class PostFormComponent implements OnInit {
  post: Post = {
    title: '',
    content: '',
  };

  constructor(
    private postService: PostService,
    private toastService: ToastService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.postService.createPost(this.post).subscribe({
      next: (data) => {
        console.log('Post created successfully', data);
        this.toastService.show('Post created successfully', 'success');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error creating post', error);
        this.toastService.show('Error creating post', 'error');
      },
    });
  }
}