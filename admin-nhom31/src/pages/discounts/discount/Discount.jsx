import React, { useEffect, useState, useRef } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Loader from "../../../components/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQueryCustom } from "../../../hooks";
import { getDiscount, updateDiscount } from "../../../api/fetchers/discount";
import { thunkDiscountTypes } from "../../../constants/thunkTypes";
import { useForm } from "react-hook-form";
import moment from "moment";
import { toast } from "react-toastify";

const Discount = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { discountId } = useParams();
  const navigate = useNavigate();
  const ref = useRef();
  const { isLoading, data, refetch } = useQueryCustom(
    thunkDiscountTypes.GET_DISCOUNT,
    () => getDiscount(discountId)
  );
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    refetch();
  }, []);

  const onSubmit = async (dataForm) => {
    const { title, description, percent, startDate, endDate } = dataForm;
    const formData = new FormData();
    const checkDate = moment(getValues("endDate")).diff(
      getValues("startDate"),
      "days"
    );
    if (checkDate < 0) {
      ref.current.innerText = "Ngày bắt đầu không được vượt quá ngày kết thúc";
    } else {
      formData.set("title", title);
      formData.set("code", data.data.code);
      formData.set("description", description);
      formData.set("percent", Number(percent));
      formData.set("startDate", startDate);
      formData.set("endDate", endDate);
      const {
        data: { status, message },
      } = await updateDiscount(discountId, formData);
      if (status === "BAD_REQUEST") {
        toast.error('Có lỗi');
      } else {
        toast.success("Cập nhật mã giảm giá thành công");
        navigate("/discount");
      }
    }
  };

  useEffect(() => {
    if (data) {
      setValue("title", data.data.title || "");
      setValue("description", data.data.description || "");
      setValue("percent", data.data.percent || null);
      setValue("code", data.data.code || "");
      setValue("startDate", data.data.startDate || "");
      setValue("endDate", data.data.endDate || "");
      setStartDate(data.data.startDate);
      setEndDate(data.data.endDate);
    }
  }, [data, setValue]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="titleContainer">
        <h1 className="detail-title">Edit Discount</h1>
        <Link to="/discount/create">
          <button className="userAddBtn">Create</button>
        </Link>
      </div>
      <div className="detail-container">
        <div className="detail-show">
          <span className="updateTitle">Edit</span>
          <form className="updateForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="userUpdateLeft">
              <div className="updateItem">
                <label>Code</label>
                <input
                  type="text"
                  placeholder={data.data.code || "Code"}
                  className="updateInput"
                  disabled
                  {...register("code", { required: true })}
                />
              </div>
              <div className="updateItem">
                <label>Percent</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder={data.data.percent || "Percent"}
                  className="updateInput"
                  {...register("percent", {
                    required: true,
                    min: { value: 1 },
                  })}
                />
              </div>
              <div className="updateItem">
                <label>Title</label>
                <input
                  type="text"
                  placeholder={data.data.title || "Title"}
                  className="updateInput"
                  {...register("title", { required: true })}
                />
              </div>
              <div className="updateItem">
                <label>Description</label>
                <input
                  type="text"
                  placeholder={data.data.description || "Description"}
                  className="updateInput"
                  {...register("description")}
                />
              </div>
              <div className="updateItem" style={{ width: "250px" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => {
                      setStartDate(newValue);
                    }}
                    renderInput={(params) => {
                      setValue("startDate", params.inputProps.value);
                      return <TextField {...params} />;
                    }}
                  />
                </LocalizationProvider>
              </div>
              <div className="updateItem" style={{ width: "250px" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => {
                      setEndDate(newValue);
                    }}
                    renderInput={(params) => {
                      setValue("endDate", params.inputProps.value);
                      return <TextField {...params} />;
                    }}
                  />
                </LocalizationProvider>
              </div>
              <div className="updateItem">
                <span className="message" ref={ref}></span>
                {errors.title && (
                  <span className="message">Trường title là bắt buộc</span>
                )}
                {errors.percent?.type === "min" && (
                  <span className="message">
                    Trường discount phải lớn hơn 1(%)
                  </span>
                )}
                {errors.percent && (
                  <span className="message">Trường percent là bắt buộc</span>
                )}
                {errors.code && (
                  <span className="message">Trường code là bắt buộc</span>
                )}
              </div>
            </div>
            <Grid container spacing={2} style={{ marginTop: "6px" }}>
              <Grid item>
                <button className="userUpdateButton">Update</button>
              </Grid>
              <Grid item>
                <Link to={"/discount"}>
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

export default Discount;
