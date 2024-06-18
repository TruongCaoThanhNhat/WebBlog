import { useEffect, useRef, useState } from "react";
import "./createpost.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import initializeEditor from "@/utils/tool";
import { apiCreatePost } from "@/api/api";
import { postCreated } from "@/redux/slice/postSlice";
import { toast } from "react-toastify";

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post = useSelector((state) => state.post);
  const user = useSelector((state) => state.post);
  const category = useSelector((state) => state.category.cateData);
  // console.log("category", category);
  const instanceRef = useRef(null);
  const autoSaveIntervalRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({
    title: "",
    content: [],
    description: "",
    category: "",
    attachment: "",
  });
  const [editorData, setEditorData] = useState(null);

  const handleVisibleModal = () => setVisible(!visible);

  // const editorConfig = initializeEditor();
  useEffect(() => {
    if (!instanceRef.current) {
      const onChange = async () => {
        if (instanceRef.current) {
          const content = await instanceRef.current.save();
          setData((prevData) => ({ ...prevData, content: content.blocks }));
        }
      };

      const editorConfig = initializeEditor(onChange);

      editorConfig.isReady
        .then(() => {
          console.log("Editor.js is ready to work!");
          instanceRef.current = editorConfig;
        })
        .catch((reason) => {
          console.log(`Editor.js initialization failed because of ${reason}`);
        });
    }
  }, [instanceRef]);

  const handleSaveDraft = () => {
    if (instanceRef.current) {
      instanceRef.current
        .save()
        .then((outputData) => {
          console.log("Article data: ", outputData);
          setEditorData(outputData); // Optionally, set the saved data in state
        })
        .catch((error) => {
          console.log("Saving failed: ", error);
        });
    } else {
      console.error("Editor instance is not available.");
    }
  };
  // Auto-save every 10 seconds
  useEffect(() => {
    autoSaveIntervalRef.current = setInterval(handleSaveDraft, 10000);

    return () => {
      clearInterval(autoSaveIntervalRef.current);
    };
  }, [editorData]);
  const handleCreatePost = async () => {
    try {
      console.log("editorData", editorData.blocks);
      setData({
        ...data,
        content: [...editorData.blocks],
      });
      console.log("data", data);
      const res = await apiCreatePost(data);
      console.log("res", res);
      // Xử lý kết quả trả về từ server nếu cần
      dispatch(postCreated(data));
      if (res.status === 201) {
        console.log("Tạo bài viết thành công");
        toast.success("Tạo bài viết thành công");
        navigate(`/user/${user.userInfo.userName}}`);
      }
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  useEffect(() => {
    handleCreatePost();
  }, [dispatch]); // Sử dụng dispatch trong dependency để useEffect chạy lại khi dispatch thay đổi

  useEffect(() => {
    document.title = "Viết bài mới...";
  }, []);
  return (
    <div className="mt-80">
      <div className="post">
        <div className="post__container">
          <input
            type="text"
            placeholder="Tiêu đề bài viết......."
            className="post__title"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />

          <div
            id="editorjs"
            key="editor"
            className=" post__content ce-paragraph cdx-block undefined"
            placeholder="Nội dung bài viết"
          ></div>

          <div className="post__button">
            <button
              className="post__button-main border save"
              onClick={handleSaveDraft}
            >
              Lưu nháp
            </button>
            <button
              className="post__button-main border next"
              onClick={handleVisibleModal}
            >
              Bước tiếp theo
            </button>
          </div>
        </div>
      </div>
      {visible && (
        <div className="modal">
          <div className="modal__container">
            <div className="modal__content">
              <div className="modal__desc">
                <p className="modal__title">
                  Mô tả bài viết
                  <em className="modal__title-sub"> (không bắt buộc)</em>
                </p>
                <textarea
                  className="modal__desc-input"
                  value={data.description}
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="modal__category">
                <p className="modal__title">Chọn danh mục</p>
                <div className="modal__category-container">
                  <select
                    id="selected-id"
                    className="modal__category-select"
                    value={data.category}
                    onChange={(e) =>
                      setData({ ...data, category: e.target.value })
                    }
                  >
                    <option className="modal__category-option">
                      -- Chọn danh mục --
                    </option>
                    {category.map((category) => (
                      <option key={category.id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <div className="modal__category-icon">
                    <i className="modal__category-icon-down bx bxs-chevron-down"></i>
                  </div>
                </div>
              </div>
              <div className="modal__button">
                <button
                  className="modal__button-content back"
                  onClick={handleVisibleModal}
                >
                  Quay lại
                </button>
                <button
                  className="modal__button-content create"
                  onClick={handleCreatePost}
                  type="button"
                >
                  Tạo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
