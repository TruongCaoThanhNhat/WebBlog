import "./suggest.scss";
import { useEffect, useState } from "react";
import Post from "../post/Post";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { apiGetAllPost } from "@/api/api";
import { Pagination, Stack } from "@mui/material";

const ListSuggest = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("suggest"); // State để lưu trạng thái của tab hiện tại
  const [suggestPosts, setSuggestPosts] = useState([]);
  const [newestPosts, setNewestPosts] = useState([]);
  const [topRatedPosts, setTopRatedPosts] = useState([]);
  const [pagination, setPagination] = useState({}); // State để lưu thông tin phân trang [page, totalPage, totalPost

  const [searchParams] = useSearchParams();
  let sort = searchParams.get("sort");
  let page = searchParams.get("page");
  // console.log(sort, page);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // navigate(`/?sort=${tab}&page=1`);
  };

  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const data = await apiGetAllPost(sort || "hot", page);
        // console.log("all", data.data);
        if (activeTab === "suggest") {
          setSuggestPosts(data.data);
          setPagination(data.data.pagination);
        } else if (activeTab === "newest") {
          setNewestPosts(data.data);
          setPagination(data.data.pagination);
        } else if (activeTab === "topRated") {
          setTopRatedPosts(data.data);
          setPagination(data.data.pagination);
        }
      } catch (error) {
        console.error("Error fetching category details:", error);
      }
    };
    fetchAllPost();
  }, [activeTab, sort, page]);
  const handleChangePage = (event, value) => {
    navigate(`/?sort=${sort}&page=${value}`);
    console.log(`Trang hiện tại: ${value}`);
  };
  return (
    <section className="suggest container-xxl">
      <div className="suggest__wrapper">
        <div className="d-inline-flex justify-content-between text-uppercase">
          <h3
            className={activeTab === "suggest" ? "title active" : "title"}
            onClick={() => handleTabClick("suggest")}
          >
            <Link to={`/?sort=hot&page=${1}`}>Dành cho bạn</Link>
          </h3>
          <h3
            className={activeTab === "newest" ? "mb-4 active" : "mb-4"}
            onClick={() => handleTabClick("newest")}
          >
            <Link to={`/?sort=new&page=${1}`}>Mới nhất</Link>
          </h3>
          <h3
            className={activeTab === "topRated" ? "mb-4 active" : "mb-4"}
            onClick={() => handleTabClick("topRated")}
          >
            <Link to={`/?sort=top&page=${1}`}>Đánh giá cao nhất</Link>
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
      <div className="pagination__bar">
        <Stack spacing={2}>
          <Pagination
            count={pagination.totalPages || 1}
            page={page}
            variant="outlined"
            color="primary"
            size="large"
            onChange={handleChangePage}
            showFirstButton
            showLastButton
            sx={{ color: "red" }} // Thay đổi màu sắc ở đây
          />
        </Stack>
      </div>
    </section>
  );
};

export default ListSuggest;
