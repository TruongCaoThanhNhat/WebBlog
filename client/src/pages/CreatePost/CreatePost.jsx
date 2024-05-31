import React, { useRef, useState } from "react";
import "./createpost.scss";
const CreatePost = () => {
  const instanceRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const handleVisibleModal = () => setVisible(!visible)
  return (
    <div className="mt-80">
      <div className="post">
        <div className="post__container">
          <div
            contenteditable="true"
            placeholder="Tiêu đề bài viết......."
            className="post__title"
          ></div>
          <div
            className=" post__content ce-paragraph cdx-block undefined"
            contenteditable="true"
            placeholder="Nội dung bài viết">
          </div>
          <div className="post__button">
            <button className="post__button-main border save">Lưu nháp</button>
            <button className="post__button-main border next" onClick={handleVisibleModal}>
              Bước tiếp theo
            </button>
          </div>
        </div>
      </div>
     {
       visible &&  <div className="modal">
       <div className="modal__container">
         <div className="modal__content">
           <div className="modal__desc">
             <p className="modal__title">
               Mô tả bài viết
               <em className="modal__title-sub"> (không bắt buộc)</em>
             </p>
             <textarea className="modal__desc-input"></textarea>
           </div>
           <div className="modal__category">
             <p className="modal__title">Chọn danh mục</p>
             <div className="modal__category-container">
               <select id="selected-id" className="modal__category-select">
                 <option className="modal__category-option">
                   -- Chọn danh mục --
                 </option>
                 <option className="modal__category-option">
                   Quan điểm - Tranh luận
                 </option>
                 <option className="modal__category-option">
                   Truyền cảm hứng
                 </option>
                 <option className="modal__category-option">
                   Khoa học - Công nghệ
                 </option>
                 <option className="modal__category-option">Science2vn</option>
                 <option className="modal__category-option"> Thể thao </option>
                 <option className="modal__category-option"> Game </option>
                 <option className="modal__category-option">
                   Sự kiện Spiderum
                 </option>
                 <option className="modal__category-option">Otakulture</option>
                 <option className="modal__category-option"> Sáng tác </option>
                 <option className="modal__category-option"> Comics </option>
                 <option className="modal__category-option"> Phim </option>
                 <option className="modal__category-option"> Sách </option>
                 <option className="modal__category-option">
                   Du lịch - Ẩm thực
                 </option>
                 <option className="modal__category-option"> Kỹ năng </option>
                 <option className="modal__category-option"> Âm nhạc </option>
                 <option className="modal__category-option">
                   English Zone
                 </option>
                 <option className="modal__category-option">
                   Chuyện trò - Tâm sự
                 </option>
               </select>
               <div className="modal__category-icon">
                   <i className='modal__category-icon-down bx bxs-chevron-down' ></i>
               </div>
             </div>
           </div>
           <div className="modal__button">
             <button className="modal__button-content back" onClick={handleVisibleModal} >Quay lại</button>
             <button className="modal__button-content create">Tạo</button>
           </div>
         </div>
       </div>
     </div>
     }
    </div>
  );
};

export default CreatePost;