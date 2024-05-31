import "./suggest.scss";
import { useEffect, useState } from "react";
import { apiGetAllPosts } from "@/api/api";
import Post from "../post/Post";
const ListSuggest = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const data = await apiGetAllPosts();
        // console.log(data.data.posts);
        setPosts(data.data.posts);
      } catch (error) {
        console.error("Error fetching category details:", error);
      }
    };
    fetchAllPosts();
  }, []);

  // console.log(posts);
  return (
    <section className="suggest container-xxl">
      <div className="suggest__wrapper">
        <div className="d-inline-flex justify-content-between">
          <h3 className="title">ĐỪNG BỎ LỠ</h3>
          <h3 className="mb-4">ĐỪNG BỎ LỠ</h3>
          <h3 className="mb-4">ĐỪNG BỎ LỠ</h3>
        </div>
      </div>
      <div className="suggest__main">
        <div className="row-cols-1">
          {posts &&
            posts.map((post) => (
              <div className="col" key={post._id}>
                <Post post={post}></Post>
              </div>
            ))}
          {/* <div className="col">
            <Suggest></Suggest>
          </div>
          <div className="col">
            <Suggest></Suggest>
          </div>
          <div className="col">
            <Suggest></Suggest>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default ListSuggest;
