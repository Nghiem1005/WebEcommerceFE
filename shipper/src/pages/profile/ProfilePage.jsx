import { Button, Grid } from "@mui/material";
import React, { useState, useRef } from "react";
import { useAuth } from "../../utils/authProvider.js";
import useQueryCustom from "../../hooks/useQueryCustom.js";
import { getUSer, updateUSer } from "../../api/fetchers/user.js";
import Loader from "../../components/Loader.jsx";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [isShowChangePassword, setIsShowChangePassword] = useState(false);
  const auth = useAuth();
  const ref = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isLoading, data } = useQueryCustom(["GET_SHIPPER"], () =>
    getUSer(auth.user.userId)
  );

  if (isLoading) {
    return <Loader />;
  }

  const onSubmit = async (dataForm) => {
    const format =
      /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{6,}/;
    const { password, confirmPassword } = dataForm;
    if (password !== confirmPassword) {
      ref.current.innerText = "Pass word and Confirm Password not match";
    } else if (!password.match(format)) {
      ref.current.innerText =
        "Password must contain uppercase lowercase letters, special characters, numbers";
    } else {
      const form = new FormData();
      form.append("password", password);
      form.append("email", data.user.email);
      form.append("phone", data.user.phone);
      form.append("role", data.user.role.id);
      form.append("name", data.user.name);
      const response = await updateUSer(auth.user.userId, form);
      if (response.data.status !== "OK") {
        toast.error("Có lỗi !");
      } else {
        toast.success("Đổi mật khẩu thành công!");
        setIsShowChangePassword(false);
      }
    }
  };

  return (
    <div
      className="flex--wrap"
      style={{ display: "flex", padding: "20px", backgroundColor: "#f4f5f7" }}
    >
      <div class="container py-2 h-200 w-100">
        <div class="row d-flex justify-content-center align-items-start h-100">
          <div>
            <div class="card mb-3" style={{ borderRadius: ".5rem" }}>
              <div class="row g-0">
                <div
                  class="col-md-4 gradient-custom text-center text-white"
                  style={{
                    borderRadius: ".5rem",
                  }}
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar"
                    class="img-fluid my-5"
                    style={{ width: "80px" }}
                  />
                  <h5>{data?.user?.name}</h5>
                  <p>{data?.user?.role?.name}</p>
                  <i class="far fa-edit mb-5"></i>
                </div>
                <div class="col-md-5">
                  <div class="card-body">
                    <h6>Information</h6>
                    <hr class="mt-0 mb-4" />
                    <div class="row pt-1">
                      <div class="col-12 mb-3">
                        <h6>Email</h6>
                        <p class="text-muted">{data?.user?.email}</p>
                      </div>
                      <div class="col-12 mb-3">
                        <h6>Phone</h6>
                        <p class="text-muted">+84 {data?.user?.phone}</p>
                      </div>
                      <div class="col-12 mb-3">
                        <h6>Description</h6>
                        <p class="text-muted">
                          {data?.user?.role?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="row pt-1 mx-1">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div class="col-12 mb-3">
                        {isShowChangePassword ? (
                          <>
                            <h6>Change Password</h6>
                            <div class="input-group flex-nowrap mb-2">
                              <span
                                class="input-group-text"
                                id="addon-wrapping"
                              >
                                P
                              </span>
                              <input
                                type="password"
                                class="form-control"
                                placeholder="New Password"
                                aria-label="Username"
                                aria-describedby="addon-wrapping"
                                {...register("password", {
                                  required: true,
                                  minLength: 6,
                                  maxLength: 12,
                                })}
                              />
                            </div>
                            <div class="input-group flex-nowrap mb-3">
                              <span
                                class="input-group-text"
                                id="addon-wrapping"
                              >
                                P
                              </span>
                              <input
                                type="password"
                                class="form-control"
                                placeholder="Confirm Password"
                                aria-label="Username"
                                aria-describedby="addon-wrapping"
                                {...register("confirmPassword", {
                                  required: true,
                                })}
                              />
                            </div>
                            {errors.password?.type === "required" && (
                              <span className="message">
                                Field password is required.
                              </span>
                            )}
                            {errors.password?.type === "minLength" && (
                              <span className="message">
                                Field password is at least 6 characters.
                              </span>
                            )}
                            {errors.password?.type === "maxLength" && (
                              <span className="message">
                                Field password is at longest 12 characters.
                              </span>
                            )}
                            {errors.confirmPassword && (
                              <span className="message">
                                Field confirm password is required.
                              </span>
                            )}
                            <span className="message" ref={ref}></span>
                          </>
                        ) : null}
                        {!isShowChangePassword ? (
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => setIsShowChangePassword(true)}
                          >
                            Change Password
                          </Button>
                        ) : null}
                        {isShowChangePassword ? (
                          <Grid
                            container
                            spacing={2}
                            style={{ alignItems: "center" }}
                          >
                            <Grid item>
                              <button className="userUpdateButton">
                                Đồng ý
                              </button>
                            </Grid>
                            <Grid item>
                              <Button
                                variant="outlined"
                                color="error"
                                onClick={() => setIsShowChangePassword(false)}
                              >
                                Hủy bỏ
                              </Button>
                            </Grid>
                          </Grid>
                        ) : null}
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-3">
                  <div class="card-body p-4 text-center">
                    <h6>Address</h6>
                    <hr class="mt-0 mb-4" />
                    <div class="row pt-1">
                      <div class="col-12 mb-3">
                        <h6>Province</h6>
                        <p class="text-muted">
                          {data?.address?.address?.province}
                        </p>
                      </div>
                      <div class="col-12 mb-3">
                        <h6>District</h6>
                        <p class="text-muted">
                          {data?.address?.address?.district}
                        </p>
                      </div>
                      <div class="col-12 mb-3">
                        <h6>Ward</h6>
                        <p class="text-muted">{data?.address?.address?.ward}</p>
                      </div>
                    </div>
                    <hr class="mt-0 mb-4" />
                    <div class="row pt-1">
                      <div class="col-12 mb-3">
                        <h6>Location Work</h6>
                        <p class="text-muted">
                          {data?.address?.address?.province}
                        </p>
                      </div>
                      <div class="col-12 mb-3">
                        <h6>Status</h6>
                        <p class="text-muted">Active</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
