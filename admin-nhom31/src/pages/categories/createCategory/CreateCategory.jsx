import React from "react";
import { Button, Grid } from "@mui/material";
import "../category/categoryDetail.css";
import { useForm } from "react-hook-form";
import { createCategory } from "../../../api/fetchers/category.js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateCategory = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (dataForm) => {
    const { name } = dataForm;
    const formData = new FormData();
    formData.set("name", name);
    const {
      data: { status, message },
    } = await createCategory(formData);
    if (status === "BAD_REQUEST") {
      toast.error(message);
    } else {
      toast.success("Thêm loại hàng thành công");
      navigate("/category");
    }
  };

  return (
    <div className="container">
      <div className="titleContainer">
        <h1 className="detail-title">Create Category</h1>
      </div>
      <div className="detail-container">
        <div className="detail-show">
          <span className="updateTitle">Create</span>
          <form className="updateForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="userUpdateLeft">
              <div className="updateItem">
                <label>Category Name</label>
                <input
                  type="text"
                  placeholder="Category Name"
                  className="updateInput"
                  {...register("name", { required: true })}
                />
              </div>
              {errors.name && (
                <span className="message">Trường name là bắt buộc</span>
              )}
            </div>
            <Grid container spacing={2}>
              <Grid item>
                <button className="userUpdateButton">Create</button>
              </Grid>
              <Grid item>
                <Link to={"/category"}>
                  <Button variant="outlined" color="error">
                    Cancel
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
