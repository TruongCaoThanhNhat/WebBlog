import { handleDate } from '@/utils/handleUtils';
import { Link } from 'react-router-dom';

const PostV2 = ({post}) => {
  const {title, timeRead, createdAt,slug} = post;

  const author = post.author;

  return (
    <div className="pom__content-item">
      <div className="pom__content-item-img">
        <img
          src="https://s3-ap-southeast-1.amazonaws.com/images.spiderum.com/sp-thumbnails/defaultthumbnail.png"
          alt=""
        />
      </div>
      <div className="pom__content-item-details">
        <div className="pom__content-item-details-heading">
          <div>{/* <span className="time-read">4 phút đọc</span> */}</div>
          <div className="suggest__content-details-save">
            <svg
              id="Layer_1"
              data-name="Layer 1"
              fill="#969696"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 500 500"
              height="25"
              width="25"
            >
              <path
                d="M171.88,52.08a68,68,0,0,0-67.71,67.71v312.5A15.63,15.63,0,0,0,128.93,445L250,357.79,371.07,445a15.62,15.62,0,0,0,24.76-12.68V119.79a68,68,0,0,0-67.7-67.71Zm0,31.25H328.13a36.23,36.23,0,0,1,36.45,36.46v282L259.13,325.87a15.61,15.61,0,0,0-18.26,0L135.42,401.79v-282A36.23,36.23,0,0,1,171.88,83.33Z"
                className="cls-1"
              ></path>
            </svg>
          </div>
        </div>
        <div className="pom__content-item-details-desc">
          <Link to={`/post/${slug}`}>
            <h3 className="title-post">
              {title ? title : "Atomic Habits - Thói Quen Tạo Nên Sự Khác Biệt"}
            </h3>
          </Link>
        </div>
        <div className="pom__content-item-details-post">
          <div className="suggest__content-details-post-user">
            <div className="suggest__content-details-post-avt">
              <Link to="/">
                <img
                  src="https://s3-ap-southeast-1.amazonaws.com/images.spiderum.com/sp-xs-avatar/c7967c50a8e811ec8f3e8be3eb7f2505.png"
                  alt=""
                />
              </Link>
            </div>
            <div>
              <Link to="/">
                <p className="post-username">
                  {author ? author.userName : "Nguyễn Thanh Tùng"}
                </p>
              </Link>
            </div>
            <div>
              <span className="time-read">
                {post && handleDate(post.createdAt)} ngày trước
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostV2;