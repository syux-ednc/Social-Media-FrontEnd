import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../models/Post";
import {PostService} from "../../../services/post.service";
import {FileUploadService} from "../../../services/file-upload.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post!: Post;
  @Input() isMyProfile: boolean = false;

  constructor(
    private _router: Router,
    private _postService: PostService,
    private _fileUploadService: FileUploadService
  ) {
  }

  ngOnInit(): void {
  }

  deletePost(id: number | undefined) {
    if (id) {
      this._fileUploadService.deleteFileByPostID(this.post.createdBy, this.post.id!.toString()).subscribe({
        next: (data: any) => {
          console.log("DELETE FILE SUCCESS:", data);
          this._postService.deletePost(id).subscribe({
            next: (data: any) => {
              console.log("DELETE POST SUCCESS:", data);
              window.location.reload();
            },
            error: (err: any) => {
              console.log("POST DELETE ERROR:", err);
            }
          });
        },
        error: (err: any) => {
          console.log("FILE DELETE ERROR:", err);
        }
      });
    }
  }

  updatePost(id: number | undefined) {
    this._router.navigate(['/create-post'], {queryParams: {id: id}});
  }
}
