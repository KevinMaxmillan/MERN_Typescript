export type Post = {
    postID: number;
    userId: number;
    title: string;
    description: string;
  };
  
  export type GetPostsResponse = {
    success: boolean;
    posts: Post[];
  };
  