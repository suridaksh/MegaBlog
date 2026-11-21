import React, { useEffect, useState } from "react";
import PostForm from "../components/post-form/PostForm";
import Container from "../components/container/Container";
import appwriteService from "../appwrite/configuration";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }

    setLoading(true);

    appwriteService
      .getPost(slug)
      .then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
        navigate("/");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug, navigate]);

  if (loading) {
    return <div className="py-8 text-center">Loading post...</div>;
  }

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
