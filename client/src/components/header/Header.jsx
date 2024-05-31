import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsSearch, BsMessenger, BsBellFill } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import "./header.scss";
import { useDispatch, useSelector } from "react-redux";
import { apiGetAllCategory } from "@/api/api";
import { getAll } from "@/redux/slices/categorySlice";
import Avatar from "../avatar/Avatar";
const Header = () => {
   const user = useSelector((state) => state.user);
   const dispatch = useDispatch();
   const [visible, setVisible] = useState(true);
   const [showCategory, setShowCategory] = useState(false);
   const [category, setCategory] = useState([]);
   useEffect(() => {
     const handleScroll = () => {
       const moving = window.pageYOffset;
       if (moving > 100) {
         setVisible(false);
       } else {
         setVisible(true);
       }
     };
     window.addEventListener("scroll", handleScroll);
     return () => {
       window.removeEventListener("scroll", handleScroll);
     };
   }, []);
   const cls = visible ? "visible" : "hide";

   const handleShow = (e) => setShowCategory(!showCategory);

   useEffect(
     () => async () => {
       const res = await apiGetAllCategory();
       // console.log(res.data);
       setCategory(res.data.categories);
       dispatch(getAll(res.data.categories));
     },
     [category, dispatch]
   );
  //  console.log(category);
  return (
    <header className={`header ${visible ? "header" : "header-height"}`}>
      <div className={`header__container ${cls} `}>
        <div className="header__top row-md">
          <div className="col-xxl-3 col-md-6">
            <Link to={"/"}>
              <img
                src="https://spiderum.com/assets/icons/wideLogo.png"
                alt=""
                width="180px"
              />
            </Link>
          </div>
          <div className="col-xxl-9 col-md-6">
            {user.isLoggedIn ? (
              <ul className="header__menu-top">
                <div className="none">
                  <div className="header__icon-top-wrapper">
                    <BsSearch className="header__icon header__icon-top" />
                  </div>
                </div>
                <div className="none">
                  <Link to="/">
                    <div className="header__icon-top-wrapper">
                      <BsMessenger className="header__icon" />
                    </div>
                  </Link>
                </div>
                <div className="none">
                  <i className=" header__icon bx bx-bell"></i>
                  <BsBellFill className="header__icon" />
                </div>

                <div className="">
                  <button className="header__button ">
                    <Link to="/create-post">Viết bài</Link>
                  </button>
                </div>
                <Avatar
                  src="https://www.gravatar.com/avatar/262cfa0997548c39953a9607a56f27da?d=wavatar&f=y"
                />
              </ul>
            ) : (
              <ul className="header__menu-top">
                <div className="">
                  <Link to="/register">
                    <button className="btn-reg">Đăng ký</button>
                  </Link>
                </div>
                <div className="">
                  <Link to="/login">
                    <button className="btn-login ">Đăng nhập</button>
                  </Link>
                </div>
              </ul>
            )}
          </div>
        </div>
        <div className="header__menu row none">
          <div className="header__menu-category col-xl-10 col-lg-10 justify-content-start">
            <ul className="header__menu-list">
              {category && category.length > 0 ? (
                category.map((item) => (
                  <li key={item._id} className="header__menu-item">
                    <Link
                      to={`/category/${item.slug}`}
                      className="header__menu-link"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="header__menu-item">
                  <Link to="/" className="header__menu-link">
                    CHUYỆN TRÒ - TÂM SỰ
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div
            className="header__cate col-xl-2 col-lg-2 justify-content-end none"
            onClick={handleShow}
          >
            <FaBars className="header__icon cursor-pointer" />
            {showCategory && (
              <div className="header__cate-menu">
                <div className="header__cate-list">
                  <Link to="/">
                    <div className="header__cate-link">
                      <img
                        className="header__cate-img"
                        src="https://spiderum.com/assets/images/categories/conversation-min.jpg"
                        alt=""
                      />
                      <span className="header__cate-text">
                        CHUYỆN TRÒ - TÂM SỰ
                      </span>
                      <i className="header__cate-icon bx bx-x"></i>
                    </div>
                  </Link>
                </div>
                <div className="header__cate-list">
                  <Link to="/">
                    <div className="header__cate-link">
                      <img
                        className="header__cate-img"
                        src="https://spiderum.com/assets/images/categories/conversation-min.jpg"
                        alt=""
                      />
                      <span className="header__cate-text">
                        DU LỊCH - ẨM THỰC
                      </span>
                      <i className="header__cate-icon bx bx-x"></i>
                    </div>
                  </Link>
                </div>
                <div className="header__cate-list">
                  <Link to="/">
                    <div className="header__cate-link">
                      <img
                        className="header__cate-img"
                        src="https://spiderum.com/assets/images/categories/conversation-min.jpg"
                        alt=""
                      />
                      <span className="header__cate-text">KỸ NĂNG</span>
                      <i className="header__cate-icon bx bx-x"></i>
                    </div>
                  </Link>
                </div>
                <div className="header__cate-list">
                  <Link to="/">
                    <div className="header__cate-link">
                      <img
                        className="header__cate-img"
                        src="https://spiderum.com/assets/images/categories/conversation-min.jpg"
                        alt=""
                      />
                      <span className="header__cate-text">SÁCH</span>
                      <i className="header__cate-icon bx bx-x"></i>
                    </div>
                  </Link>
                </div>
                <div className="header__cate-list">
                  <Link to="/">
                    <div className="header__cate-link">
                      <img
                        className="header__cate-img"
                        src="https://spiderum.com/assets/images/categories/conversation-min.jpg"
                        alt=""
                      />
                      <span className="header__cate-text">PHIM</span>
                      <i className="header__cate-icon bx bx-x"></i>
                    </div>
                  </Link>
                </div>
                <div className="header__cate-list">
                  <Link to="/">
                    <div className="header__cate-link">
                      <img
                        className="header__cate-img"
                        src="https://spiderum.com/assets/images/categories/conversation-min.jpg"
                        alt=""
                      />
                      <span className="header__cate-text">KỸ NĂNG</span>
                      <i className="header__cate-icon bx bx-x"></i>
                    </div>
                  </Link>
                </div>
                <div className="header__cate-list">
                  <Link to="/">
                    <div className="header__cate-link">
                      <img
                        className="header__cate-img"
                        src="https://spiderum.com/assets/images/categories/conversation-min.jpg"
                        alt=""
                      />
                      <span className="header__cate-text">SÁNG TÁC</span>
                      <i className="header__cate-icon bx bx-x"></i>
                    </div>
                  </Link>
                </div>
                <div className="header__cate-list">
                  <Link to="/">
                    <div className="header__cate-link">
                      <img
                        className="header__cate-img"
                        src="https://spiderum.com/assets/images/categories/conversation-min.jpg"
                        alt=""
                      />
                      <span className="header__cate-text">THỂ THAO</span>
                      <i className="header__cate-icon bx bx-x"></i>
                    </div>
                  </Link>
                </div>
                <div className="header__cate-list">
                  <Link to="/">
                    <div className="header__cate-link">
                      <img
                        className="header__cate-img"
                        src="https://spiderum.com/assets/images/categories/conversation-min.jpg"
                        alt=""
                      />
                      <span className="header__cate-text">GAME</span>
                      <i className="header__cate-icon bx bx-x"></i>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
