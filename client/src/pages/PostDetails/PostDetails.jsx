import { Link, useParams } from "react-router-dom";
import {
  BsThreeDotsVertical,
  BsFacebook,
  BsChatLeft,
  BsShare,
} from "react-icons/bs";
import { FiBookmark } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { IoIosArrowUp } from "react-icons/io";
import "./postdetails.scss";
import Avatar from "@/components/avatar/Avatar";
import PostofMonth from "@/components/postOfMonth/PostofMonth";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { useEffect, useState } from "react";
import { apiCreateComment, getPostsBySlug } from "@/api/api";
import usePostActions from "@/hooks/usePostActions";
import ListComment from "@/components/comment/ListComment";
import TextToSpeech from "@/components/speech/TextToSpeech";

const PostDetailPage = () => {
  const [post, setPost] = useState([]);
  const [category, setCategory] = useState([]);
  const { slug } = useParams();
  const { updatePost, handleUpvote, handleDownVote } = usePostActions(post);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await getPostsBySlug(slug);
      // console.log(response, "response");
      setPost(response.post);
      setCategory(response.post.category);
    };
    fetchPost();
  }, [slug]);

  // console.log(post);
  const author = post.author;

  const renderPostContent = (content) => {
    return content.map((item, index) => {
      switch (item.type) {
        case "header":
          return <h2 key={index}>{item.data.text}</h2>;
        case "paragraph":
          return <p key={index}>{item.data.text}</p>;
        case "list":
          return (
            <ul key={index}>
              {item.data.items.map((listItem, i) => (
                <li key={i}>{listItem}</li>
              ))}
            </ul>
          );
        case "image":
          return (
            <div key={index}>
              <img src={item.data.file.url} alt={item.data.caption} />
            </div>
          );
        default:
          return <p key={index}>{item.data.text}</p>;
      }
    });
  };

  const [content, setContent] = useState("");
  const [newComments, setNewComments] = useState([]);
  const handleChangeContent = (e) => {
    // console.log(e.target.value);
    setContent(e.target.value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const res = await apiCreateComment({ postId: post._id, content });
    console.log(res.data.data.comment);
    setNewComments((prevComments) => [...prevComments, res.data.data.comment]);
  };

  const processContentForTTS = (content) => {
    return content
      ?.map((item) => {
        switch (item.type) {
          case "header":
          case "paragraph":
            return item.data.text;
           case "list":
             return item.data.items.join(" ");
          default:
            return item.data.text;
        }
      })
      .join(" ");
  };

  return (
    <div className="container-xl">
      <div className="post__details-container">
        <div className="post__details-wrapper">
          <div className="post__details-auth">
            <div className="post__details-category">
              <Link to={`/category/${category?.slug}`}>
                <span className="post__details-category-name">
                  {post && category?.name
                    ? category.name
                    : "Quan điêm - Tranh luận"}
                </span>
              </Link>
            </div>
            <div className="post__details-title">
              <h1 className="">
                {post && post.title ? post.title : "Không gì là không thể"}
              </h1>
            </div>
            <div className="post__details-desc">
              <p>
                {post && post.description
                  ? post.description
                  : "GEN Z là một thế hệ thật sự YẾU ĐUỐI? Hay chỉ là trò so sánh khập khiễng và là lối ngụy biện của hội chứng THƯỢNG ĐẲNG THẾ HỆ?."}
              </p>
            </div>
            <div className="post__details mt-20 flex-box">
              <div className="flex-align-gap-10">
                <div className="post-avt-div">
                  <img
                    src="https://s3-ap-southeast-1.amazonaws.com/images.spiderum.com/sp-xs-avatar/aec845906a1911ec8130097cb62284e8.png"
                    alt=""
                  />
                </div>
                <div>
                  <Link to="/">
                    <p className="post-username">
                      {author && author.userName
                        ? author.userName
                        : "Ke hoc viec"}
                    </p>
                  </Link>
                  <span className="post-date">
                    {post && post.createdAt ? post.createdAt : "2 tháng 5"}
                  </span>
                </div>
              </div>
              <div className="flex-align-gap-10">
                <button className="btn-more">
                  <BsThreeDotsVertical />
                </button>
              </div>
            </div>
          </div>
          <div className="post__details-content">
            <TextToSpeech text={processContentForTTS(post.content)} />
            <div className="post__details-content-container">
              {post && post.content ? (
                renderPostContent(post.content)
              ) : (
                <p>
                  Để tạo động lực cho Phật tử cúng dường, nhiều sư thầy đã dùng
                  đến một công cụ rất vi diệu, đó là PHƯỚC ĐỨC - một thứ vô
                  hình. Họ bảo rằng: quý vị càng cúng dường nhiều (nhất là tiền
                  chẵn) cho các sư thầy thì càng tăng trưởng phước đức, con cháu
                  quý vị sẽ vinh hiển, đời sau của quý vị sẽ giàu sang, sung
                  sướng.
                </p>
              )}

              <div className="tags__wrapper"></div>
            </div>
            <div className="sticky-bar"></div>
          </div>
          <div className="post-tool-bar">
            <div className="tool__left">
              <div className="d-flex align-items-center">
                <div className="upvote" onClick={handleUpvote}>
                  <i>
                    <svg
                      width="17"
                      height="15"
                      viewBox="0 0 17 15"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.32031 3.98438L3.00781 12.5H13.6719L8.32031 3.98438ZM8.32031 0.820312L16.6797 14.1797H0L8.32031 0.820312Z"
                        className="cls-1"
                      ></path>
                    </svg>
                  </i>
                </div>
                <div className="value">
                  <span>{updatePost.point}</span>
                </div>
                <div className="downvote" onClick={handleDownVote}>
                  <i>
                    <svg
                      width="17"
                      height="15"
                      viewBox="0 0 17 15"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.67969 11.0156L13.9922 2.5L3.32812 2.5L8.67969 11.0156ZM8.67969 14.1797L0.320311 0.820314L17 0.820312L8.67969 14.1797Z"
                        className="cls-1"
                      ></path>
                    </svg>
                  </i>
                </div>
              </div>
              <div className="view-count">
                <span>{post.views} lượt xem</span>
              </div>
            </div>
            <div className="tool__right">
              <a href="">
                <i className="icon-fb">
                  <BsFacebook />
                </i>
              </a>
              <span className="icon-bookmark">
                <FiBookmark />
              </span>
            </div>
          </div>

          <div className="comment__container">
            <section className="comment__section">
              <div className="comment__form-container">
                <form
                  action=""
                  className="comment__form"
                  onSubmit={handleSubmitComment}
                >
                  <div className="comment__form-content">
                    <input
                      type="text"
                      placeholder="Hãy chia sẻ cảm nghĩ của bạn về bài viết"
                      onChange={handleChangeContent}
                    ></input>
                  </div>
                  <div>
                    <button className="btn-send">Gửi</button>
                  </div>
                </form>
              </div>
              <div className="comment-nav-tab">
                <div className="d-flex justify-content-end">
                  <p className="active">Hot nhất</p>
                  <p>Mới nhất</p>
                </div>
              </div>
              <div className="comments__list">
                <div>
                  <ListComment postId={post._id} newComment={newComments} />
                  <div className="comment__item-more">
                    <button className="comment-more ">
                      Tải thêm bình luận
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="d-none d-sm-block">
        <button className="toc-btn">
          <FaBars />
        </button>
      </div>
      <div className="">
        <button className="btn_backToTop ">
          <IoIosArrowUp />
        </button>
      </div>
      <div className="sticky-bar d-none d-md-block">
        <div className="interaction-author d-flex flex-column align-items-center">
          <div className="interaction-vote d-flex flex-column align-items-center">
            <div className="upvote" onClick={handleUpvote}>
              <button>
                <svg
                  width="17"
                  height="15"
                  viewBox="0 0 17 15"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.32031 3.98438L3.00781 12.5H13.6719L8.32031 3.98438ZM8.32031 0.820312L16.6797 14.1797H0L8.32031 0.820312Z"
                    className="cls-1"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="value">
              <span>{updatePost?.point}</span>
            </div>
            <div className="downvote" onClick={handleDownVote}>
              <button>
                <svg
                  width="17"
                  height="15"
                  viewBox="0 0 17 15"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.67969 11.0156L13.9922 2.5L3.32812 2.5L8.67969 11.0156ZM8.67969 14.1797L0.320311 0.820314L17 0.820312L8.67969 14.1797Z"
                    className="cls-1"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <Link className="sticky-bar__avatar">
            <Avatar />
          </Link>
          <button className="btn-subscribe--user ">
            <FaUserPlus />
          </button>
        </div>
        <div className="interaction-post d-flex flex-column align-items-center">
          <div>
            <button className="btn-bookmark">
              <FiBookmark />
            </button>
          </div>

          <div className="my-4">
            <button className="btn-comment">
              <BsChatLeft />
            </button>
            <span className="count-comment d-block"> {post.comment_count}</span>
          </div>

          <div>
            <button className="btn-share">
              <BsShare />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
