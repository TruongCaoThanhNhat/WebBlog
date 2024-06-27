import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { useForm } from "react-hook-form";
import { apiRegister } from "@/api/api";
import { Input } from "@/components/input";
import { toast } from "react-toastify";
const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur", // Kích hoạt validation khi rời khỏi trường
  });

  const onSubmit = async (data) => {
    const res = await apiRegister(data);
    if (res.status !== 200) {
      toast.error(res.data.data.message);
      return;
    }
    toast.success("Đăng ký thành công!");
    navigate("/login");
  };
 const onError = (errors) => {
   // `errors` object contains all validation errors
   console.log("Errors:", errors);
   // Toast errors for each field if needed
   if (errors.userName) {
     toast.error(errors.userName.message);
   }
   if (errors.email) {
     toast.error(errors.email.message);
   }
   if (errors.password) {
     toast.error(errors.password.message);
   }
   if (errors.repassword) {
     toast.error(errors.repassword.message);
   }
 };
  return (
    <div className="register">
      <div className="register__container">
        <Link to="/" className="login__logo">
          <img
            src="https://auth.spiderum.com/assets-auth/images/spiderum-logo.png"
            alt=""
          />
        </Link>
        <form
          action=""
          className="login__form"
          method="POST"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <Input
            type="text"
            placeholder="Tên đăng nhập"
            name="userName"
            className="login__form-input"
            {...register("userName", {
              required: "Username không được để trống",
            })}
            errors={errors}
          />

          <Input
            type="email"
            placeholder="Email"
            name="email"
            className="login__form-input"
            {...register("email", {
              required: "Email không được để trống",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email không hợp lệ",
              },
            })}
            errors={errors}
          />
          <Input
            type="password"
            placeholder="Mật khẩu"
            name="password"
            className="login__form-input"
            {...register("password", {
              required: "Mật khẩu không được để trống",
            })}
            errors={errors}
          />
          <Input
            type="password"
            placeholder="Nhập lại mật khẩu"
            name="repassword"
            className="login__form-input"
            {...register("repassword", {
              required: "Vui lòng nhập lại mật khẩu",
            })}
            errors={errors}
          />
          <button className="login__form-button" name="btnSubmit" type="submit">
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
