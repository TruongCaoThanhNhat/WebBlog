import React from "react";
import "./oddPost.scss";
import { Image } from "react-bootstrap";
import Avatar from "../avatar/Avatar";
const OddPost = () => {
  return (
    <div className="old">
      <div className="old__top">
        <div className="old__top-title d-flex justify-content-between align-items-center">
          <h2>Cũ nhưng chất</h2>
          <a href="">Xem thêm</a>
        </div>
      </div>
      <div className="old__bot">
        <div className="card">
          <a href="">
            <Image
              src="https://images.spiderum.com/sp-thumbnails/70855b203b0011edba5db9e047c4f56d.jpg"
              alt="post"
            />
          </a>
          <div className="card__bot">
            <div className="card__bot-desc">
              <div className="card__bot-cate d-flex justify-content-between">
                <div className="d-flex ">
                  <div className="card-category">
                    <a href="">Chuyện trò tâm sự</a>
                  </div>
                  <div className="d-block">
                    <span className="time-read">4 phút đọc</span>
                  </div>
                </div>
                <div className="">
                  <svg
                    _ngcontent-serverApp-c41=""
                    id="Layer_1"
                    data-name="Layer 1"
                    fill="#969696"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 500 500"
                    height="25"
                    width="25"
                  >
                    <path
                      _ngcontent-serverApp-c41=""
                      d="M171.88,52.08a68,68,0,0,0-67.71,67.71v312.5A15.63,15.63,0,0,0,128.93,445L250,357.79,371.07,445a15.62,15.62,0,0,0,24.76-12.68V119.79a68,68,0,0,0-67.7-67.71Zm0,31.25H328.13a36.23,36.23,0,0,1,36.45,36.46v282L259.13,325.87a15.61,15.61,0,0,0-18.26,0L135.42,401.79v-282A36.23,36.23,0,0,1,171.88,83.33Z"
                      class="cls-1"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <a href="">
                  <h2>Atomic Habits: Bạn đã hiểu đúng về tạo lập thói quen?</h2>
                </a>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <Avatar />
              <div className="writter-name p-4">
                <a href="">Nguyễn Thanh Tùng</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OddPost;
