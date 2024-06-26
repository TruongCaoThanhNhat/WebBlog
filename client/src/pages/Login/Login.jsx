import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginSuccess,
  loginFailure,
} from "../../redux/slice/authenticationSlice";
import { Link, useNavigate } from "react-router-dom";
import { apiLogin } from "../../api";
import "./login.scss";
import Cookies from "js-cookie";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!userName || !password) {
      dispatch(
        loginFailure({
          error: "Vui lòng nhập đầy đủ tên đăng nhập hoặc email!",
        })
      );
      return;
    }

    try {
      const res = await apiLogin(userName, password);
      const token = res.data.token;
      if (res) {
        dispatch(loginSuccess(res.data));
        Cookies.set("accessToken", token, { expires: 7 });
        navigate("/");
        // console.log("Đăng nhập thành công!" + token);
      } else {
        dispatch(
          loginFailure({ error: "Sai username hoặc password!" })
        );
      }
      // console.log(res);
    } catch (error) {
      dispatch(
        loginFailure({
          error: error.message || "Sai username hoặc password!",
        })
      );
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="text-center mb-4">
          <img
            src="https://auth.spiderum.com/assets-auth/images/spiderum-logo.png"
            alt="Logo"
            className="img-fluid"
            style={{ maxWidth: "150px" }}
          />
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              placeholder="Tên đăng nhập hoặc email"
              type="text"
              className="form-control"
              id="userName"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              placeholder="Mật khẩu"
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Đăng nhập
          </button>
        </form>
        <div className="mt-3 text-center">
          <p>Đăng nhập bằng</p>
          <Link
            to="/"
            className="btn btn-primary w-100 mb-2"
            style={{ backgroundColor: "#3b5998" }}
          >
            Facebook
          </Link>
          <Link to="/">
            <p className="text-primary">Quên mật khẩu?</p>
          </Link>
          <p>
            Không có tài khoản?{" "}
            <Link to="/register" className="text-primary">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
