import { useEffect, useState } from "react";
import "./usersettings.scss";
import { useDispatch, useSelector } from "react-redux";
import { apiChangePass, apiGetCurentUser, apiUpdateUserInfo } from "@/api/api";
import { toast } from "react-toastify";
const UserSettingPage = () => {
   const [preview, setPreview] = useState();
   const [selectedFile, setSelectedFile] = useState();
   const [user, setUser] = useState({});
   const dispatch = useDispatch();
   const currentUser = useSelector((state) => state.user.userInfo);

   useEffect(() => {
     if (!selectedFile) {
       setPreview(undefined);
       return;
     }
     const objectUrl = URL.createObjectURL(selectedFile);
     setPreview(objectUrl);
     return () => URL.revokeObjectURL(objectUrl);
   }, [selectedFile]);

   const onSelectFile = (e) => {
     if (!e.target.files || e.target.files.length === 0) {
       setSelectedFile(undefined);
       return;
     }
     setSelectedFile(e.target.files[0]);
   };

   useEffect(() => {
     const fetchUser = async () => {
       const data = await apiGetCurentUser(currentUser.userName);
       // console.log(data.data.user);
       if (data) {
         setUser(data.data.user);
       }
     };

     fetchUser();
   }, [currentUser.userName]);

   // handle day
   const currentDate = new Date();
   const currentYear = currentDate.getFullYear();

   // State cho ngày, tháng, năm
   const [day, setDay] = useState("");
   const [month, setMonth] = useState("");
   const [year, setYear] = useState("");

   // Cập nhật state nếu `user.day`, `user.month`, hoặc `user.year` thay đổi
   useEffect(() => {
     if (user?.dateOfBirth) setDay(user.dateOfBirth);
     if (user?.monthOfBirth) setMonth(user.monthOfBirth);
     if (user?.yearOfBirth) setYear(user.yearOfBirth);
   }, [user?.dateOfBirth, user?.monthOfBirth, user?.yearOfBirth]);

   const handleDayChange = (e) => setDay(e.target.value);
   const handleMonthChange = (e) => setMonth(e.target.value);
   const handleYearChange = (e) => setYear(e.target.value);

   // Tạo danh sách các ngày dựa trên tháng và năm
   const getDaysInMonth = (year, month) => {
     return new Date(year, month, 0).getDate();
   };

   const daysInMonth = month && year ? getDaysInMonth(year, month) : 31;

   // gender
   const [gender, setGender] = useState("");

   // Cập nhật state nếu `user.gender` thay đổi
   useEffect(() => {
     if (user?.gender) {
       setGender(user.gender);
     }
   }, [user?.gender]);

   const handleGenderChange = (e) => setGender(e.target.value);

   // display name
   const [password, setPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [displayName, setDisplayName] = useState("");
   const [email, setEmail] = useState("");
   const [address, setAddress] = useState("");
   const [mobile, setMobile] = useState("");

   // Cập nhật state nếu `user.displayName`, `user.email`, `user.address`, hoặc `user.mobile` thay đổi
   useEffect(() => {
     if (user?.displayName) setDisplayName(user.displayName);
     if (user?.email) setEmail(user.email);
     if (user?.address) setAddress(user.address);
     if (user?.mobile) setMobile(user.mobile);
   }, [user?.displayName, user?.email, user?.address, user?.mobile]);

   const handleChangePassword = (e) => setPassword(e.target.value);
   const handleChangeNewPassword = (e) => setNewPassword(e.target.value);
   const handleDisplayNameChange = (e) => setDisplayName(e.target.value);
   const handleEmailChange = (e) => setEmail(e.target.value);
   const handleAddressChange = (e) => setAddress(e.target.value);
   const handleMobileChange = (e) => setMobile(e.target.value);

   const handleUpdate = async (e) => {
     e.preventDefault();
     const data = {
       displayName,
       dateOfBirth: day,
       monthOfBirth: month,
       yearOfBirth: year,
       gender,
       address,
       mobile,
     };
     console.log(data);
     const res = await apiUpdateUserInfo(data);
     if (res.status === "success") {
       toast.success("Cập nhật thông tin thành công");
     }
     console.log(res);
   };
   const handleCancel = (e) => {
     e.preventDefault();
     setDisplayName(user.displayName);
     setAddress(user.address);
     setMobile(user.mobile);
     setDay(user.dateOfBirth);
     setMonth(user.monthOfBirth);
     setYear(user.yearOfBirth);
     setGender(user.gender);
   };
   const handleUpdatePassword = async (e) => {
     e.preventDefault();
     const data = {
       oldPassword: password,
       newPassword,
     };
     console.log(data);
     const res = await apiChangePass(data);
     if (res.status === "success") {
       toast.success("Đổi mật khẩu thành công");
     } else {
       toast.error("Đổi mật khẩu thất bại");
     }
   };
  return (
    <div className="container-xl">
      <div className="mt-190">
        <div className="settings mx-auto">
          <div className="settings__wrapper row ">
            <div className="settings__left col">
              <ul className="settings__navbar">
                <li className="settings__navbar-item">
                  <span className="settings__navbar-text">Tài khoản</span>
                </li>
              </ul>
            </div>
            <div className="settings__right col">
              <form action="" className="mx-auto">
                <div className="settings__content mx-auto">
                  <div className="settings__cover">
                    <form action="">
                      <img src="settings__avt-img cover" alt="" />
                      <div className="settings__cover-bg">
                        {selectedFile && (
                          <img src="" alt="" className="settings__avt-img" />
                        )}
                        <label className="settings__bg-icon ">
                          <div className="settings__bg-icon-upload">
                            <svg
                              height="40"
                              viewBox="0 0 1000 1000"
                              width="40"
                              x="0px"
                              y="0px"
                              className="ng-tns-c79-0 ng-star-inserted"
                            >
                              <g fill="#FFF" className="ng-tns-c79-0">
                                <path
                                  d="M336.7,91.7h326.7L745,214.2h122.5c33.8,0,62.7,12.2,86.6,36.5s35.9,53.4,35.9,87.2v448.5c0,33.8-12,62.6-35.9,86.3s-52.8,35.6-86.6,35.6h-735c-33.8,0-62.7-12-86.6-35.9S10,819.6,10,785.8V337.3c0-33.8,12-62.8,35.9-86.9s52.8-36.2,86.6-36.2H255L336.7,91.7z M500,336.7c27.6,0,54.1,5.4,79.3,16.3c25.2,10.8,46.9,25.4,65.1,43.5s32.7,39.9,43.5,65.1c10.8,25.2,16.3,51.6,16.3,79.3c0,27.6-5.4,54.1-16.3,79.3c-10.8,25.2-25.4,46.9-43.5,65.1s-39.9,32.7-65.1,43.5C554.1,739.6,527.6,745,500,745s-54.1-5.4-79.3-16.3c-25.2-10.8-46.9-25.4-65.1-43.5s-32.7-39.9-43.5-65.1s-16.3-51.6-16.3-79.3c0-27.6,5.4-54.1,16.3-79.3c10.8-25.2,25.4-46.9,43.5-65.1s39.9-32.7,65.1-43.5C445.9,342.1,472.4,336.7,500,336.7z M500,418.3c-33.8,0-62.7,12-86.6,35.9s-35.9,52.8-35.9,86.6c0,33.8,12,62.7,35.9,86.6s52.8,35.9,86.6,35.9c33.8,0,62.7-12,86.6-35.9s35.9-52.8,35.9-86.6c0-33.8-12-62.7-35.9-86.6S533.8,418.3,500,418.3z M701.3,295.8l-80.1-122.5H380.4l-81.7,122.5H132.5c-11.3,0-20.9,4-28.9,12.1c-8,8.1-12,17.9-12,29.3v448.5c0,11.3,4,20.9,12,28.9c8,8,17.6,12,28.9,12h735c11.5,0,21.2-3.9,29-11.6c7.9-7.8,11.8-17.3,11.8-28.6V337.9c0-11.5-4-21.4-12.1-29.7c-8.1-8.3-17.7-12.4-28.7-12.4L701.3,295.8L701.3,295.8z"
                                  className="ng-tns-c79-0"
                                ></path>
                              </g>
                            </svg>
                            <input
                              type="file"
                              className="settings__avt-input"
                              onChange={onSelectFile}
                            />
                          </div>
                        </label>
                      </div>
                    </form>
                  </div>
                  <div className="settings__account row ">
                    <div className="settings__flex-top">
                      <form className="settings__flex-30 settings__avt">
                        {selectedFile && (
                          <img src="" alt="" className="settings__avt-img" />
                        )}
                        <label className="settings__avt-icon">
                          <div className="settings__avt-icon-upload">
                            <svg
                              height="40"
                              viewBox="0 0 1000 1000"
                              width="40"
                              x="0px"
                              y="0px"
                              className="ng-tns-c79-0 ng-star-inserted"
                            >
                              <g fill="#FFF" className="ng-tns-c79-0">
                                <path
                                  d="M336.7,91.7h326.7L745,214.2h122.5c33.8,0,62.7,12.2,86.6,36.5s35.9,53.4,35.9,87.2v448.5c0,33.8-12,62.6-35.9,86.3s-52.8,35.6-86.6,35.6h-735c-33.8,0-62.7-12-86.6-35.9S10,819.6,10,785.8V337.3c0-33.8,12-62.8,35.9-86.9s52.8-36.2,86.6-36.2H255L336.7,91.7z M500,336.7c27.6,0,54.1,5.4,79.3,16.3c25.2,10.8,46.9,25.4,65.1,43.5s32.7,39.9,43.5,65.1c10.8,25.2,16.3,51.6,16.3,79.3c0,27.6-5.4,54.1-16.3,79.3c-10.8,25.2-25.4,46.9-43.5,65.1s-39.9,32.7-65.1,43.5C554.1,739.6,527.6,745,500,745s-54.1-5.4-79.3-16.3c-25.2-10.8-46.9-25.4-65.1-43.5s-32.7-39.9-43.5-65.1s-16.3-51.6-16.3-79.3c0-27.6,5.4-54.1,16.3-79.3c10.8-25.2,25.4-46.9,43.5-65.1s39.9-32.7,65.1-43.5C445.9,342.1,472.4,336.7,500,336.7z M500,418.3c-33.8,0-62.7,12-86.6,35.9s-35.9,52.8-35.9,86.6c0,33.8,12,62.7,35.9,86.6s52.8,35.9,86.6,35.9c33.8,0,62.7-12,86.6-35.9s35.9-52.8,35.9-86.6c0-33.8-12-62.7-35.9-86.6S533.8,418.3,500,418.3z M701.3,295.8l-80.1-122.5H380.4l-81.7,122.5H132.5c-11.3,0-20.9,4-28.9,12.1c-8,8.1-12,17.9-12,29.3v448.5c0,11.3,4,20.9,12,28.9c8,8,17.6,12,28.9,12h735c11.5,0,21.2-3.9,29-11.6c7.9-7.8,11.8-17.3,11.8-28.6V337.9c0-11.5-4-21.4-12.1-29.7c-8.1-8.3-17.7-12.4-28.7-12.4L701.3,295.8L701.3,295.8z"
                                  className="ng-tns-c79-0"
                                ></path>
                              </g>
                            </svg>
                            <input
                              type="file"
                              className="settings__avt-input"
                              onChange={onSelectFile}
                            />
                          </div>
                        </label>
                      </form>
                      <div className="settings__flex-70">
                        <textarea
                          className="settings__textarea"
                          name=""
                          id=""
                        ></textarea>
                      </div>
                    </div>
                    <div className="settings__flex row row-cols-md-1">
                      <div className="settings__flex-item col-sm-12">
                        <label
                          className="settings__name"
                          onChange={handleDisplayNameChange}
                        >
                          TÊN HIỂN THỊ
                        </label>
                        <input
                          type="text"
                          className="settings__input"
                          value={displayName}
                          onChange={handleDisplayNameChange}
                        />
                      </div>
                      <div className="settings__flex-item col-sm-12">
                        <label className="settings__name">EMAIL</label>
                        <input
                          type="text"
                          className="settings__input"
                          value={email}
                          onChange={handleEmailChange}
                        />
                      </div>
                      <div className="settings__flex-item col-sm-12">
                        <label className="settings__name">NGÀY SINH</label>
                        <div className="settings__date">
                          {/* Ngày */}
                          <div className="settings__date-container">
                            <select
                              className="settings__date-select"
                              value={day}
                              onChange={handleDayChange}
                            >
                              <option value="">Ngày</option>
                              {Array.from({ length: daysInMonth }, (_, i) => (
                                <option
                                  key={i + 1}
                                  value={String(i + 1).padStart(2, "0")}
                                >
                                  {i + 1}
                                </option>
                              ))}
                            </select>
                            <div className="settings__date-drop">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                  className="ng-tns-c79-0"
                                ></path>
                              </svg>
                            </div>
                          </div>

                          {/* Tháng */}
                          <div className="settings__date-container">
                            <select
                              className="settings__date-select"
                              value={month}
                              onChange={handleMonthChange}
                            >
                              <option value="">Tháng</option>
                              {Array.from({ length: 12 }, (_, i) => (
                                <option
                                  key={i + 1}
                                  value={String(i + 1).padStart(2, "0")}
                                >
                                  {i + 1}
                                </option>
                              ))}
                            </select>
                            <div className="settings__date-drop">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                  className="ng-tns-c79-0"
                                ></path>
                              </svg>
                            </div>
                          </div>

                          {/* Năm */}
                          <div className="settings__date-container">
                            <select
                              className="settings__date-select"
                              value={year}
                              onChange={handleYearChange}
                            >
                              <option value="">Năm</option>
                              {Array.from(
                                { length: currentYear - 1990 + 1 },
                                (_, i) => {
                                  const yearValue = 1990 + i;
                                  return (
                                    <option key={yearValue} value={yearValue}>
                                      {yearValue}
                                    </option>
                                  );
                                }
                              )}
                            </select>
                            <div className="settings__date-drop">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                  className="ng-tns-c79-0"
                                ></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="settings__flex-item col-sm-12">
                        <label className="settings__name">GIỚI TÍNH</label>
                        <div className="settings__gender">
                          <div className="settings__gender-item">
                            <input
                              type="radio"
                              id="male"
                              value="male"
                              checked={gender === "male"}
                              onChange={handleGenderChange}
                            />
                            <label for="male" className="settings__gender-text">
                              Nam
                            </label>
                          </div>
                          <div className="settings__gender-item">
                            <input
                              type="radio"
                              id="female"
                              value="female"
                              checked={gender === "female"}
                              onChange={handleGenderChange}
                            />
                            <label
                              for="female"
                              className="settings__gender-text"
                            >
                              Nữ
                            </label>
                          </div>
                          <div className="settings__gender-item">
                            <input
                              type="radio"
                              value="other"
                              name="gender"
                              checked={gender === "other"}
                              onChange={handleGenderChange}
                            />
                            <label className="settings__gender-text">
                              Khác
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <form className="settings__form">
                      <button className="settings__password">
                        Đổi mật khẩu
                      </button>
                      <div className="settings__flex">
                        <div className="settings__flex-item-wfull">
                          <label className="settings__name" htmlFor="">
                            Mật khẩu cũ
                          </label>
                          <input
                            type="password"
                            className="settings__input"
                            value={password}
                            onChange={handleChangePassword}
                          />
                        </div>
                        <div className="settings__flex-item-wfull">
                          <label className="settings__name" htmlFor="">
                            Mật khẩu mới
                          </label>
                          <input
                            type="password"
                            className="settings__input"
                            value={newPassword}
                            onChange={handleChangeNewPassword}
                          />
                        </div>
                        <div className="settings__flex-item-wfull">
                          <label className="settings__name" htmlFor="">
                            Nhập lại mật khẩu mới
                          </label>
                          <input
                            type="password"
                            className="settings__input"
                            value={newPassword}
                            onChange={handleChangeNewPassword}
                          />
                        </div>
                      </div>
                      <div className="p-30">
                        <button
                          className="settings__button"
                          onClick={handleUpdatePassword}
                        >
                          Xác nhận
                        </button>
                      </div>
                    </form>
                    <div className="settings__flex">
                      <div className="settings__flex-item">
                        <label htmlFor="" className="settings__name">
                          Địa chỉ
                        </label>
                        <input
                          type="text"
                          className="settings__input"
                          value={address}
                          onChange={handleAddressChange}
                        />
                      </div>
                      <div className="settings__flex-item">
                        <label htmlFor="" className="settings__name">
                          Số điện thoại
                        </label>
                        <input
                          type="text"
                          className="settings__input"
                          value={mobile}
                          onChange={handleMobileChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="settings__actions ">
                  <button
                    className="settings__actions cancle"
                    onClick={handleCancel}
                  >
                    Hủy
                  </button>
                  <button
                    className="settings__actions save"
                    onClick={handleUpdate}
                  >
                    Lưu
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettingPage;
