import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../index";
import {User} from "../models/User";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private modelPath = "auth";

  constructor(private _http: HttpClient) { }

  register(user: User) : Observable<any>{
    return this._http.post<any>(`${API_URL}/${(this.modelPath)}/register`, user);
  }

  login(user: User) : Observable<any>{
    return this._http.post<any>(`${API_URL}/${(this.modelPath)}/login`, user);
  }
}
