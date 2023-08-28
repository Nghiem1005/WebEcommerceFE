import React, { useEffect } from "react";
import { Button, Grid } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQueryCustom } from "../../../hooks";
import { thunkBrandTypes } from "../../../constants/thunkTypes";
import { getBrand, updateBrand } from "../../../api/fetchers/brand.js";
import { useForm } from "react-hook-form";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import "./brandDetail.css";

const Brand = () => {
  const { brandId } = useParams();
  const navigate = useNavigate();
  const { isLoading, data, refetch } = useQueryCustom(
    thunkBrandTypes.GET_BRAND,
    () => getBrand(brandId)
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
    const { name, description } = dataForm;
    const formData = new FormData();
    formData.set("name", name);
    formData.set("description", description);
    const {
      data: { status, message },
    } = await updateBrand(brandId, formData);
    if (status === "BAD_REQUEST") {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.success("Cập nhật nhãn hàng thành công", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/brand");
    }
  };

  useEffect(() => {
    if (data) {
      setValue("name", data.data.name || "");
      setValue("description", data.data.description || "");
    }
  }, [data, setValue]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="titleContainer">
        <h1 className="detail-title">Chỉnh sửa nhãn hàng</h1>
        <Link to="/brand/create">
          <button className="userAddBtn">Tạo mới</button>
        </Link>
      </div>
      <div className="detail-container">
        <div className="detail-show">
          <span className="updateTitle">Chỉnh sửa</span>
          <form className="updateForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="userUpdateLeft">
              <div className="updateItem">
                <label>Tên nhãn hàng</label>
                <input
                  type="text"
                  placeholder={data.data.name}
                  className="updateInput"
                  {...register("name", { required: true })}
                />
              </div>
              <div className="updateItem">
                <label>Mô tả</label>
                <input
                  type="text"
                  placeholder="Mô tả"
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
                <button className="userUpdateButton">Đồng ý</button>
              </Grid>
              <Grid item>
                <Link to={"/brand"}>
                  <Button variant="outlined" color="error">
                    Hủy bỏ
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

export default Brand;
