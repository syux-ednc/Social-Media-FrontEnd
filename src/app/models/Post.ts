import {PostMetrics} from "./PostMetrics";

export class Post {
  id: number | undefined;
  type: string | undefined;
  caption: string | undefined;
  media_src: string | undefined;
  user_id: number | undefined;
  createdBy: string | undefined;
  modifiedDt: Date | undefined;
  postMetrics: PostMetrics[] | undefined;
}
