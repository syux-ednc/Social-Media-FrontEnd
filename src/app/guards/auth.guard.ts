import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {TokenStorageService} from "../services/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _tokenStorage: TokenStorageService,
  ) {
  }

  canActivate() {
    if (this._tokenStorage.getToken()) {
      return true;
    } else {
      alert('You have not sign in yet, please login.');
      this._router.navigate(['/']);
      return false;
    }
  }
}
