import { useState, useMemo } from "react";
import throttle from 'lodash/throttle';
import { Post } from "../interfaces/postsInterfaces";

export function useSearchPosts(posts: Post[]) {
  const [searchQuery, setSearchQuery] = useState("");


  const throttledSetSearchQuery = useMemo(
    () =>
      throttle((value: string) => {
        setSearchQuery(value.toLowerCase().trim());
      }, 300), 
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    throttledSetSearchQuery(e.target.value);
  };

  const filteredPosts = useMemo(() => {
    if (!searchQuery) return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery) ||
        post.description.toLowerCase().includes(searchQuery)
    );
  }, [searchQuery, posts]);

  return { filteredPosts, handleSearch };
}
