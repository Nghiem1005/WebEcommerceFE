import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PersonOutline,
  PersonPin,
  PhoneIphone,
  Publish,
} from "@material-ui/icons";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQueryCustom } from "../../../hooks";
import { thunkUserTypes } from "../../../constants/thunkTypes.js";
import { getUSer, updateUSer } from "../../../api/fetchers/user";
import "./user.css";
import Loader from "../../../components/Loader";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function User() {
  const [roleId, setRoleId] = useState(null);
  const [enableId, setEnableId] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);
  const { userId } = useParams();
  const upLoadRef = useRef();
  const navigate = useNavigate;
  const { isLoading, data, refetch } = useQueryCustom(
    thunkUserTypes.GET_USER,
    () => getUSer(userId)
  );

  useEffect(() => {
    refetch();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (dataForm) => {
    const { name, phone, email, enable, role_id } = dataForm;
    let formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("enable", enable === "1" ? true : false);
    formData.append("role", role_id);
    if (upLoadRef.current.files[0]) {
      formData.append("image", upLoadRef.current.files[0]);
    }
    const {
      data: { status, message },
    } = await updateUSer(userId, formData);
    if (status === "BAD_REQUEST") {
      toast.error(message);
    } else {
      toast.success("Cập nhật user thành công");
      navigate("/user");
    }
  };

  useEffect(() => {
    if (data) {
      setValue("name", data.data.name || "");
      setValue("email", data.data.email || "");
      setValue("phone", data.data.phone || "");
      setValue("enable", data.data.enable ? "1" : "0");
      setValue("role_id", data.data.role?.id);
      setValue("image", data.data.image);
      setRoleId(data.data.role?.id);
      setEnableId(data.data.enable);
      setImageUrl("http://localhost:8080/api/v1/image/user/" + data.data.image);
    }
  }, [data, setValue]);

  const uploadImage = (file) => {
    const { type } = file;
    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpg" ||
      type === "image/jpeg"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        setImageUrl(reader.result);
      };
      setWrongImageType(false);
    } else {
      setWrongImageType(true);
      setImageUrl(null);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="titleContainer">
        <h1 className="useTitle">Edit User</h1>
        <Link to="/user/create">
          <button className="userAddBtn">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            {data.data?.image ? (
              <img src={imageUrl} alt={"name"} className="userShowImg" />
            ) : (
              <img
                src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="userShowImg"
              />
            )}
            <div className="userShowTopInfo">
              <span className="userShowName">{data.data?.name}</span>
              <span className="userShowJob">{data.data?.role?.name}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowBottomInfo">
              <PersonOutline className="userShowIcon" />
              <span className="userShowInfo">{data.data?.name}</span>
            </div>
            <div className="userShowBottomInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfo">20.05.2001</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowBottomInfo">
              <PhoneIphone className="userShowIcon" />
              <span className="userShowInfo">+84 {data.data.phone}</span>
            </div>
            <div className="userShowBottomInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfo">{data.data.email}</span>
            </div>
            <div className="userShowBottomInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfo">HCM | VN</span>
            </div>
            <div className="userShowBottomInfo">
              <PersonPin className="userShowIcon" />
              <span className="userShowInfo">
                {data.data.enable ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form
            id="form"
            className="userUpdateForm"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Full name</label>
                <input
                  type="text"
                  placeholder={data.data.name}
                  className="userUpdateInput"
                  {...register("name", { required: true })}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="email"
                  placeholder={data.data.email}
                  className="userUpdateInput"
                  {...register("email", { required: true })}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder={data.data.phone}
                  className="userUpdateInput"
                  {...register("phone", { required: true })}
                />
              </div>
              <div className="userUpdateItem">
                <Box sx={{ minWidth: 60 }}>
                  <FormControl fullWidth>
                    <InputLabel id="status-select-label">Status</InputLabel>
                    <Select
                      labelId="status-select-label"
                      id="status-select"
                      label="Status"
                      size="small"
                      {...register("enable", { required: true })}
                      value={enableId || ""}
                      onChange={(e) => setEnableId(e.target.value)}
                    >
                      <MenuItem value={"1"}>Active</MenuItem>
                      <MenuItem value={"0"}>Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ minWidth: 60 }}>
                  <FormControl fullWidth>
                    <InputLabel id="role-select-label">Role</InputLabel>
                    <Select
                      labelId="role-select-label"
                      id="role-select"
                      label="Role"
                      size="small"
                      {...register("role_id", { required: true })}
                      value={roleId || ""}
                      onChange={(e) => setRoleId(e.target.value)}
                    >
                      <MenuItem value={1}>Admin</MenuItem>
                      <MenuItem value={2}>User</MenuItem>
                      <MenuItem value={3}>Shipper</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
              {errors.name && (
                <span className="message">Trường full name là bắt buộc</span>
              )}
              {errors.phone && (
                <span className="message">Trường phone là bắt buộc</span>
              )}
              {errors.email && (
                <span className="message">Trường email là bắt buộc</span>
              )}
              {errors.role_id && (
                <span className="message">Trường role_id là bắt buộc</span>
              )}
            </div>
            <div className="userFormRight">
              <div className="userUpdateUpload">
                {wrongImageType ? (
                  <div>
                    <span
                      style={{ fontSize: "12px", color: "red", top: "15%" }}
                    >
                      Wrong image type.
                    </span>
                  </div>
                ) : null}
                {imageUrl ? (
                  <img src={imageUrl} alt="" className="userFormImg" />
                ) : null}
                <label htmlFor="upload">
                  <Publish className="userUpdateIcon" />
                  <input
                    type="file"
                    multiple
                    id="upload"
                    ref={upLoadRef}
                    onChange={(e) => uploadImage(e.target.files[0])}
                  />
                </label>
              </div>
              <Grid container spacing={2}>
                <Grid item>
                  <button className="userUpdateButton">Update</button>
                </Grid>
                <Grid item>
                  <Link to={"/user"}>
                    <Button variant="outlined" color="error">
                      Cancel
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
