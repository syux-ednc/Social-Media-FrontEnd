import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../models/Post";
import {API_URL, PAGE_SIZE} from "../../index";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private modelPath = "posts";

  constructor(private _http: HttpClient) {
  }

  getPostsWithPagination(offset: number): Observable<any> {
    return this._http.get<any>(`${API_URL}/${(this.modelPath)}/pagination/${offset}/${PAGE_SIZE}/modifiedDt`);
  }

  getPostsByUserWithPagination(user: string, offset: number): Observable<any> {
    return this._http.get<any>(`${API_URL}/${(this.modelPath)}/getPostsByUserWithPagination/${user}/${offset}/${PAGE_SIZE}/modifiedDt`);
  }

  getPostById(id: number): Observable<Post> {
    return this._http.get<Post>(`${API_URL}/${(this.modelPath)}/getPost/${id}`);
  }

  createPost(post: Post): Observable<Post> {
    return this._http.post<Post>(`${API_URL}/${(this.modelPath)}/createPost`, post);
  }

  updatePost(id: number, post: Post): Observable<Object> {
    return this._http.put(`${API_URL}/${(this.modelPath)}/updatePost/${id}`, post);
  }

  deletePost(id: number): Observable<Object> {
    return this._http.delete(`${API_URL}/${(this.modelPath)}/deletePost/${id}`);
  }
}
