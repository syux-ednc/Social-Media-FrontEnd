import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/User";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {FileUploadService} from "../../../services/file-upload.service";
import {PAGE_SIZE} from "../../../../index";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[] = [];

  pageSize: number = PAGE_SIZE;
  offset: number = 1;
  totalSize: number = 0;

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _fileUploadService: FileUploadService,
  ) {
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this._userService.getUsersByRoleWithPagination(
      this.offset - 1, this.pageSize, 'ROLE_USER').subscribe({
      next: (data) => {
        console.log("Paginated Users data: ", data);
        this.users = data.content;
        this.totalSize = data.totalElements;
      },
      error: (err: any) => {
        console.log("ERROR GETTING PAGINATED USERS from DB:", err);
      }
    });
  }

  handlePageChange(event: number) {
    this.offset = event;
    this.fetchUsers();
  }

  viewUser(username: string | undefined) {
    this._router.navigate(['/profile'], {queryParams: {username: username}});
  }

  updateUser(selectedId: number | undefined) {
    this._router.navigate(['/edit-profile'], {queryParams: {id: selectedId}});
  }

  deleteUser(id: number | undefined, name: string | undefined) {
    console.log(name);
    if (id) {
      this._fileUploadService.deleteFileByUser(name).subscribe((data) => {
        console.log("Delete All Files Success: ", data);
        this._userService.deleteUser(id).subscribe((data) => {
          console.log("Delete User Success", data);
          window.location.reload();
        });
      });
    }
  }

  logout() {
    this._router.navigate(["/"])
  }
}
