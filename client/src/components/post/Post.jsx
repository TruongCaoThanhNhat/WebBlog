import { Link } from "react-router-dom";
import { BsChatLeft, BsDot } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";
import "./post.scss";
import { useEffect, useState } from "react";
import usePostActions from "@/hooks/usePostActions";
const Post = ({ post }) => {
  const [newPost, setNewPost] = useState([]);
  const { updatePost, handleView } = usePostActions(newPost);
  useEffect(() => {
    setNewPost(post);
  }, [post]);
  const {
    _id,
    title,
    description,
    author,
    views,
    comment_count,
    point,
    image,
    category,
    createdAt,
    slug = "",
  } = newPost;
  // console.log(_id, title,image, description, author, category, createdAt, slug);
  return (
    <div className="colc l-12">
      <div className="post__content">
        <div className="grid">
          <div className="row row-cols-2">
            <div className="col-xxl-4 col-lg-5 col-md-4">
              <div className="post__content-img">
                <Link to="/" onClick={handleView}>
                  <img
                    src={
                      image && image
                        ? image
                        : "https://s3-ap-southeast-1.amazonaws.com/images.spiderum.com/sp-thumbnails/defaultthumbnail.png"
                    }
                    // src="https://s3-ap-southeast-1.amazonaws.com/images.spiderum.com/sp-thumbnails/defaultthumbnail.png"
                    alt=""
                  />
                </Link>
              </div>
            </div>
            <div className="col-xxl-8 col-lg-7 col-md-8">
              <div className="post__content-details">
                <div className="post__content-details-heading">
                  <div className="">
                    <Link
                      to={`/category/${
                        category && category.slug ? category.slug : ""
                      }`}
                    >
                      <span className="title-category">
                        {category && category.name
                          ? category.name
                          : "Quan điểm - Tranh luận"}
                      </span>
                    </Link>
                    <BsDot className="icon-dot" />
                    <span className="time-read"> 4 phút đọc</span>
                  </div>
                  <div className="post__content-details-save">
                    <span className="icon-bookmark">
                      <FiBookmark />
                    </span>
                  </div>
                </div>
                <div className="post__content-details-main">
                  <Link to={`/post/${slug}`} onClick={handleView}>
                    <h3 className="title-post">
                      {title
                        ? title
                        : "Atomic Habits: Bạn đã hiểu đúng về tạo lập thói quen?"}
                    </h3>
                  </Link>
                  <div className="post__content-details-desc">
                    <p className="post__content-details-desc-text">
                      {description
                        ? description
                        : "Cách đây hai tháng, mình vẫn nghĩ xây dựng thói quen đơn giản chỉ là lặp đi lặp lại một việc nhiều lần đến khi có"}
                    </p>
                  </div>
                </div>
                <div className="post__content-details-post">
                  <div className="post__content-details-post-user">
                    <div className="post__content-details-post-avt">
                      <Link to="/">
                        <img
                          src="https://s3-ap-southeast-1.amazonaws.com/images.spiderum.com/sp-xs-avatar/c7967c50a8e811ec8f3e8be3eb7f2505.png"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="">
                      <div>
                        <Link to="/">
                          <p className="writter-name">
                            {author && author.userName
                              ? author.userName
                              : "Nguyễn Thanh Tùng"}
                          </p>
                        </Link>
                      </div>
                      <div>
                        <span className="time-date">Hôm qua</span>
                      </div>
                    </div>
                  </div>
                  <div className="post__content-details-post-icon">
                    <div className="d-flex align-items-center">
                      <div className="upvote">
                        <i>
                          <svg
                            width="17"
                            height="15"
                            viewBox="0 0 17 15"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M8.32031 3.98438L3.00781 12.5H13.6719L8.32031 3.98438ZM8.32031 0.820312L16.6797 14.1797H0L8.32031 0.820312Z"></path>
                          </svg>
                        </i>
                      </div>
                      <span className="upvote-value"> {updatePost.point}</span>
                    </div>
                    <div>
                      <span className="icon-eye">
                        <FaRegEye />
                      </span>
                      <span className="post-icon"> {views}</span>
                    </div>
                    <div>
                      <span className="icon-chat">
                        <BsChatLeft />
                      </span>
                      <span className="post-icon"> {comment_count}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
