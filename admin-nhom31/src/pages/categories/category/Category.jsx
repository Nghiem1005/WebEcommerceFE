import React, { useEffect } from "react";
import { Button, Grid } from "@mui/material";
import Loader from "../../../components/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./categoryDetail.css";
import { useQueryCustom } from "../../../hooks";
import { thunkCategoryTypes } from "../../../constants/thunkTypes";
import { getCategory, updateCategory } from "../../../api/fetchers/category.js";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const Category = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { isLoading, data, refetch } = useQueryCustom(
    thunkCategoryTypes.GET_CATEGORY,
    () => getCategory(categoryId)
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    refetch();
  }, []);

  const onSubmit = async (dataForm) => {
    const { name } = dataForm;
    const formData = new FormData();
    formData.set("name", name);
    const {
      data: { status, message },
    } = await updateCategory(categoryId, formData);
    if (status === "BAD_REQUEST") {
      toast.error(message);
    } else {
      toast.success("Cập nhật loại hàng thành công");
      navigate("/category");
    }
  };

  useEffect(() => {
    if (data) {
      setValue("name", data.data.name || "");
    }
  }, [data, setValue]);

  if (isLoading) {
    return <Loader/>
  }

  return (
    <div className="container">
      <div className="titleContainer">
        <h1 className="detail-title">Edit Category</h1>
        <Link to="/category/create">
          <button className="userAddBtn">Create</button>
        </Link>
      </div>
      <div className="detail-container">
        <div className="detail-show">
          <span className="updateTitle">Edit</span>
          <form
            id="form"
            className="updateForm"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="userUpdateLeft">
              <div className="updateItem">
                <label>Category Name</label>
                <input
                  type="text"
                  placeholder={data.data.name}
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
                <button className="userUpdateButton">Update</button>
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

export default Category;
