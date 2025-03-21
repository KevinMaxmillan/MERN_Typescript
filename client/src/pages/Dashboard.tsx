import { useState } from "react";
import { useUserProfile } from "../hooks/useAuth";
import { useUserPosts, useAddPost, useUpdatePost, useDeletePost } from "../hooks/usePosts";
import { Post } from "../interfaces/postsInterfaces";
import {
  DashboardContainer,
  WelcomeMessage,
  PostsContainer,
  PostItem,
  PostTitle,
  PostBody,
  PostButton,
  AddPostButton,
  AddPostForm,
  Input,
  Textarea,
  ActionButton,
  CancelButton,
  EditPostForm,
  ModalOverlay,
  ModalContainer,
} from "../styles/Dashboard";

export default function Dashboard() {
  const { data: user } = useUserProfile();
  const { data: posts, isLoading } = useUserPosts();
  const addPostMutation = useAddPost();
  const updatePostMutation = useUpdatePost();
  const deletePostMutation = useDeletePost();

  const [newPost, setNewPost] = useState({ title: "", description: "" });
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);


  const handleAddPost = () => {
    if (!user) return;
  
    addPostMutation.mutate({
      title: newPost.title,
      description: newPost.description, 
    });
  
    setNewPost({ title: "", description: "" });
    setIsModalOpen(false);
  };

  const handleUpdatePost = () => {
    if (!editPost) return;
  
    updatePostMutation.mutate({
      postID: editPost.postID,
      updatedData: { title: editPost.title, description: editPost.description },
    });
  
    setEditPost(null);
    setIsModalOpen(false);
  };
  

  const openAddPostModal = () => {
    setIsModalOpen(true);
    setIsEditMode(false);
  };

  const openEditPostModal = (post: Post) => {
    setEditPost(post);  
    setIsModalOpen(true);
    setIsEditMode(true);
  };

  return (
    <DashboardContainer>
      <WelcomeMessage>Welcome, {user?.username}!</WelcomeMessage>

      <h2>Your Posts</h2>
      {isLoading && <p>Loading posts...</p>}
      {/* {isError && <p>Failed to load posts.</p>} */}

      <AddPostButton onClick={openAddPostModal}>Add New Post</AddPostButton>

      <PostsContainer>
        {posts?.length ? (
          posts.map((post) => (
            <PostItem key={post.postID}>
              <PostTitle>{post.title}</PostTitle>
              <PostBody>{post.description}</PostBody>
              <div>
                <PostButton onClick={() => deletePostMutation.mutate(post.postID)}>Delete</PostButton>
                <CancelButton onClick={() => openEditPostModal(post)}>Edit</CancelButton>
              </div>
            </PostItem>
          ))
        ) : (
          !isLoading && <p>No posts found.</p>
        )}
      </PostsContainer>

      {/* Modal for Add Post and Edit Post */}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContainer>
            {!isEditMode ? (
              <AddPostForm>
                <h2>Add New Post</h2>
                <Input
                  type="text"
                  placeholder="Title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                />
                <Textarea
                  placeholder="Body"
                  value={newPost.description}
                  onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                />
                <ActionButton onClick={handleAddPost}>Add Post</ActionButton>
                <CancelButton onClick={() => setIsModalOpen(false)}>Cancel</CancelButton>
              </AddPostForm>
            ) : (
              <EditPostForm>
                <h2>Edit Post</h2>
                <Input
                  type="text"
                  placeholder="Title"
                  value={editPost?.title}
                  onChange={(e) => setEditPost({ ...editPost!, title: e.target.value })}
                />
                <Textarea
                  placeholder="Body"
                  value={editPost?.description}
                  onChange={(e) => setEditPost({ ...editPost!, description: e.target.value })}
                />
                <ActionButton onClick={handleUpdatePost}>Update Post</ActionButton>
                <CancelButton onClick={() => setIsModalOpen(false)}>Cancel</CancelButton>
              </EditPostForm>
            )}
          </ModalContainer>
        </ModalOverlay>
      )}
    </DashboardContainer>
  );
}
