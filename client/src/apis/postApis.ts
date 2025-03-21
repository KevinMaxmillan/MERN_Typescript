
import API from "./baseApis";
import { ApiEndpoints } from "../utils/apiEndpoints";
import { Post, GetPostsResponse } from "../interfaces/postsInterfaces";

export const fetchUserPosts = async (): Promise<Post[]> => {
  const response = await API.get<GetPostsResponse>(ApiEndpoints.GET_POSTS);
  return response.data.posts; 
};

export const addPost = async (post: { title: string; description: string }): Promise<Post> => {
  const response = await API.post<Post>(ApiEndpoints.CREATE_POST, post);
  return response.data;
};

export const updatePost = async (postID: number, updatedData: { title: string; description: string }): Promise<Post> => {
  const response = await API.put<Post>(`${ApiEndpoints.UPDATE_POST}/${postID}`, updatedData);
  return response.data;
};

export const deletePost = async (postID: number): Promise<{ message: string }> => {
  const response = await API.delete<{ message: string }>(`${ApiEndpoints.DELETE_POST}/${postID}`);
  return response.data;
};
