import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {TokenStorageService} from "../services/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _tokenStorage: TokenStorageService,
  ) {
  }

  canActivate() {
    if (this._tokenStorage.getRole() === 'ROLE_ADMIN') {
      return true;
    } else {
      alert('Access Denied! You do not have privilege to access this page.');
      this._tokenStorage.clearSession();
      this._router.navigate(['/']);
      return false;
    }
  }

}
