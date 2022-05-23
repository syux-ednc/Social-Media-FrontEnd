import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User";
import {API_URL} from "../../index";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private modelPath = "users";

  constructor(private _http: HttpClient) {
  }

  getUsersByRoleWithPagination(offset: number, pageSize: number, role: string): Observable<any> {
    return this._http.get<any>(`${API_URL}/${(this.modelPath)}/getUsersByRoleWithPagination/${offset}/${pageSize}/${role}`)
  }

  getUserById(id: number): Observable<User> {
    return this._http.get<User>(`${API_URL}/${(this.modelPath)}/getUser/${id}`);
  }

  getUserByUsername(username: string): Observable<User> {
    return this._http.get<User>(`${API_URL}/${(this.modelPath)}/getUserByUsername/${username}`);
  }

  isUsernameTaken(username: string): Observable<boolean> {
    return this._http.get<boolean>(`${API_URL}/${(this.modelPath)}/registerUser/isUsernameTaken/${username}`)
  }

  isEmailTaken(email: string): Observable<boolean> {
    return this._http.get<boolean>(`${API_URL}/${(this.modelPath)}/registerUser/isEmailTaken/${email}`)
  }

  deleteUser(id: number): Observable<Object> {
    return this._http.delete(`${API_URL}/${(this.modelPath)}/deleteUser/${id}`);
  }

  updateUser(id: number, user: User): Observable<Object> {
    return this._http.put(`${API_URL}/${(this.modelPath)}/updateUser/${id}`, user);
  }
}
