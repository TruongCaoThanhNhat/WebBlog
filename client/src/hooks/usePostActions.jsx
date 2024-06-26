import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import {
  apiAddUserHistory,
  apiAddUserSaved,
  apiRemoveUserSaved,
  apiUpdateViewPost,
  apiUpdateVote,
  getPostsBySlug,
} from "@/api/api";

const usePostActions = (post) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [updatePost, setUpdatePost] = useState(post);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setUpdatePost(post);
  }, [post]);

  const handleView = async () => {
    await apiUpdateViewPost(updatePost._id);
    await apiAddUserHistory(user.userInfo.id, { postId: updatePost._id });
  };

  const handleUpvote = async () => {
    if (!user.isLoggedIn) {
      navigate("/login");
      return;
    }

    const res = await apiUpdateVote(updatePost._id, { action: "vote" });
    console.log(res);
    const current = await getPostsBySlug(updatePost.slug);
    setUpdatePost((prev) => ({
      ...prev,
      point: current.post.point,
    }));
  };

  const handleDownVote = async () => {
    if (!user.isLoggedIn) {
      navigate("/login");
      return;
    }

    const res = await apiUpdateVote(updatePost._id, { action: "unvote" });
    console.log(res);
    const current = await getPostsBySlug(updatePost.slug);
    setUpdatePost((prev) => ({
      ...prev,
      point: current.post.point,
    }));
  };

  const handleBookmark = async () => {
    if (user.isLoggedIn === false) {
      navigate("/login");
      return;
    }
    if (isBookmarked) {
      await apiRemoveUserSaved(user.userInfo.id,  post._id );
      toast.success("Đã gỡ bỏ bài viết khỏi danh sách lưu");
    } else {
      await apiAddUserSaved(user.userInfo.id, { postId: post._id });
      toast.success("Đã lưu bài viết");
    }

    setIsBookmarked(!isBookmarked);
  };
  return {
    updatePost,
    handleView,
    handleUpvote,
    handleDownVote,
    handleBookmark,
    isBookmarked
  };
};

export default usePostActions;
