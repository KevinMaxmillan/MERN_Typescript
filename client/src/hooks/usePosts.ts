import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUserPosts,addPost, updatePost, deletePost } from "../apis/postApis";
import { Post } from "../interfaces/postsInterfaces";
import { AuthError } from "../interfaces/authInterfaces";
import { toast } from "react-hot-toast";

export const useUserPosts = (numericID?: number) => {
  return useQuery<Post[], AuthError>({
    queryKey: ["userPosts", numericID],
    queryFn: () => fetchUserPosts(numericID!),
    enabled: !!numericID, 
  });
};

export const useAddPost = () => {
    const queryClient = useQueryClient();
  
    return useMutation<Post, AuthError, Omit<Post, "id">>({
      mutationFn: addPost,
      onSuccess: () => {
        toast.success("Post added successfully!");
        queryClient.invalidateQueries({ queryKey: ["userPosts"] });
      },
      onError: () => {
        toast.error("Failed to add post.");
      },
    });
  };
  
  export const useUpdatePost = () => {
    const queryClient = useQueryClient();
  
    return useMutation<Post, AuthError, { id: number; updatedData: Omit<Post, "id"> }>({
      mutationFn: ({ id, updatedData }) => updatePost(id, updatedData),
      onSuccess: () => {
        toast.success("Post updated successfully!");
        queryClient.invalidateQueries({ queryKey: ["userPosts"] });
      },
      onError: () => {
        toast.error("Failed to update post.");
      },
    });
  };
  
  export const useDeletePost = () => {
    const queryClient = useQueryClient();
  
    return useMutation<{ message: string }, AuthError, number>({
      mutationFn: (postId) => deletePost(postId), 
      onSuccess: () => {
        toast.success("Post deleted successfully!");
        queryClient.invalidateQueries({ queryKey: ["userPosts"] });
      },
      onError: () => {
        toast.error("Failed to delete post.");
      },
    });
  };
  