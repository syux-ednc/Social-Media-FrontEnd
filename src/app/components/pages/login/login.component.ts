import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../../services/token-storage.service";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../models/User";
import jwtDecode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  message: string | undefined;
  isSubmitting: boolean = false;
  decodedToken: { [key: string]: string; } | undefined;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _tokenStorage: TokenStorageService,
    private _authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this._route.queryParams.subscribe((params) => {
      console.log(params);
      this.message = params['result'];
    });
    this._tokenStorage.clearSession();
  }

  login() {
    this.isSubmitting = true;
    this._authService.login(this.user).subscribe({
      next: (data: any) => {
        console.log("TOKEN:", data.message);
        this.isSubmitting = false;

        //Decode Token and get content
        this.decodedToken = jwtDecode(data.message);
        let username = this.decodedToken ? this.decodedToken['sub'] : null;
        let role = this.decodedToken ? this.decodedToken['role'][0] : null;

        //Saving decoded contents to session storage
        this._tokenStorage.saveToken(data.message);
        this._tokenStorage.saveUser(username);
        this._tokenStorage.saveRole(role);

        this._router.navigate(data.role === ('ROLE_ADMIN')
          ? ['/admin']
          : ['/feed']);
      },
      error: (err: any) => {
        console.log("ERROR:", err);
        this.isSubmitting = false;
        if (err.error.message === "Bad credentials") {
          this.message = 'bad';
        }
      }
    });
  }

}
