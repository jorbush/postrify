import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'postrify';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getData().subscribe({
      next: (data) => console.log(data),
      error: (error) => console.error('Error fetching data:', error)
    });
  }
}
