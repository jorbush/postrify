import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginResponse } from '../models/login-response';
import { RegisterResponse } from '../models/register-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/api/auth';
  private userApiUrl = environment.apiUrl + '/api/users';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/signin`, {
        username,
        password,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username);
        }),
      );
  }

  register(
    username: string,
    email: string,
    password: string,
  ): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/signup`, {
      username,
      email,
      password,
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  uploadUserImage(base64Image: string) {
    const username = this.getUsername();
    return this.http.put(`${this.userApiUrl}/${username}/image`, base64Image).subscribe();
  }

  getUserImage() {
    const username = this.getUsername();
    return this.http.get(`${this.userApiUrl}/${username}/image`, { responseType: 'text' });
  }

}
