import { Fragment } from "react";
import "./writter.scss";
import { Link } from "react-router-dom";
const Writter = ({ writter }) => {
  const { userName, avatar, intro } = writter;
  // console.log(writter);
  return (
    <Fragment>
      <div className="d-flex justify-content-between align-content-center">
        <div className="d-flex">
          <div className="writter__list-item-avatar">
            <img
              src={
                avatar
                  ? avatar
                  : "https://images.spiderum.com/sp-xs-avatar/953eeaa0096811ec9ec5131d8341f662.jpeg"
              }
              alt=""
            />
          </div>
          <div className="writter-detail">
            <div className="writter-name">
              <Link to={`/user/${userName}`}>{userName}</Link>
            </div>
            <div className="writter-description">
              {/* <p>Chuyên gia tư vấn tài chính</p> */}
              <p>{intro}</p>
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
