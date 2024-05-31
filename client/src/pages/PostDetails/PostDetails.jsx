import React from 'react';
import { Link } from 'react-router-dom';
import './postdetails.scss';
import Comment from '../../components/comment/Comment';

const PostDetails = () => {
  return (
    <div className="post__details-container container pt-5">
      <div className="post__details-auth mx-auto">
        <div className="post__details-category d-flex mb-2">
          <Link to="/">
            <span className="post__details-category-name text-muted">Chuyện trò - Tâm sự</span>
          </Link>
        </div>
        <div className="post__details-title">
          <h1>BỐ MẸ CŨNG LÀ LẦN ĐẦU LÀM BỐ MẸ</h1>
        </div>
        <div className="post__details-desc">
          <p className="fst-italic">GEN Z là một thế hệ thật sự YẾU ĐUỐI? Hay chỉ là trò so sánh khập khiễng và là lối ngụy biện của hội chứng THƯỢNG ĐẲNG THẾ HỆ?</p>
        </div>
        <div className="post__details mt-3 d-flex align-items-center">
          <div className="d-flex align-items-center gap-2">
            <div className="post-avt-div">
              <img src="https://s3-ap-southeast-1.amazonaws.com/images.spiderum.com/sp-xs-avatar/aec845906a1911ec8130097cb62284e8.png" alt="Avatar" className="rounded-circle" />
            </div>
            <div>
              <Link to="/">
                <p className="post-username mb-0">Ke hoc viec</p>
              </Link>
              <span className="time-read text-muted">52 phút trước</span>
            </div>
          </div>
        </div>
      </div>
      <div className="post__details-content my-3">
        <div className="post__details-content-container mx-auto">
          <p>Đột nhiên dạo gần đây, sau hàng loạt những vụ việc đau lòng của các bạn trẻ, và dạo một vòng Spiderum. Tôi chợt nhận ra có một số người luôn dùng những lời tưởng chừng là “cao quý” và “mạnh mẽ” như:</p>
          <p>Đột nhiên dạo gần đây, sau hàng loạt những vụ việc đau lòng của các bạn trẻ, và dạo một vòng Spiderum. Tôi chợt nhận ra có một số người luôn dùng những lời tưởng chừng là “cao quý” và “mạnh mẽ” như:</p>
          <p>Đột nhiên dạo gần đây, sau hàng loạt những vụ việc đau lòng của các bạn trẻ, và dạo một vòng Spiderum. Tôi chợt nhận ra có một số người luôn dùng những lời tưởng chừng là “cao quý” và “mạnh mẽ” như:</p>
          <p>Đột nhiên dạo gần đây, sau hàng loạt những vụ việc đau lòng của các bạn trẻ, và dạo một vòng Spiderum. Tôi chợt nhận ra có một số người luôn dùng những lời tưởng chừng là “cao quý” và “mạnh mẽ” như:</p>
          <p>Đột nhiên dạo gần đây, sau hàng loạt những vụ việc đau lòng của các bạn trẻ, và dạo một vòng Spiderum. Tôi chợt nhận ra có một số người luôn dùng những lời tưởng chừng là “cao quý” và “mạnh mẽ” như:</p>
        </div>
      </div>
      <div className="comment">
        <Comment />
      </div>
    </div>
  );
};

export default PostDetails;
