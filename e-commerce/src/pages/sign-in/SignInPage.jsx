import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/authProvider";
import logo from "../../components/assets/images/logo.png";
import "./SignIn.css";

const SignInPage = () => {
  const ref = useRef();
  const auth = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = async (dataForm) => {
    const data = await auth.loginUser({...dataForm, role: '123'});
    if (data.status === "UNAUTHORIZED") {
      ref.current.innerText =
        "Tài khoản không có quyền truy cập hoặc đã bị khóa";
    } else if (data.status === "BAD_REQUEST") {
      ref.current.innerText = "Tài khoản không tồn tại";
    } else {
      navigate(-1, { replace: true });
    }
  };
  return (
    <div className="signin-container">
      <section>
        <div className="signin">
          <div className="col-1">
            <img
              src="https://media.zim.vn/61694b58a2d9bb001f9b41b5/idea-for-ielts-writing-topic-online-shopping-gia-re.jpg"
              alt=""
            />
          </div>
          <div className="col-2">
            <img style={{ width: 90 }} src={logo} alt="" />
            <h2>Đăng nhập</h2>
            <span>Tận hưởng thôi nào !</span>
            <form
              id="form"
              className="flex flex-col"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Email"
              />
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="Password"
              />
              {errors.email?.type === "required" && (
                <span>Trường email là bắt buộc</span>
              )}
              {errors.password?.type === "required" && (
                <span>Trường mật khẩu là bắt buộc</span>
              )}
              <span className="message" ref={ref}></span>
              <button className="btn">Đăng nhập</button>
            </form>
            <div className="signin-option">
              <span>Bạn chưa có tài khoản ?</span>
              <Link to={"/signup"}>Đăng kí</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignInPage;
