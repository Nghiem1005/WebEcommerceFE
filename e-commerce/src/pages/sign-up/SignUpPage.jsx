import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { register as signup } from "../../api/fetchers/user";
import logo from "../../components/assets/images/logo.png";
import { toast } from "react-toastify";

import "./SignUp.css";
import { useRef } from "react";

const SignUpPage = () => {
  const navigate = useNavigate();
  const ref = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (dataForm) => {
    const format =
      /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{6,}/;
    const { name, phone, password, email, confirm_password } = dataForm;
    if (password !== confirm_password) {
      ref.current.innerText = "Mật khẩu và xác nhận mật khẩu không khớp";
    } else if (!password.match(format)) {
      ref.current.innerText =
        "Mật khẩu phải bao gồm kí chữ thường, chữ hoa, kí tự đặc biệt, số";
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("email", email);
      formData.append("role", 2);
      const {
        data: { status, message },
      } = await signup(formData);
      if (status === "OK") {
        toast.success("Đăng kí thành công");
        navigate("/login");
      } else {
        toast.error(message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };
  return (
    <div className="signup-container">
      <section>
        <div className="register">
          <div className="col-1">
            <img style={{ width: 90 }} src={logo} alt="" />
            <h2>Đăng kí</h2>
            <span>Trở thành thành viên và tận hưởng thôi nào !</span>
            <form
              id="form"
              className="flex flex-col"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Username"
              />
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Email"
              />
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 12,
                })}
                placeholder="Password"
              />
              <input
                type="password"
                {...register("confirm_password", { required: true })}
                placeholder="Confirm password"
              />
              <input
                type="text"
                {...register("phone", { required: true })}
                placeholder="Mobile number"
              />
              {errors.name && <span>Trường số điện thoại là bắt buộc</span>}
              {errors.phone && <span>Trường số điện thoại là bắt buộc</span>}
              {errors.email && <span>Trường email là bắt buộc</span>}
              {errors.password?.type === "minLength" && (
                <span>Mật khẩu ít nhất 6 kí tự</span>
              )}
              {errors.password?.type === "maxLength" && (
                <span>Mật khẩu không quá 12 kí tự</span>
              )}
              {errors.password?.type === "required" && (
                <span>Trường mật khẩu là bắt buộc</span>
              )}
              {errors.confirmpwd && (
                <span>Trường xác nhận mật khẩu là bắt buộc</span>
              )}

              <span className="message" ref={ref}></span>
              <button className="btn">Đăng kí</button>
            </form>
            <div className="signup-option">
              <span>Bạn đã là thành viên ?</span>
              <Link to={"/login"}>Đăng nhập</Link>
            </div>
          </div>
          <div className="col-2">
            <img
              src="https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074075.jpg?w=2000"
              alt=""
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUpPage;
