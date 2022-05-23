import {Component, OnInit} from '@angular/core';
import {PostService} from "../../../services/post.service";
import {Post} from "../../../models/Post";
import {TokenStorageService} from "../../../services/token-storage.service";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/User";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  posts: Post[] = [];
  profile: User = new User();
  user: string = '';
  offset: number = 0;
  hasMore: boolean = true;
  isAdmin: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _tokenStorage: TokenStorageService,
    private _userService: UserService,
    private _postService: PostService) {
  }

  ngOnInit(): void {

    this.isAdmin = this._tokenStorage.getRole() === 'ROLE_ADMIN';

    this._route.queryParams.subscribe((params) => {
      console.log("PASSED OVER ID: ", params['username']);
      if(params['username']){
        this.user = params['username'];
      }else{
        this.user = this._tokenStorage.getUser();
      }
    });

    this._userService.getUserByUsername(this.user!).subscribe((data)=>{
      this.profile = data;
    });

    this.fetchPost();
  }

  fetchPost(){
    this._postService.getPostsByUserWithPagination(this.user, this.offset).subscribe((data) =>{

      //Push Data into array and increment offset
      let tempPosts: Post[];
      tempPosts = data.content;
      this.posts.push.apply(this.posts, tempPosts);
      this.offset += 1;

      //Once last page is reached
      if (data.last) {
        this.hasMore = false;
        this.offset = 0;
      }
    });
  }
}
