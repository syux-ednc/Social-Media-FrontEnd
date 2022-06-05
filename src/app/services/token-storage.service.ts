import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  TOKEN_KEY = 'auth-token';
  USER_KEY = 'auth-user';
  ROLE_KEY = 'auth-role';

  constructor() {
  }

  clearSession() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(this.TOKEN_KEY);
    window.sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(this.TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(this.USER_KEY);
    window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(this.USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public saveRole(role: any): void {
    window.sessionStorage.removeItem(this.ROLE_KEY);
    window.sessionStorage.setItem(this.ROLE_KEY, role);
  }

  public getRole(): string | null {
    return window.sessionStorage.getItem(this.ROLE_KEY);
  }
}
