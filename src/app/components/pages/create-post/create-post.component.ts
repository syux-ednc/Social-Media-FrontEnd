import {Component, OnInit} from '@angular/core';
import {Post} from "../../../models/Post";
import {PostMetrics} from "../../../models/PostMetrics";
import {UserService} from "../../../services/user.service";
import {PostService} from "../../../services/post.service";
import {PostMetricsService} from "../../../services/post-metrics.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {FileUploadService} from "../../../services/file-upload.service";
import {HttpResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  mediaTypes = ['IMAGE', 'VIDEO', 'FILE', 'LINK'];
  post: Post = new Post();
  postMetrics: PostMetrics = new PostMetrics();
  selectedFile: File | any;
  isFileInvalid: boolean = false;
  isSubmitting: boolean = false;
  userID: number | undefined;

  isEditPost: boolean = false;
  postID: number | undefined;
  oldFilename: string | undefined;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _tokenStorage: TokenStorageService,
    private _userService: UserService,
    private _postService: PostService,
    private _postMetricsService: PostMetricsService,
    private _fileUploadService: FileUploadService
  ) {
  }

  ngOnInit(): void {
    this._userService.getUserByUsername(this._tokenStorage.getUser()).subscribe({
      next: (data) => {
        this.userID = data.id;
      },
      error: (err: any) => {
        console.log("ERROR:", err);
      }
    });

    this._route.queryParams.subscribe({
      next: (data) => {
        this.postID = data['id'];
      }
    });

    if (this.postID !== undefined) {
      this.isEditPost = true;
      this._postService.getPostById(this.postID).subscribe({
        next: (data) => {
          this.selectedFile = true;
          this.post = data;
          this.oldFilename = this.post.media_src?.split('/').pop();
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    }
  }

  onMediaTypeChange() {
    this.selectedFile = undefined;
  }

  onFileSelected($event: any) {
    if ($event.target.files && $event.target.files[0]) {
      let file = $event.target.files[0];
      // console.log("File Selected from Local Disk: ", file);
      switch (this.post.type) {
        case 'IMAGE':
          if (file.type == "image/jpeg" || file.type == "image/png") {
            this.selectedFile = file;
            this.isFileInvalid = false;
          } else {
            this.isFileInvalid = true;
          }
          break;
        case 'VIDEO':
          if (file.type == "video/mp4") {
            this.selectedFile = file;
            this.isFileInvalid = false;
          } else {
            this.isFileInvalid = true;
          }
          break;
        case 'FILE':
          if (file.type == "image/jpeg" || file.type == "image/png" || file.type == "video/mp4") {
            this.isFileInvalid = true;
          } else {
            this.selectedFile = file;
            this.isFileInvalid = false;
          }
          break;
        default:
          console.log('Never reach here');
          break;
      }
    }
  }

  onSubmit() {
    this.isSubmitting = true;
    this.isEditPost ? this.updatePost() : this.createPost();
  }

  createPost() {
    this.post.user_id = this.userID;
    this._postService.createPost(this.post).subscribe({
      next: (data) => {
        this.post = data;
        if (this.selectedFile) {
          //Come into here if MEDIA TYPE = IMAGE, VIDEO, FILE
          this._fileUploadService.createFile(
            this.post.createdBy!, this.post.id!.toString(), this.selectedFile
          ).subscribe({
            next: (data) => {
              if (data instanceof HttpResponse) {
                this.post.media_src = data.body.message;
                this._postService.updatePost(this.post.id!, this.post).subscribe({
                  next: (data) => {
                    console.log("UPDATED post data", data);
                    this.createPostMetrics();
                  },
                  error: (err: any) => {
                    this.isSubmitting = false;
                    console.log("UPDATE MEDIA URL IN DB ERROR:", err);
                  }
                })
              } else {
                console.log("data IS NOT HttpResponse");
              }
            },
            error: (err: any) => {
              this.isSubmitting = false;
              console.log("FILE UPLOAD ERROR:", err);
            }
          });
        } else {
          this.createPostMetrics();
        }
      },
      error: (err: any) => {
        this.isSubmitting = false;
        console.log("INSERT NEW POST TO DB ERROR:", err);
      }
    });
  }

  updatePost() {
    console.log("UPDATE POST [Got file?]", this.selectedFile);
    if (this.selectedFile) {
      this.selectedFile === true ? this.updatePostWithoutFile() : this.updatePostWithFile();
    } else {
      this.updatePostWithoutFile();
    }
  }

  updatePostWithFile() {
    console.log("Old Filename:", this.oldFilename);
    this._fileUploadService.updateFile(
      this._tokenStorage.getUser(), this.post.id!.toString(), this.selectedFile, this.oldFilename!
    ).subscribe({
      next: (data) => {
        if (data instanceof HttpResponse) {
          this.post.media_src = data.body.message;
          this._postService.updatePost(this.post.id!, this.post).subscribe({
            next: (data) => {
              console.log(data);
              this.backToHomePage();
            },
            error: (err: any) => {
              this.isSubmitting = false;
              console.log("UPDATE POST w MEDIA ERROR: ", err);
            }
          });
        }
      },
      error: (err: any) => {
        this.isSubmitting = false;
        console.log("FILE UPLOAD ERROR: ", err);
      }
    });
  }

  updatePostWithoutFile() {
    this._postService.updatePost(this.post.id!, this.post).subscribe({
      next: (data) => {
        console.log(data);
        this.backToHomePage();
      },
      error: (err: any) => {
        this.isSubmitting = false;
        console.log("UPDATE POST w/o MEDIA to DB error:", err);
      }
    });
  }

  createPostMetrics() {
    this.postMetrics.views = 0;
    this.postMetrics.post_id = this.post.id;
    this._postMetricsService.createPostMetrics(this.postMetrics).subscribe({
      next: (data) => {
        console.log(data);
        this.backToHomePage();
      },
      error: (err: any) => {
        this.isSubmitting = false;
        console.log("INSERT NEW POST METRICS TO DB ERROR:", err);
      }
    })
  }

  backToHomePage() {
    this._router.navigate(['/feed']);
  }
}
