import "./user.scss";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { BsFeather } from "react-icons/bs";
import { GoStack } from "react-icons/go";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsGrid } from "react-icons/bs";
import PostV2 from "@/components/postOfMonth/PostV2";
import { useEffect, useState } from "react";
import ProfileSidebar from "./ProfileSidebar";
import {
  apiGetPostUserHistory,
  apiGetPostUserSaved,
  apiGetPostsByUserName,
  apiRemoveUserHistory,
} from "@/api/api";
import { useDispatch, useSelector } from "react-redux";
import { FaHistory } from "react-icons/fa";
import {
  fetchUserHistory,
  removeUserHistory,
} from "@/redux/slices/historySlice";
const UserPage = () => {
  const user = useSelector((state) => state.user);
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "myPost";
  const [activeTab, setActiveTab] = useState("myPost");
  const [posts, setPosts] = useState({});
  const [savedPosts, setSavedPosts] = useState({});
  const [historyPosts, setHistoryPosts] = useState({});
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (activeTab === "myPost") {
      setPosts(posts || []);
    } else if (activeTab === "savedPost") {
      setSavedPosts(savedPosts || []);
    } else if (activeTab === "historyPost") {
      setHistoryPosts(history || []);
    }
  }, [activeTab, posts, savedPosts]);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await apiGetPostsByUserName(username);
      setPosts(res.data.posts);
      //  console.log(res.data.posts);
    };

    fetchPost();
  }, [username]);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await apiGetPostUserSaved(user.userInfo.id);
      setSavedPosts(res.savedPost);
      // console.log("saved", res.savedPost);
    };

    fetchPost();
  }, [user.userInfo.id]);

  const dispatch = useDispatch();
  const historyPostRedux = useSelector((state) => state.history.historyPosts);
  const status = useSelector((state) => state.history.status);
  const error = useSelector((state) => state.history.error);

  useEffect(() => {
    dispatch(fetchUserHistory(user.userInfo.id));
  }, [dispatch, user.userInfo.id]);

  const handleRemoveHistory =async (postId) => {
    await dispatch(removeUserHistory({ userId: user.userInfo.id, postId }));
    dispatch(fetchUserHistory(user.userInfo.id));
  };
  // useEffect(() => {
  //   const fetchHitory = async () => {
  //     const res = await apiGetPostUserHistory(user.userInfo.id);
  //     setHistoryPosts(res.history);
  //     // console.log("saved", res.savedPost);
  //   };

  //   fetchHitory();
  // }, [user.userInfo.id]);

  // const handleRemoveHistory = async (postId) => {
  //   const res = await apiRemoveUserHistory(user.userInfo.id, postId);
  //   // console.log(res);
  //   if (res.status === "success") {
  //     // Xóa thành công, cập nhật lại trạng thái
  //     setHistoryPosts((prevHistory) =>
  //       prevHistory.filter((item) => item.postId !== postId)
  //     );
  //   }
  // };

  return (
    <div className="main">
      <div className="user">
        <div className="user__cover">
          <img
            src="https://s3-ap-southeast-1.amazonaws.com/images.spiderum.com/sp-cover/f2d00730a5c611ec95ba851d0a1d5ff1.jpeg"
            alt=""
          />
        </div>
        <div className="user__profile">
          <div className="user__profile-content row row-cols-md-1">
            <ProfileSidebar />
            <div className="user__profile-post">
              <div className="profile__tabs">
                <div
                  className={`profile__tabs-item ${
                    activeTab === "myPost" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("myPost")}
                >
                  <Link to={`/user/${user.userInfo.userName}?tab=myPost`}>
                    <BsFeather />
                    <span>Bài viết ({posts?.length})</span>
                  </Link>
                </div>
                <div
                  className={`profile__tabs-item ${
                    activeTab === "series" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("series")}
                >
                  <Link to={`/user/${user.userInfo.userName}?tab=series`}>
                    <GoStack />
                    <span>Series</span>
                  </Link>
                </div>
                <div
                  className={`profile__tabs-item ${
                    activeTab === "saved" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("saved")}
                >
                  <Link to={`/user/${user.userInfo.userName}?tab=saved`}>
                    <GoStack />
                    <span>Saved</span>
                  </Link>
                </div>
                <div
                  className={`profile__tabs-item ${
                    activeTab === "history" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("history")}
                >
                  <Link to={`/user/${user.userInfo.userName}?tab=history`}>
                    <FaHistory />
                    <span>History</span>
                  </Link>
                </div>
              </div>
              <div className="profile__posts">
                <div className="profile__posts-opt justify-content-between">
                  <div>
                    <select name="" id="">
                      <option value="">Theo thời gian</option>
                      <option value="">Theo độ nổi bật</option>
                    </select>
                    <span>
                      <MdKeyboardArrowDown />
                    </span>
                  </div>
                  <div className="profile__posts-layout">
                    <div className="profile__posts-layout-item">
                      <Link>
                        <BsGrid />
                        <span className="layout-mode">Chế độ xem lưới</span>
                      </Link>
                    </div>
                    {/* <div className="profile__posts-layout-item">
                      <Link>
                        <BsViewStacked />
                        <span className="layout-mode">Chế độ xem lưới</span>
                      </Link>
                    </div>
                    <div className="profile__posts-layout-item">
                      <Link>
                        <svg
                          width="17"
                          height="16"
                          viewBox="0 0 17 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_3464_1394)">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M8.50033 5.99996C7.39576 5.99996 6.50033 6.89539 6.50033 7.99996C6.50033 9.10453 7.39576 9.99996 8.50033 9.99996C9.60489 9.99996 10.5003 9.10453 10.5003 7.99996C10.5003 6.89539 9.60489 5.99996 8.50033 5.99996ZM5.16699 7.99996C5.16699 6.15901 6.65938 4.66663 8.50033 4.66663C10.3413 4.66663 11.8337 6.15901 11.8337 7.99996C11.8337 9.84091 10.3413 11.3333 8.50033 11.3333C6.65938 11.3333 5.16699 9.84091 5.16699 7.99996Z"
                              fill="#909399"
                            ></path>
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M0.533203 8.00004C0.533203 7.63185 0.83168 7.33337 1.19987 7.33337H5.16654C5.53473 7.33337 5.8332 7.63185 5.8332 8.00004C5.8332 8.36823 5.53473 8.66671 5.16654 8.66671H1.19987C0.83168 8.66671 0.533203 8.36823 0.533203 8.00004Z"
                              fill="#909399"
                            ></path>
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M11.1729 8.00004C11.1729 7.63185 11.4713 7.33337 11.8395 7.33337H15.8062C16.1744 7.33337 16.4729 7.63185 16.4729 8.00004C16.4729 8.36823 16.1744 8.66671 15.8062 8.66671H11.8395C11.4713 8.66671 11.1729 8.36823 11.1729 8.00004Z"
                              fill="#909399"
                            ></path>
                          </g>
                          <defs _ngcontent-serverApp-c37="">
                            <clipPath id="clip0_3464_1394">
                              <rect
                                width="16"
                                height="16"
                                fill="white"
                                transform="translate(0.5)"
                              ></rect>
                            </clipPath>
                          </defs>
                        </svg>
                        <span className="layout-mode">Chế độ xem lưới</span>
                      </Link>
                    </div> */}
                  </div>
                </div>
                <div className="profile__posts-list">
                  {activeTab === "myPost" && (
                    <div className="profile__posts-list-layout row">
                      {posts &&
                        posts.length &&
                        posts.map((post, index) => (
                          <div className="" key={index}>
                            <PostV2 post={post}></PostV2>
                          </div>
                        ))}
                    </div>
                  )}
                  {activeTab === "series" && (
                    <div className="profile__posts-list-layout row">
                      <div className="">
                        <PostV2 post={""}></PostV2>
                      </div>
                      <div className="">
                        <PostV2 post={""}></PostV2>
                      </div>
                      <div className="">
                        <PostV2 post={""}></PostV2>
                      </div>
                      <div className="">
                        <PostV2 post={""}></PostV2>
                      </div>
                    </div>
                  )}
                  {activeTab === "history" && (
                    <div className="profile__posts-list-layout row">
                      {historyPostRedux &&
                        historyPostRedux.length &&
                        historyPostRedux.map((post, index) => (
                          <div className="" key={index}>
                            <button
                              className="btn btn-danger fs-4"
                              onClick={() => handleRemoveHistory(post._id)}
                            >
                              Xóa
                            </button>
                            <PostV2 post={post}></PostV2>
                          </div>
                        ))}
                    </div>
                  )}
                  {activeTab === "saved" && (
                    <div className="profile__posts-list-layout row">
                      {savedPosts &&
                        savedPosts.length &&
                        savedPosts.map((post, index) => (
                          <div className="" key={index}>
                            <PostV2 post={post}></PostV2>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
                <div className=""></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
