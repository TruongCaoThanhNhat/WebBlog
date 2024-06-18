import { Link, useParams } from "react-router-dom";
import "./postdetails.scss";
import Comment from "../../components/comment/Comment";
import { useEffect, useState } from "react";
import { getPostsBySlug } from "@/api/api";
import { handleDate } from "@/utils/handleUtils";

const PostDetails = () => {
  const { slug } = useParams();
  const [post, setPost] = useState([]);
  const [category, setCategory] = useState({});
  const [author, setAuthor] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      const response = await getPostsBySlug(slug);
      setPost(response.post);
      setCategory(response.post.category);
      setAuthor(response.post.author);
    };
    fetchPost();
  }, [slug]);

  console.log(post);
  //  console.log(category);
  return (
    <div className="post__details-container container">
      <div className="post__details-auth mx-auto">
        <div className="post__details-category d-flex mb-2">
          <Link to={`/category/${category.slug}`}>
            <span className="post__details-category-name text-muted">
              {category && category.name
                ? category.name
                : " Chuyện trò - Tâm sự"}
            </span>
          </Link>
        </div>
        <div className="post__details-title">
          <h1>{post.title}</h1>
        </div>
        <div className="post__details-desc">
          <p className="fst-italic">
            {post.description ? post.description : ""}
          </p>
        </div>
        <div className="post__details mt-3 d-flex align-items-center">
          <div className="d-flex align-items-center gap-2">
            <div className="post-avt-div">
              <img
                src="https://s3-ap-southeast-1.amazonaws.com/images.spiderum.com/sp-xs-avatar/aec845906a1911ec8130097cb62284e8.png"
                alt="Avatar"
                className="rounded-circle"
              />
            </div>
            <div>
              <Link to="/">
                <p className="post-username mb-0">
                  {author && author.userName ? author.userName : "Người lạ ơi"}
                </p>
              </Link>
              <span className="time-read text-muted">
                {handleDate(post.createdAt)} ngày trước
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="post__details-content my-3">
        <div className="post__details-content-container mx-auto">
          {post &&
            post.content &&
            post.content.map((item, index) => <p key={index}>{item}</p>)}
        </div>
      </div>
      <div className="comment">
        <Comment />
      </div>
    </div>
  );
};

export default PostDetails;
