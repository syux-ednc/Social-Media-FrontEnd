import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/User";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
  ) {
  }

  user: User = new User();
  id: number = 0;

  ngOnInit(): void {
    this._route.queryParams.subscribe((params) => {
      console.log("PASSED OVER ID: ", params['id']);
      this.id = params['id'];
    });
    this._userService.getUserById(this.id).subscribe((data) => {
      console.log("RETRIEVED USER: ", data);
      this.user = data;
    })
  }

  updateUser() {
    this._userService.updateUser(this.id, this.user).subscribe((data) => {
      console.log(data);
      this._router.navigate(['/admin']);
    })
  }
}
