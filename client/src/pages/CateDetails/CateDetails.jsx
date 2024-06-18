import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./catedetails.scss";
import Suggest from "../../components/suggest/Suggest";
import { apiGetCategoryBySlug, getPostsByCategory } from "@/api/api";
import Post from "@/components/post/Post";

const CateDetails = () => {
  const { slug } = useParams();
  const [cate, setCate] = useState({});
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState({});
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoadingCategory(true);
        const categoryData = await apiGetCategoryBySlug(slug);
        setCate(categoryData.data);
        setCategory(categoryData.data);
        setLoadingCategory(false);
      } catch (error) {
        console.error("Failed to fetch category:", error);
        setError("Failed to fetch category");
        setLoadingCategory(false);
      }
    };

    fetchCategory();
  }, [slug]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (category._id) {
        try {
          setLoadingPosts(true);
          const postData = await getPostsByCategory(category._id);
          setPosts(postData.data.posts);
          setLoadingPosts(false);
        } catch (error) {
          console.error("Failed to fetch posts:", error);
          setError("Failed to fetch posts");
          setLoadingPosts(false);
        }
      }
    };

    fetchPosts();
  }, [category._id]);

  if (loadingCategory || loadingPosts) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <section className="category">
        <header className="category__header position-relative d-flex align-items-center">
          <div className="category__header-background position-absolute top-0 start-0"></div>
          <div className="category__header-container w-100 h-100 bg-dark d-flex justify-content-center align-items-center">
            <div className="category__header-info text-center">
              <p className="category__header-title fs-7 fw-bold text-white">
                {category && category.name ? category.name : 'Tên danh mục'}
              </p>
              <div>
                <button className="btn btn-primary fs-5">
                  <i className="bx bx-check me-2"></i>
                  Đang theo dõi
                </button>
              </div>
            </div>
          </div>
        </header>
        <div className="category__main max-width-container mx-auto py-5">
          <div className="row">
            <div className="col-lg-8">
              <div className="category__content">
                <div className="news">
                  {posts && posts.map((item, index) => (
                    <Suggest key={index} suggest={item}></Suggest>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="sidebar">
                <div className="sidebar__policy widget-container fs-5">
                  <h3 className="title-post">
                    {category && category.name ? category.name : 'Tên danh mục'}
                  </h3>
                  <div className="sidebar__policy-content">
                    <p className="widget-title">Nội dung cho phép</p>
                    <p>
                      Các nội dung thể hiện góc nhìn, quan điểm đa chiều về
                      các vấn đề kinh tế, văn hoá – xã hội trong và ngoài nước.
                    </p>
                    <p className="widget-title">Quy định</p>
                    <ul className="sidebar__policy-menu">
                      <li>
                        Những nội dung không thuộc phạm trù của danh mục sẽ bị
                        nhắc nhở và xoá (nếu không thay đổi thích hợp)
                      </li>
                      <li>Nghiêm cấm spam, quảng cáo</li>
                      <li>
                        Nghiêm cấm post nội dung 18+ hay những quan điểm cực
                        đoan liên quan tới chính trị - tôn giáo
                      </li>
                      <li>Nghiêm cấm phát ngôn thiếu văn hoá và đả kích cá nhân.</li>
                      <li>Nghiêm cấm bài đăng không ghi rõ nguồn nếu đi cóp nhặt.</li>
                    </ul>
                    <button className="btn btn-primary fs-5">
                      <i className="bx bx-check me-2"></i>
                      Đang theo dõi
                    </button>
                  </div>
                </div>
                <div className="sidebar__suggest box-shadow border mt-5">
                  <p className="sidebar__suggest-title border-bottom fs-5 pb-3">
                    CÓ THỂ BẠN QUAN TÂM
                  </p>
                  <div className="sidebar__suggest-content">
                    <div className="sidebar__suggest-content-container d-flex align-items-center">
                      <div className="post-avt-div">
                        <Link to="/">
                          <img
                            src="https://s3-ap-southeast-1.amazonaws.com/images.spiderum.com/sp-xs-avatar/1b57d9b09c7d11ec80afdf2810a9ede6.jpeg"
                            alt=""
                            className="post-avt-div-img"
                          />
                        </Link>
                      </div>
                      <div>
                        <p className="post-title">
                          <Link to="/" className="text-decoration-none">
                            Procrastination: Căn bệnh vô hình giết chết chúng ta
                          </Link>
                        </p>
                        <Link to="/" className="text-decoration-none">
                          <span className="username">Hex </span>
                        </Link>
                        <span className="time-read"> - 18 tháng 8 2019</span>
                      </div>
                    </div>
                    {/* Repeat this block for each suggested content */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CateDetails;
