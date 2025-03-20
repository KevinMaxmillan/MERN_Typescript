
import API from "./baseApis";
import { ApiEndpoints } from "../utils/apiEndpoints";
import { Post } from "../interfaces/postsInterfaces";


export const fetchUserPosts = async (numericID: number): Promise<Post[]> => {
  const response = await API.get<Post[]>(`${ApiEndpoints.POSTS}?userId=${numericID}`);
  return response.data;
};

export const addPost = async (post: Omit<Post, "id">): Promise<Post> => {
  const response = await API.post<Post>(ApiEndpoints.POSTS, post);
  return response.data;
};

export const updatePost = async (id: number, updatedData: Omit<Post, 'id'>): Promise<Post> => {
  const response = await API.put<Post>(`${ApiEndpoints.POSTS}/${id}`, updatedData);
  return response.data;
};

export const deletePost = async (id: number): Promise<{ message: string }> => {
  const response = await API.delete<{ message: string }>(`${ApiEndpoints.POSTS}/${id}`);
  return response.data;
};
