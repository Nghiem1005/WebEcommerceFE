import { Publish } from "@material-ui/icons";
import { Link, useNavigate} from "react-router-dom";
import { Box, InputLabel, MenuItem, Select, FormControl, Grid, Button } from "@mui/material";
import "./newProduct.css";
import { useState, useRef } from "react";
import { createProduct } from "../../../api/fetchers/product";
import { getAllCategories } from "../../../api/fetchers/category";
import { getAllBrands } from "../../../api/fetchers/brand";
import { useQueryCustom } from "../../../hooks";
import {
  thunkBrandTypes,
  thunkCategoryTypes,
} from "../../../constants/thunkTypes";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function NewProduct() {
  const upLoadThumbnailRef = useRef();
  const upLoadImagesRef = useRef();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState({
    thumbnail: null,
    arrayImages: [],
  });
  const [wrongImageType, setWrongImageType] = useState({
    thumbnail: false,
    arrayImages: false,
  });

  const { isLoading: isLoadingCategory, data: category } = useQueryCustom(
    thunkCategoryTypes.GETALL_CATEGORY,
    () => getAllCategories({ size: 6, page: 0 })
  );

  const { isLoading: isLoadingBrand, data: brand } = useQueryCustom(
    thunkBrandTypes.GETALL_BRAND,
    () => getAllBrands({ size: 6, page: 0 })
  );

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const {
      name,
      amount,
      standCost,
      description,
      category,
      brand,
    } = data;
    const formData = new FormData();
    formData.set("name", name);
    formData.set("amount", amount);
    formData.set("standCost", standCost);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("brand", brand);
    if (upLoadThumbnailRef.current.files[0]) {
      formData.append("thumbnail", upLoadThumbnailRef.current.files[0]);
    }
    if(upLoadImagesRef.current.files) {
      for(let i of upLoadImagesRef.current.files) {
        formData.append("images", i);
      }
    }
    const {
      data: { status, message },
    } = await createProduct(formData);
    if (status === "BAD_REQUEST") {
      toast.error(message);
    } else {
      toast.success('Thêm sản phẩm thành công');
      navigate('/product')
    }
  };

  const uploadImageThumbnail = (file) => {
    setImageUrl({ ...imageUrl, thumbnail: null });
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
        setImageUrl({ ...imageUrl, thumbnail: reader.result });
      };
      setWrongImageType({ ...wrongImageType, thumbnail: false });
    } else {
      setWrongImageType({ ...wrongImageType, thumbnail: true });
      setImageUrl({ ...imageUrl, thumbnail: null });
    }
  };

  const uploadImageImages = (files) => {
    setImageUrl((prev) => ({...prev, arrayImages: []}));
    Object.values(files).forEach((image) => {
      if (
        image.type === "image/png" ||
        image.type === "image/svg" ||
        image.type === "image/jpg" ||
        image.type === "image/jpeg"
      ) {
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = function () {
          setImageUrl((prev) => ({ ...prev, arrayImages: [...prev.arrayImages, reader.result] }));
        };
        setWrongImageType({ ...wrongImageType, arrayImages: false });
      } else {
        setWrongImageType({ ...wrongImageType, arrayImages: true });
        setImageUrl((prev) => ({...prev, arrayImages: []}));
        return;
      }
    });
  };

  if (isLoadingCategory || isLoadingBrand) {
    return;
  }

  return (
    <div className="newUser">
          <h1 className="newProductTitle">New Product</h1>
          <div className="newUserContainer">
            <form className="newUserForm" onSubmit={handleSubmit(onSubmit)}>
              <div className="newProductItem">
                <label>Product Name</label>
                <input
                  type="text"
                  className="newProductInput"
                  placeholder="Product Name"
                  {...register("name", { required: true })}
                />
              </div>
              <div className="newProductItem">
                <label>Price</label>
                <div>
                  <input
                    type="number"
                    className="newProductInput"
                    placeholder="Price"
                    {...register("standCost", {
                      required: true,
                      min: { value: 1 },
                    })}
                  />
                  <span>
                    VND <span>(Currency)</span>
                  </span>
                </div>
              </div>
              <div className="newProductItem">
                <label>Amount</label>
                <input
                  type="number"
                  className="newProductInput"
                  placeholder="Amount"
                  {...register("amount", {
                    required: true,
                    min: { value: 1 },
                  })}
                />
              </div>
              <div className="newProductItem">
                <label>Description</label>
                <input
                  type="text"
                  className="newProductInput"
                  placeholder="Description"
                  {...register("description")}
                />
              </div>
              <div className="newProductItem">
                <Box sx={{ minWidth: 60 }}>
                  <FormControl fullWidth>
                    <InputLabel id="brand-select-label">Brand</InputLabel>
                    <Select
                      labelId="brand-select-label"
                      id="brand-select"
                      value={getValues("brand")}
                      label="Brand"
                      {...register("brand", { required: true })}
                    >
                      {brand.data.map((brand) => (
                        <MenuItem key={brand.id} value={brand.id}>
                          {brand.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ minWidth: 60 }}>
                  <FormControl fullWidth>
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select
                      labelId="category-select-label"
                      id="category-select"
                      value={getValues("category")}
                      label="Category"
                      {...register("category", { required: true })}
                    >
                      {category.data.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <div className="newProductItem">
                <span>Thumbnail</span>
                <div className="image-layout">
                  {wrongImageType.thumbnail ? (
                    <div>
                      <span
                        style={{ fontSize: "12px", color: "red", top: "15%" }}
                      >
                        Wrong image type.
                      </span>
                    </div>
                  ) : null}
                  {imageUrl.thumbnail ? (
                    <img
                      src={imageUrl.thumbnail}
                      alt=""
                      className="userFormImg"
                    />
                  ) : null}
                  <label>
                    <Publish className="userUpdateIcon" />
                    <input type="file" ref={upLoadThumbnailRef} onChange={(e) => uploadImageThumbnail(e.target.files[0])} />
                  </label>
                </div>
              </div>
              <div className="newProductItem">
                <span>Images Product</span>
                <div className="image-layout">
                  {wrongImageType.arrayImages ? (
                    <div>
                      <span
                        style={{ fontSize: "12px", color: "red", top: "15%" }}
                      >
                        Wrong image type.
                      </span>
                    </div>
                  ) : null}
                  {imageUrl.arrayImages
                    ? imageUrl.arrayImages.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt=""
                          className="userFormImg"
                        />
                      ))
                    : null}
                  <label>
                    <Publish className="userUpdateIcon" />
                    <input type="file" ref={upLoadImagesRef} multiple onChange={(e) => uploadImageImages(e.target.files)} />
                  </label>
                </div>
              </div>
              <div className="newProductItem">
                {errors.name && (
                  <span className="message">Trường name là bắt buộc</span>
                )}
                {errors.standCost && (
                  <span className="message">Trường price là bắt buộc</span>
                )}
                {errors.amount && (
                  <span className="message">Trường amount là bắt buộc</span>
                )}
                {errors.standCost?.type === "min" && (
                  <span className="message">Giá phải lớn hơn 0. </span>
                )}
                {errors.amount?.type === "min" && (
                  <span className="message">Số lượng phải lớn hơn 0.</span>
                )}
                {errors.brand && (
                  <span className="message">Trường brand là bắt buộc</span>
                )}
                {errors.category && (
                  <span className="message">Trường category là bắt buộc</span>
                )}
              </div>
              <Grid container spacing={2}>
              <Grid item>
                <button className="userUpdateButton" style={{ width: '100%'}}>Create</button>
              </Grid>
              <Grid item>
                <Link to={"/product"}>
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
