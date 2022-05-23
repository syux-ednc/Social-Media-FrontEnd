import {Component, OnInit} from '@angular/core';
import {Post} from "../../../models/Post";
import {PostService} from "../../../services/post.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../../services/token-storage.service";
import {PostMetricsService} from "../../../services/post-metrics.service";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  posts: Post[] = [];
  hasMore: boolean = true;
  offset: number = 0;

  constructor(
    private _router: Router,
    private _tokenStorage: TokenStorageService,
    private _postService: PostService,
    private _postMetricsService: PostMetricsService
  ) {
  }

  ngOnInit(): void {
    this.fetchPost();
  }

  fetchPost() {
    this._postService.getPostsWithPagination(this.offset).subscribe((data) => {

      //Push Data into array and increment offset
      let tempPosts: Post[];
      tempPosts = data.content;
      this.posts.push.apply(this.posts, tempPosts);
      this.offset += 1;

      //Increment view count and update DB only for loaded posts
      tempPosts.map((data) => {
        data.postMetrics![0].views! += 1;
        this._postService.updatePost(data.id!, data).subscribe();
      })

      //Once last page is reached
      if (data.last) {
        this.hasMore = false;
        this.offset = 0;
      }
    });
  }
}
