import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-settings-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" (click)="closeModal()">
      <div class="modal-container" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>Profile Configuration</h2>
          <button class="close-button" (click)="closeModal()">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="photo-upload-section">
            <div class="current-photo"
                 [style.backgroundImage]="previewUrl ? 'url(' + previewUrl + ')' : 'url(/assets/placeholder.jpg)'">
              <div class="photo-overlay" (click)="fileInput.click()">
                <span>Change photo</span>
              </div>
            </div>
            <input
              #fileInput
              type="file"
              (change)="onFileSelected($event)"
              accept="image/*"
              class="hidden"
            />
            <div class="photo-instructions">
              <p>Click the image to select a new photo</p>
              @if (selectedFile) {
                <p class="file-name">Selected file: {{ selectedFile.name }}</p>
              }
            </div>
          </div>
          @if (errorMessage) {
            <div class="error-message">
              {{ errorMessage }}
            </div>
          }
        </div>
        <div class="modal-footer">
          <button
            class="cancel-button"
            (click)="closeModal()"
            [disabled]="isLoading">
            Cancel
          </button>
          <button
            class="save-button"
            (click)="saveChanges()"
            [disabled]="!selectedFile || isLoading">
            {{ isLoading ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-container {
      background: var(--card-bg);
      border-radius: 8px;
      width: 90%;
      max-width: 500px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      color: var(--text-color);
    }

    .modal-header {
      padding: 1rem 1rem 1rem 1.75rem;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-header h2 {
      margin: 0;
      font-size: 1.25rem;
      color: var(--text-color);
    }

    .close-button {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--text-color);
      padding: 0.5rem;
    }

    .close-button:hover {
      color: var(--primary-color);
    }

    .modal-body {
      padding: 2rem;
      background-color: var(--card-bg);
    }

    .photo-upload-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }

    .current-photo {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      background-size: cover;
      background-position: center;
      position: relative;
      cursor: pointer;
      border: 3px solid var(--border-color);
    }

    .photo-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.2s;
    }

    .photo-overlay span {
      color: white;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .current-photo:hover .photo-overlay {
      opacity: 1;
    }

    .hidden {
      display: none;
    }

    .photo-instructions {
      text-align: center;
      color: var(--secondary-text-color);
      font-size: 0.875rem;
    }

    .file-name {
      font-size: 0.875rem;
      color: var(--secondary-text-color);
      margin-top: 0.5rem;
    }

    .error-message {
      margin-top: 1rem;
      padding: 0.75rem;
      background-color: var(--error-color);
      border-radius: 4px;
      color: white;
      text-align: center;
      font-size: 0.875rem;
    }

    .modal-footer {
      padding: 1rem;
      border-top: 1px solid var(--border-color);
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      background-color: var(--card-bg);
    }

    button {
      padding: 0.75rem 1rem;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 16px;
      font-family: 'Quicksand', sans-serif;
    }

    button:disabled {
      background-color: var(--disabled-color);
      cursor: not-allowed;
    }

    .cancel-button {
      background-color: transparent;
      border: 1px solid var(--border-color);
      color: var(--text-color);
    }

    .cancel-button:hover:not(:disabled) {
      border-color: var(--primary-color);
      color: var(--primary-color);
    }

    .save-button {
      background-color: var(--primary-color);
      border: none;
      color: white;
    }

    .save-button:hover:not(:disabled) {
      background-color: var(--primary-color-hover);
    }

    @media (max-width: 480px) {
      .modal-container {
        width: 95%;
        margin: 1rem;
      }

      .modal-body {
        padding: 1rem;
      }

      .modal-footer {
        padding: 1rem;
      }
    }
  `],
})
export class SettingsModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  selectedFile: File | null = null;
  previewUrl: string | null = null;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadCurrentUserImage();
  }

  loadCurrentUserImage() {
    this.authService.getUserImage().subscribe({
      next: (imageData) => {
        if (imageData) {
          this.previewUrl = imageData;
        }
      },
      error: (error) => {
        console.error('Error loading user image:', error);
      }
    });
  }

  closeModal() {
    this.close.emit();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Please select a valid image file';
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        this.errorMessage = 'The image file size must be less than 5MB';
        return;
      }

      this.selectedFile = file;
      this.errorMessage = '';

      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  saveChanges() {
    if (!this.selectedFile) return;

    this.isLoading = true;
    this.errorMessage = '';

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target?.result as string;
      this.authService.uploadUserImage(base64Image).subscribe({
        next: () => {
          this.isLoading = false;
          this.closeModal();
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'An error occurred while saving the image. Please try again.';
          console.error('Error uploading image:', error);
        }
      });
    };
    reader.readAsDataURL(this.selectedFile);
  }
}
