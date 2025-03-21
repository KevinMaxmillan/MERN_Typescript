export interface Post {
    postID:number
    userId: number;
    title: string;
    description: string;
}

export interface GetPostsResponse {
    success: boolean;
    posts: Post[];
  }