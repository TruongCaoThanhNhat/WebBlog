import { Fragment } from "react";
import "./writter.scss";
const Writter = () => {
  return (
    <Fragment>
      <div className="d-flex justify-content-between align-content-center">
        <div className="d-flex">
          <div className="writter__list-item-avatar">
            <img
              src="https://images.spiderum.com/sp-xs-avatar/953eeaa0096811ec9ec5131d8341f662.jpeg"
              alt=""
            />
          </div>
          <div className="writter-detail">
            <div className="writter-name">
              <a href="">Nguyễn Thanh Tùng</a>
            </div>
            <div className="writter-description">
              <p>Chuyên gia tư vấn tài chính</p>
            </div>
          </div>
        </div>
        <div>
          <button className="writer-follow-btn">Theo dõi</button>
        </div>
      </div>
    </Fragment>
  );
};

export default Writter;
