import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { PostResponseDTO } from '../models/post-response.model';
import { environment } from '../../environments/environment';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = environment.apiUrl + '/api/posts';

  constructor(private http: HttpClient) {}

  getAllPosts(
    page: number,
    size: number,
  ): Observable<Page<PostResponseDTO>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<PostResponseDTO>>(this.apiUrl, { params });
  }

  getPostById(id: number): Observable<PostResponseDTO> {
    return this.http.get<PostResponseDTO>(`${this.apiUrl}/${id}`);
  }

  getPostsByUser(userId: number): Observable<PostResponseDTO[]> {
    return this.http.get<PostResponseDTO[]>(`${this.apiUrl}/user/${userId}`);
  }

  createPost(post: Post): Observable<PostResponseDTO> {
    const headers = this.getAuthHeaders();
    return this.http.post<PostResponseDTO>(this.apiUrl, post, { headers });
  }

  updatePost(id: number, post: Post): Observable<PostResponseDTO> {
    const headers = this.getAuthHeaders();
    return this.http.put<PostResponseDTO>(`${this.apiUrl}/${id}`, post, {
      headers,
    });
  }

  deletePost(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }
}
