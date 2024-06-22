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
  const [categories, setCategories] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [extraCategories, setExtraCategories] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);

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

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await apiGetAllCategory();
      const allCategories = res.data.categories;
      setCategories(allCategories);
      dispatch(getAll(allCategories));
      // Chia danh mục
      setMainCategories(allCategories.slice(0, 8));
      setExtraCategories(allCategories.slice(8));
    };
    fetchCategories();
  }, [dispatch]);

  const handleShow = () => setShowCategory(!showCategory);
  const handleShowDropDown = () => setShowDropDown(!showDropDown);
  const cls = visible ? "visible" : "hide";

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 2) {
      const res = await axios.get(`/api/search?query=${query}`);
      setSearchResults(res.data.results);
    } else {
      setSearchResults([]);
    }
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };


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
                  <div className="header__icon-top-wrapper" onClick={toggleSearchBar}>
                    <BsSearch className="header__icon header__icon-top" />
                  </div>
                  {showSearchBar && (
               <div className="search__bar">
               <form
               className="search_form d-flex align-items-center"
               method="POST"
               action="#"
               >
               <input
                   type="text"
                   name="query"
                   placeholder="Search"
                   title="Enter search keyword"
               />
               <button type="submit" title="Search">
                   <i className="icon-search bi bi-search"></i>
               </button>
           </form>
   </div >
            )}
                </div>
                <div className="none">
                  <Link to="/">
                    <div className="header__icon-top-wrapper">
                      <BsMessenger className="header__icon" />
                    </div>
                  </Link>
                </div>
                <div className="none">
                  <BsBellFill className="header__icon" />
                </div>

                <div className="">
                  <button className="header__button ">
                    <Link to="/create-post">Viết bài</Link>
                  </button>
                </div>
                <div className="">
                  <button className="header__button ">
                    <Link to="/dashboard">Admin</Link>
                  </button>
                </div>
                <div className="header__avt" onClick={handleShowDropDown}>
                  <img
                    src="https://s3-ap-southeast-1.amazonaws.com/images.spiderum.com/sp-xs-avatar/aec845906a1911ec8130097cb62284e8.png"
                    alt=""
                    className="post-avt"
                  />
                </div>
                {showDropDown && (
                  <div className="header__dropdown">
                    <header className="p-10 border-bottom">
                      <Link to="/" className="header__dropdown-header p-10  ">
                        <div className="header__dropdown-img">
                          <img
                            src="https://s3-ap-southeast-1.amazonaws.com/images.spiderum.com/sp-xs-avatar/8918f260d01b11eb8ffbcba3c0ad0183.jpg"
                            alt=""
                          />
                        </div>
                        <div className="header__dropdown-info">
                          <p className="header__dropdown-name">HuuPhuoc</p>
                          <span className="header__dropdown-phone">
                            @0362821110
                          </span>
                        </div>
                      </Link>
                    </header>
                    <div className="header__dropdown-content">
                      <div className="p-7 border-bottom">
                        <ul className="header__dropdown-list ">
                          <li className="header__dropdown-item p-13">
                            <Link to={`/user/${user.userInfo.userName}`} className="header__dropdown-link">
                              <i className="header__dropdown-icon bx bx-user"></i>
                              <p className="header__dropdown-text">Xem trang cá nhân</p>
                            </Link>
                          </li>
                          <li className="header__dropdown-item p-13">
                            <Link to="/user" className="header__dropdown-link">
                              <i className="header__dropdown-icon bx bx-pencil"></i>
                              <p className="header__dropdown-text">Bài viết của tôi</p>
                            </Link>
                          </li>
                          <li className="header__dropdown-item p-13">
                            <Link to="/user" className="header__dropdown-link">
                              <i className="header__dropdown-icon bx bx-file-blank"></i>
                              <p className="header__dropdown-text">Nháp của tôi</p>
                            </Link>
                          </li>
                          <li className="header__dropdown-item p-13">
                            <Link to="/user" className="header__dropdown-link">
                              <i className="header__dropdown-icon bx bx-bookmark"></i>
                              <p className="header__dropdown-text">Đã lưu</p>
                            </Link>
                          </li>
                          <li className="header__dropdown-item p-13">
                            <Link to="/user/setting" className="header__dropdown-link">
                              <i className="header__dropdown-icon bx bx-cog"></i>
                              <p className="header__dropdown-text">Tùy chỉnh tài khoản</p>
                            </Link>
                          </li>
                          <li className="header__dropdown-item p-13">
                            <Link to="/login" className="header__dropdown-link">
                              <i className="header__dropdown-icon bx bx-log-out"></i>
                              <p className="header__dropdown-text">Đăng xuất</p>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
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
              {mainCategories.map((item) => (
                <li key={item._id} className="header__menu-item">
                  <Link to={`/category/${item.slug}`} className="header__menu-link">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="header__cate col-xl-2 col-lg-2 justify-content-end none"
            onClick={handleShow}
          >
            <FaBars className="header__icon cursor-pointer" />
            {showCategory && (
              <div className="header__cate-menu cursor-pointer">
                {extraCategories.map((item) => (
                  <div key={item._id} className="header__cate-list">
                    <Link to={`/category/${item.slug}`}>
                      <div className="header__cate-link">
                        <img
                          className="header__cate-img"
                          src="https://spiderum.com/assets/images/categories/conversation-min.jpg"
                          alt=""
                        />
                        <span className="header__cate-text">{item.name}</span>
                        <i className="header__cate-icon bx bx-x"></i>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;