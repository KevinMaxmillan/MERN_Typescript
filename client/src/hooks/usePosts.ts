import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUserPosts,addPost, updatePost, deletePost } from "../apis/postApis";
import { Post } from "../interfaces/postsInterfaces";
import { AuthError } from "../interfaces/authInterfaces";
import { useUserStore } from '../store/authStore';
import { toast } from "react-hot-toast";


export const useUserPosts = () => {
  const { user } = useUserStore(); 

  return useQuery<Post[], AuthError>({
    queryKey: ["userPosts"],
    queryFn: fetchUserPosts,
    enabled: !!user?.numericID, 
  });
};

export const useAddPost = () => {
  const queryClient = useQueryClient();

  return useMutation<Post, AuthError, { title: string; description: string }>({
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
  
    return useMutation<Post, AuthError, { postID: number; updatedData: { title: string; description: string } }>({
      mutationFn: ({ postID, updatedData }) => updatePost(postID, updatedData),
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
      mutationFn: (postID) => deletePost(postID),
      onSuccess: () => {
        toast.success("Post deleted successfully!");
        queryClient.invalidateQueries({ queryKey: ["userPosts"] });
      },
      onError: () => {
        toast.error("Failed to delete post.");
      },
    });
  };
  