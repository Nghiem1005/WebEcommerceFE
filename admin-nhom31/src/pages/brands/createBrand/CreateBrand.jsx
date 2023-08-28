import React from "react";
import { Button, Grid } from "@mui/material";
import { createBrand } from "../../../api/fetchers/brand.js";
import { useForm } from "react-hook-form";
import "./createBrand.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateBrand = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (dataForm) => {
    const { name, description } = dataForm;
    const formData = new FormData();
    formData.set("name", name);
    formData.set("description", description);
    const {
      data: { status, message },
    } = await createBrand(formData);
    if (status === "BAD_REQUEST") {
      toast.error(message);
    } else {
      toast.success("Thêm nhãn hàng thành công");
      navigate("/brand");
    }
  };

  return (
    <div className="container">
      <div className="titleContainer">
        <h1 className="detail-title">Create Brand</h1>
      </div>
      <div className="detail-container">
        <div className="detail-show">
          <span className="updateTitle">Create</span>
          <form className="updateForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="userUpdateLeft">
              <div className="updateItem">
                <label>Brand Name</label>
                <input
                  type="text"
                  placeholder="Brand Name"
                  className="updateInput"
                  {...register("name", { required: true })}
                />
              </div>
              <div className="updateItem">
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Description"
                  className="updateInput"
                  {...register("description", { required: true })}
                />
              </div>
              <div className="updateItem">
                {errors.name && (
                  <span className="message">Trường name là bắt buộc</span>
                )}
                {errors.description && (
                  <span className="message">
                    Trường description là bắt buộc
                  </span>
                )}
              </div>
            </div>
            <Grid container spacing={2}>
              <Grid item>
                <button className="userUpdateButton">Create</button>
              </Grid>
              <Grid item>
                <Link to={"/brand"}>
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

export default CreateBrand;
