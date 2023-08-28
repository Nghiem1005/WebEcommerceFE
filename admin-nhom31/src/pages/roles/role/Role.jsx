import React, { useEffect } from "react";
import { Button, Grid } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQueryCustom } from "../../../hooks";
import { thunkRoleTypes } from "../../../constants/thunkTypes";
import { getRole, updateRole } from "../../../api/fetchers/role";
import { useForm } from "react-hook-form";
import Loader from "../../../components/Loader";
import "./roleDetail.css";
import { toast } from "react-toastify";

const Role = () => {
  const { roleId } = useParams();
  const navigate = useNavigate();
  const { isLoading, data, refetch } = useQueryCustom(
    thunkRoleTypes.GET_ROLE,
    () => getRole(roleId)
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
    const {
      data: { status, message },
    } = await updateRole(roleId, dataForm);
    if (status === "BAD_REQUEST") {
      toast.error(message);
    } else {
      toast.success("Cập nhật role thành công");
      navigate("/role");
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
    <div className="user">
      <div className="titleContainer">
        <h1 className="detail-title">Edit Role</h1>
        <Link to="/role/create">
          <button className="userAddBtn">Create</button>
        </Link>
      </div>
      <div className="detail-container">
        <div className="detail-show">
          <span className="updateTitle">Edit</span>
          <form className="updateForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="userUpdateLeft">
              <div className="updateItem">
                <label>Role Name</label>
                <input
                  type="text"
                  placeholder={data.data.name}
                  className="updateInput"
                  {...register("name", { required: true })}
                />
              </div>
              <div className="updateItem">
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Dep"
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
                <button className="userUpdateButton">Update</button>
              </Grid>
              <Grid item>
                <Link to={"/role"}>
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

export default Role;
