import "./postofmonth.scss";
import PostofMonth from "./PostofMonth";
import { useEffect, useState } from "react";
import { apiTopPostOfMonth } from "@/api/api";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postTopMonth } from "@/redux/slices/postSlice";
const ListPostOMonth = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);

  const settings = {
    className: "slider variable-width",
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    variableWidth: true,
  };

  useEffect(() => {
    const fetchTopPost = async () => {
      try {
        const data = await apiTopPostOfMonth();
        setPosts(data.data.posts.slice(0, 4));
        // dispatch(postTopMonth(data.data.posts));
      } catch (error) {
        console.error("Error fetching category details:", error);
      }
    };
    fetchTopPost();
  }, []);

  // console.log(posts);
  return (
    <section className="postofmonth container-xl">
      <div className="pom__wrapper">
        <div className="d-flex">
          <h3 className="title">BÀI VIẾT CỦA THÁNG</h3>
          <Link to="/posts/top-month" className="view-all mx-4 fs-3">
            Xem top 10 bài viết
          </Link>
        </div>
        <div className="pom__content border">
          <div className="pom__content-list row">
            {posts &&
              posts.map((post, index) => (
                <div className="col-xl-3 col-md-4 col-12" key={index}>
                  <PostofMonth post={post} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListPostOMonth;
