import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Grid,
  Button,
} from "@mui/material";
import { createAddressByUser, createUser } from "../../../api/fetchers/user";
import { useForm } from "react-hook-form";
import "./newUser.css";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Publish } from "@material-ui/icons";
import { toast } from "react-toastify";
import { useQueryCustom } from "../../../hooks";
import {
  getDistricts,
  getProvinces,
  getWards,
} from "../../../api/fetchers/masterdataAddress";

export default function NewUser() {
  const [roleId, setRoleId] = useState(null);
  const [enableId, setEnableId] = useState(null);
  const [address, setAddress] = useState({
    province: null,
    district: null,
    ward: null,
  });
  const [dataDistrict, setDataDistrict] = useState(null);
  const [dataWard, setDataWard] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);
  const navigate = useNavigate();
  const upLoadRef = useRef();
  const ref = useRef();
  const { isLoading, data } = useQueryCustom(["PROVINCES"], getProvinces);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (address.province) {
      const fetch = async () => {
        const { data } = await getDistricts({
          province_id: address.province.ProvinceID,
        });
        setAddress({ ...address, district: null, ward: null });
        setDataDistrict(data);
      };
      fetch();
    }
  }, [address.province]);

  useEffect(() => {
    if (address.district) {
      const fetch = async () => {
        const { data } = await getWards({
          district_id: address.district.DistrictID,
        });
        setDataWard(data);
      };
      fetch();
    }
  }, [address.district]);

  const onSubmit = async (dataForm) => {
    const format =
      /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{6,}/;
    const {
      name,
      phone,
      password,
      confirm_password,
      email,
      enable,
      role_id,
      province,
      district,
      ward,
    } = dataForm;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("image", upLoadRef.current.files[0]);
    formData.append("enable", enable === "1" ? true : false);
    formData.append("role", role_id);

    if (password !== confirm_password) {
      ref.current.innerText = "Mật khẩu và xác nhận mật khẩu không khớp";
    } else if (!password.match(format)) {
      ref.current.innerText =
        "Mật khẩu phải chữa chữ cái thường, in hoa, kí tự đặc biệt, số";
    } else {
      const {
        data: { data, status },
      } = await createUser(formData);
      if (status === "BAD_REQUEST") {
        toast.error("Có lỗi");
      } else {
        const formData = new FormData();
        formData.append("apartmentNumber", "2/33");
        formData.append("province", province.ProvinceName);
        formData.append("district", district.DistrictName);
        formData.append("ward", ward.WardName);
        formData.append("codeArea", district.DistrictID);
        const { data: dataRes } = await createAddressByUser(data.id, formData);
        if (dataRes.status === "BAD_REQUEST") {
          toast.error("Có lỗi");
        } else {
          toast.success("Thêm user thành công");
          navigate("/user");
        }
      }
    }
  };

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

  if (isLoading) return;
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <div className="newUserContainer">
        <form
          if="form"
          className="newUserForm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex">
            <div className="newUserItem">
              <label>Full Name</label>
              <input
                type="text"
                className="newUserInput"
                {...register("name", { required: true })}
                placeholder="Full Name"
              />
            </div>
            <div className="newUserItem">
              <label>Email</label>
              <input
                type="email"
                className="newUserInput"
                {...register("email", { required: true })}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="flex">
            <div className="newUserItem">
              <label>Password</label>
              <input
                type="text"
                className="newUserInput"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 12,
                })}
                placeholder="Password"
              />
            </div>
            <div className="newUserItem">
              <label>Confirm Password</label>
              <input
                type="text"
                className="newUserInput"
                {...register("confirm_password", { required: true })}
                placeholder="Confirm Password"
              />
            </div>
          </div>
          <div className="flex">
            <div className="newUserItem">
              <label>Phone</label>
              <input
                type="text"
                className="newUserInput"
                {...register("phone", { required: true })}
                placeholder="Phone"
              />
            </div>
            <div className="w-94">
              <div className="newUserItem half">
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="status-select-label">Status</InputLabel>
                    <Select
                      labelId="status-select-label"
                      id="status-select"
                      label="Status"
                      size="small"
                      {...register("enable")}
                      value={enableId || ""}
                      onChange={(e) => setEnableId(e.target.value)}
                    >
                      <MenuItem value={"1"}>Active</MenuItem>
                      <MenuItem value={"0"}>Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ minWidth: 120 }}>
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
            </div>
          </div>
          <div className="newUserItem half">
            <div className="userUpdateUpload">
              {wrongImageType ? (
                <div>
                  <span style={{ fontSize: "12px", color: "red", top: "15%" }}>
                    Wrong image type.
                  </span>
                </div>
              ) : null}
              {imageUrl ? (
                <img src={imageUrl} alt="" className="userFormImg" />
              ) : null}
              <label>
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
          </div>
          {roleId === 3 ? (
            <>
              <div style={{ width: '94%'}}>
                <h4>Choose work location</h4>
                <div className="newUserItem half">
                  <Box sx={{ minWidth: 200 }}>
                    <FormControl fullWidth>
                      <InputLabel id="status-select-label">Province</InputLabel>
                      <Select
                        labelId="status-select-label"
                        id="status-select"
                        label="Status"
                        size="small"
                        {...register("province", { required: true })}
                        value={address.province || ""}
                        onChange={(e) =>
                          setAddress({ ...address, province: e.target.value })
                        }
                      >
                        {data?.data?.length > 0
                          ? data?.data?.map((province) => (
                              <MenuItem
                                key={province.ProvinceID}
                                value={province}
                              >
                                {province.ProvinceName}
                              </MenuItem>
                            ))
                          : null}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ minWidth: 200 }}>
                    <FormControl fullWidth>
                      <InputLabel id="role-select-label">District</InputLabel>
                      <Select
                        labelId="role-select-label"
                        id="role-select"
                        label="Role"
                        size="small"
                        {...register("district", { required: true })}
                        value={address.district || ""}
                        onChange={(e) =>
                          setAddress({ ...address, district: e.target.value })
                        }
                      >
                        {dataDistrict?.length > 0
                          ? dataDistrict.map((district) => (
                              <MenuItem
                                key={district.DistrictID}
                                value={district}
                              >
                                {district.DistrictName}
                              </MenuItem>
                            ))
                          : null}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ minWidth: 200 }}>
                    <FormControl fullWidth>
                      <InputLabel id="role-select-label">Ward</InputLabel>
                      <Select
                        labelId="role-select-label"
                        id="role-select"
                        label="Role"
                        size="small"
                        {...register("ward", { required: true })}
                        value={address.ward || ""}
                        onChange={(e) =>
                          setAddress({ ...address, ward: e.target.value })
                        }
                      >
                        {dataWard?.length > 0
                          ? dataWard.map((ward) => (
                              <MenuItem key={ward.WardID} value={ward}>
                                {ward.WardName}
                              </MenuItem>
                            ))
                          : null}
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              </div>
            </>
          ) : null}
          <div className="newUserItem">
            {errors.name && (
              <span className="message">Trường full name là bắt buộc</span>
            )}
            {errors.phone && (
              <span className="message">Trường phone là bắt buộc</span>
            )}
            {errors.email && (
              <span className="message">Trường email là bắt buộc</span>
            )}
            {errors.password?.type === "required" && (
              <span className="message">Trường password là bắt buộc</span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="message">Mật khẩu tối thiểu 6 kí tự.</span>
            )}
            {errors.password?.type === "maxLength" && (
              <span className="message">Mật khẩu tối đa 12 kí tự.</span>
            )}
            {errors.confirm_password && (
              <span className="message">
                Trường confirm_password là bắt buộc
              </span>
            )}
            {errors.role_id && (
              <span className="message">Trường role_id là bắt buộc</span>
            )}
            {errors.province && (
              <span className="message">Trường role_id là bắt buộc</span>
            )}
            {errors.district && (
              <span className="message">Trường role_id là bắt buộc</span>
            )}
            {errors.ward && (
              <span className="message">Trường role_id là bắt buộc</span>
            )}
            <span className="message" ref={ref}></span>
          </div>
          <Grid container spacing={2}>
            <Grid item>
              <button className="userUpdateButton">Create</button>
            </Grid>
            <Grid item>
              <Link to={"/user"}>
                <Button variant="outlined" color="error">
                  Cancel
                </Button>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}
