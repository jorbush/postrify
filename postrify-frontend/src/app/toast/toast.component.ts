import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastService, Toast } from '../services/toast.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="toast" class="toast" [ngClass]="toast.type">
      {{ toast.message }}
    </div>
  `,
  styles: [
    `
      .toast {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 10px 20px;
        border-radius: 4px;
        color: white;
        z-index: 1000;
      }
      .success {
        background-color: #28a745;
      }
      .error {
        background-color: #dc3545;
      }
      .info {
        background-color: #17a2b8;
      }
    `,
  ],
})
export class ToastComponent implements OnInit, OnDestroy {
  toast: Toast | null = null;
  private subscription: Subscription | null = null;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.subscription = this.toastService.toast$.subscribe((toast) => {
      this.toast = toast;
      setTimeout(() => (this.toast = null), 3000);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
