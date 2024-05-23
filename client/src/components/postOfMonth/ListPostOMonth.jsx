import React from "react";
import "./postofmonth.scss";
import PostofMonth from "./PostofMonth";
const ListPostOMonth = () => {
  const settings = {
    className: "slider variable-width",
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    variableWidth: true,
  };
  return (
    <section className="postofmonth container">
      <div className="pom__wrapper">
        <h3 className="title">BÀI VIẾT CỦA THÁNG</h3>
        <div className="pom__content border">
          <div className="pom__content-list row">
              <div className="col"  >
                <PostofMonth />
              </div>
              <div className="col" >
                <PostofMonth />
              </div>
              <div className="col" >
                <PostofMonth />
              </div>
              <div className="col" >
                <PostofMonth />
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListPostOMonth;
