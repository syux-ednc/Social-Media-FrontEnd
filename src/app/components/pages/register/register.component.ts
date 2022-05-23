import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../../models/User";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser = new User();
  inputRePwd: string = '';
  isSubmitting: boolean = false;

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.newUser.role = 'ROLE_USER';
  }

  register() {
    this.isSubmitting = true;
    this._authService.register(this.newUser).subscribe({
      next: (data: any) => {
        console.log("DATA:", data);
        this.isSubmitting = false;
        this._router.navigate(["/"], {queryParams: {result: 'success'}});
      },
      error: (err: any) => {
        console.log("ERROR:", err);
        this.isSubmitting = false;
      },
    });
  }

}
