import { useEffect, useState } from "react";
import Comment from "./Comment";
import { apiGetCommentByPost } from "@/api/api";

const ListComment = ({ postId, newComment }) => {
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState(false);
  useEffect(() => {
    const fetchComment = async () => {
      const res = await apiGetCommentByPost(postId);
      setComments(res.data.comments);
      console.log(res.data.comments);
    };
    fetchComment();
  }, [postId, newComment]);
  return (
    <>
      {comments &&
        comments.map((comment) => (
          <Comment key={comment._id} comment={comment} reply={reply} />
        ))}
    </>
  );
};

export default ListComment;