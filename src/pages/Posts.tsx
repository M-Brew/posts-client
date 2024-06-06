import React, { useEffect, useState } from "react";

import Container from "@mui/material/Container";
import Masonry from "@mui/lab/Masonry";

import PostCard from "../components/PostCard";
import { deletePost, getPosts } from "../api/posts";

export default function Posts() {
  const [posts, setPosts] = useState<IPost[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      if (response?.status === 200) {
        setPosts(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await deletePost(id);
      if (response?.status === 204) {
        const updatedPosts = posts.filter((p) => p.id !== id);
        setPosts(updatedPosts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Masonry columns={{ xs: 1, sm: 2, lg: 3 }} spacing={2}>
        {posts.map((post, idx) => (
          <PostCard key={idx} post={post} handleDelete={handleDelete} />
        ))}
      </Masonry>
    </Container>
  );
}
