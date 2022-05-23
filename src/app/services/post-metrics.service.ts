import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PostMetrics} from "../models/PostMetrics";
import {Observable} from "rxjs";
import {API_URL} from "../../index";

@Injectable({
  providedIn: 'root'
})
export class PostMetricsService {

  private modelPath = "postMetrics";

  constructor(private _http: HttpClient) {
  }

  createPostMetrics(postMetrics: PostMetrics): Observable<PostMetrics> {
    return this._http.post<PostMetrics>(`${API_URL}/${(this.modelPath)}/createPostMetrics`, postMetrics);
  }
}
