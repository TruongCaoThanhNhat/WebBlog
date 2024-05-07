import React, { useState } from 'react'
import './login.scss'
import {Link } from 'react-router-dom'
// import { loginApi } from '../service/UserSevice'
// import {toast } from 'react-toastify'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () =>{
    
    if(!email || password){
      toast.error("Email or Password is required!");
      return;
    }
    let res = await loginApi(email, password);
    console.log(">>>> check login :", res)
     if(res && res.token){
      localStorage.setItem("token", res.token);
    }else{
      if(res && res.status === 400){
        toast.error(res.data.error)
      }
    }
  }
  return (
    <div className="login " >
      <div className="login__container">
          <Link to='/' className="login__logo">
            <img src="https://auth.spiderum.com/assets-auth/images/spiderum-logo.png" alt="" />
          </Link>
        <form action="" className="login__form">
          <input type="text" placeholder='Tên đăng nhập hoặc email' name='username' className='login__form-input' 
          value={email} 
          onChange={(event) => setEmail(event.target.value)}
          />
          <div>
          <input type="password" placeholder='Mật khẩu' name='password' className='login__form-input'
          value={password} 
          onChange={(event) => setPassword(event.target.value)}
           />
           {/* <i className="fa-solid fa-eye-slash"></i> */}
          </div>
          <button className='login__form-button' name='btnSubmit' type='submit' 
          disabled={email && password ? false : true}
          onClick={() => handleLogin()}
          >Đăng nhập</button>
        </form>
        <p className="login__text">Đăng nhập bằng</p>
        <div className="login__facebook">
          <Link to='/' className="login__facebook-link" >
            <button className="login__form-button fb">
              <i className="login__icon bx bxl-facebook"></i>
              <span className="login__text fb">Facebook</span>
            </button>
          </Link>
        </div>
        <Link to="/">
          <p className="login__text link">Quên mật khẩu?</p>
        </Link>
        <span className="login__text">Không có tài khoản?</span>
        <a href="/register">
          <span className="login__text link"> Đăng ký ngay</span>
        </a>
      </div>
    </div>
  )
}
export default Login