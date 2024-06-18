import "./suggest.scss";
import { useEffect, useState } from "react";
import Post from "../post/Post";
import { Link, useSearchParams } from "react-router-dom";
import { apiGetAllPost } from "@/api/api";

const ListSuggest = () => {
  const [activeTab, setActiveTab] = useState("suggest"); // State để lưu trạng thái của tab hiện tại
  const [suggestPosts, setSuggestPosts] = useState([]);
  const [newestPosts, setNewestPosts] = useState([]);
  const [topRatedPosts, setTopRatedPosts] = useState([]);

  const [searchParams] = useSearchParams();
  let sort = searchParams.get("sort");
  let page = searchParams.get("page");
  console.log(sort, page);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const data = await apiGetAllPost(sort || "hot", page);
        console.log(data.data);
        if (activeTab === "suggest") {
          setSuggestPosts(data.data);
        } else if (activeTab === "newest") {
          setNewestPosts(data.data);
        } else if (activeTab === "topRated") {
          setTopRatedPosts(data.data);
        }
      } catch (error) {
        console.error("Error fetching category details:", error);
      }
    };
    fetchAllPost();
  }, [activeTab, sort, page]);

  return (
    <section className="suggest container-xxl">
      <div className="suggest__wrapper">
        <div className="d-inline-flex justify-content-between text-uppercase">
          <h3
            className={activeTab === "suggest" ? "title active" : "title"}
            onClick={() => handleTabClick("suggest")}
          >
            <Link to={`/?sort=hot&page=${page || 1}`}>Dành cho bạn</Link>
          </h3>
          <h3
            className={activeTab === "newest" ? "mb-4 active" : "mb-4"}
            onClick={() => handleTabClick("newest")}
          >
            <Link to={`/?sort=new&page=${page || 1}`}>Mới nhất</Link>
          </h3>
          <h3
            className={activeTab === "topRated" ? "mb-4 active" : "mb-4"}
            onClick={() => handleTabClick("topRated")}
          >
            <Link to={`/?sort=top&page=${page || 1}`}>Đánh giá cao nhất</Link>
          </h3>
        </div>
      </div>
      <div className="suggest__main">
        <div className="row-cols-1">
          <div
            className="col"
            style={{ display: activeTab === "suggest" ? "block" : "none" }}
          >
            {suggestPosts &&
              suggestPosts.posts &&
              suggestPosts.posts.map((post, index) => (
                <Post post={post} key={index}></Post>
              ))}
          </div>
          <div
            className="col"
            style={{ display: activeTab === "newest" ? "block" : "none" }}
          >
            {newestPosts &&
              newestPosts.posts &&
              newestPosts.posts.map((post, index) => (
                <Post post={post} key={index}></Post>
              ))}
          </div>
          <div
            className="col"
            style={{ display: activeTab === "topRated" ? "block" : "none" }}
          >
            {topRatedPosts &&
              topRatedPosts.posts &&
              topRatedPosts.posts.map((post, index) => (
                <Post post={post} key={index}></Post>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListSuggest;

