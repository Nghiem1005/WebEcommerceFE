import React from "react";
import { createRole } from "../../../api/fetchers/role.js";
import { Button, Grid } from "@mui/material";
import "../role/roleDetail.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const CreateRole = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (dataForm) => {
    const {
      data: { status, message },
    } = await createRole(dataForm);
    if (status === "BAD_REQUEST") {
      toast.error(message);
    } else {
      toast.success("Thêm role thành công");
      navigate("/role");
    }
  };

  return (
    <div className="user">
      <div className="titleContainer">
        <h1 className="detail-title">Create Role</h1>
      </div>
      <div className="detail-container">
        <div className="detail-show">
          <span className="updateTitle">Create</span>
          <form className="updateForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="userUpdateLeft">
              <div className="updateItem">
                <label>Role Name</label>
                <input
                  type="text"
                  placeholder="Role Name"
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

export default CreateRole;
