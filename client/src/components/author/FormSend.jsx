const FormSend = () => {
  return (
    <form className="form">
      <h2 class="form-title">
        <strong>CÁC BÀI VIẾT NỔI BẬT BẠN KHÔNG NÊN BỎ LỠ!</strong>
      </h2>
      <div className="form-description">
        <p>
          Thứ Năm hàng tuần, Spiderum sẽ gửi bạn email tổng hợp những bài viết
          đáng đọc nhất tuần qua.
        </p>
      </div>
      <div>
        <img
          src="https://static1.eb-pages.com/uploads/5987363858153472/image.png"
          alt="post"
        />
      </div>
      <div className="form-group">
        <label class="control-label" for="email">
          <p>
            <span>Chúng mình có thể gửi thư cho bạn qua:&nbsp;</span>
          </p>
          <span class="text-danger">*</span>
        </label>
        <div class="controls">
          <input
            id="email"
            title=""
            name="email"
            type="email"
            placeholder="Email của bạn"
            class="form-control"
            required="true"
          />
        </div>
      </div>
      <div className="form-group">
        <label class="control-label" for="email">
          <p>
            <span>Chúng mình có thể gọi bạn là:ớ</span>
          </p>
          <span class="text-danger">*</span>
        </label>
        <div class="controls">
          <input
            id="email"
            title=""
            name="email"
            type="email"
            placeholder="Email của bạn"
            class="form-control"
            required="true"
          />
        </div>
      </div>
      <div className="form-group">
        <button
          type="submit"
          class="submit-btn"
        >
          <p>
            <strong>ĐĂNG KÝ!</strong>
          </p>
        </button>
      </div>
    </form>
  );
};

export default FormSend;
