import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface RegisterResponse {
  message: string;
}

interface LoginResponse {
  token: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/api/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/signin`, {
      username,
      password,
    });
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
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
