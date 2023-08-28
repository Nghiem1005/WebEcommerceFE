import { Publish } from "@material-ui/icons";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  getProduct,
  updateProduct,
  getSaleProduct,
} from "../../../api/fetchers/product";
import { getAllCategories } from "../../../api/fetchers/category";
import { getAllBrands } from "../../../api/fetchers/brand";
import Chart from "../../../components/chart/Chart";
import {
  thunkBrandTypes,
  thunkCategoryTypes,
  thunkProductTypes,
} from "../../../constants/thunkTypes";
import { useQueryCustom } from "../../../hooks";
import Loader from "../../../components/Loader";
import "./product.css";
import { toast } from "react-toastify";
import { Button, Grid } from "@mui/material";

export default function Product() {
  const [imageUrl, setImageUrl] = useState({
    thumbnail: null,
    arrayImages: [],
  });
  const [wrongImageType, setWrongImageType] = useState({
    thumbnail: false,
    arrayImages: false,
  });
  const { productId } = useParams();
  const upLoadThumbnailRef = useRef();
  const upLoadImagesRef = useRef();
  const navigate = useNavigate();
  const {
    isLoading: isLoadingProduct,
    data: product,
    refetch: r1,
  } = useQueryCustom(thunkProductTypes.GET_PRODUCT, () =>
    getProduct(productId)
  );

  const {
    isLoading: isLoadingCategory,
    data: category,
    refetch: r2,
  } = useQueryCustom(thunkCategoryTypes.GETALL_CATEGORY, () =>
    getAllCategories({ size: 6, page: 0 })
  );

  const {
    isLoading: isLoadingBrand,
    data: brand,
    refetch: r3,
  } = useQueryCustom(thunkBrandTypes.GETALL_BRAND, () =>
    getAllBrands({ size: 6, page: 0 })
  );

  const {
    isLoading: isLoadingProductSale,
    data: dataProductSale,
    refetch: r4,
  } = useQueryCustom(thunkProductTypes.GET_PRODUCT_SALE, () =>
    getSaleProduct(productId)
  );

  useEffect(() => {
    r1();
    r2();
    r3();
    r4();
  }, []);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, amount, standCost, description, category, brand } = data;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("amount", amount);
    formData.append("standCost", standCost);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("brand", brand);
    if (upLoadThumbnailRef.current.files.length > 0) {
      formData.append("thumbnail", upLoadThumbnailRef.current.files[0]);
    }
    if (upLoadImagesRef.current.files.length > 0) {
      for (let i of upLoadImagesRef.current.files) {
        formData.append("images", i);
      }
    }
    const {
      data: { status, message },
    } = await updateProduct(productId, formData);
    if (status === "BAD_REQUEST") {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.success("Cập nhật sản phẩm thành công", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/product");
    }
  };

  useEffect(() => {
    if (product) {
      setValue("name", product.data.name || "");
      setValue("amount", product.data.amount || "");
      setValue("standCost", product.data.standCost || "");
      setValue("description", product.data.description || "");
      setValue("category", product.data.categoryId || null);
      setValue("brand", product.data.brandId || null);
      setValue("thumbnail", product.data.thumbnail || "");
      setValue("images", product.data.images || []);
      setImageUrl({
        thumbnail:
          "http://localhost:8080/api/v1/image/product/thumbnail/" +
          product.data.thumbnail,
        arrayImages: product.data.images.map(
          (image) => "http://localhost:8080/api/v1/image/product/" + image
        ),
      });
    }
  }, [product, setValue]);

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
    setImageUrl((prev) => ({ ...prev, arrayImages: [] }));
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
          setImageUrl((prev) => ({
            ...prev,
            arrayImages: [...prev.arrayImages, reader.result],
          }));
        };
        setWrongImageType({ ...wrongImageType, arrayImages: false });
      } else {
        setWrongImageType({ ...wrongImageType, arrayImages: true });
        setImageUrl((prev) => ({ ...prev, arrayImages: [] }));
        return;
      }
    });
  };

  if (
    isLoadingProduct ||
    isLoadingCategory ||
    isLoadingBrand ||
    isLoadingProductSale
  ) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/product/create">
          <button className="productAddBtn">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart
            title="Sales Performance (2 weeks nearest)"
            dataKey="value"
            data={dataProductSale.data}
          />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            {product.data.thumbnail ? (
              <img
                src={
                  "http://localhost:8080/api/v1/image/product/thumbnail/" +
                  product.data.thumbnail
                }
                alt={product.data.name}
                className="productInfoImg"
              />
            ) : (
              <img
                src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="productInfoImg"
              />
            )}
            <span className="productName">{product.data.name}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id: </span>
              <span className="productInfoValue">{product.data.id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Brand: </span>
              <span className="productInfoValue">{product.data.brand}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Price: </span>
              <span className="productInfoValue">{product.data.standCost}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales: </span>
              <span className="productInfoValue">5123</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <span className="productUpdateTitle">Update </span>
        <form
          id="form"
          encType="multipart/form-data"
          className="productUpdateForm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="productUpdateLeft">
            <div className="productUpdateItem">
              <label>Product Name</label>
              <input
                type="text"
                placeholder={product.data.name}
                className="productUpdateInput"
                {...register("name", { required: true })}
              />
            </div>
            <div className="productUpdateItem">
              <label>Price</label>
              <input
                type="number"
                placeholder={product.data.standCost}
                className="productUpdateInput"
                {...register("standCost", {
                  required: true,
                  min: { value: 1 },
                })}
              />
            </div>
            <div className="productUpdateItem">
              <label>Amount</label>
              <input
                type="number"
                placeholder={product.data.standCost}
                className="productUpdateInput"
                {...register("amount", {
                  required: true,
                  min: { value: 1 },
                })}
              />
            </div>
            <label>Brand: </label>
            <select
              id="active"
              defaultValue={getValues("brand")}
              {...register("brand", { required: true })}
            >
              {brand.data.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
            <label>Category: </label>
            <select
              id="active"
              defaultValue={getValues("category")}
              {...register("category", { required: true })}
            >
              {category.data.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="productUpdateItem">
              <label>Description</label>
              <input
                type="text"
                placeholder={product.data.description}
                className="productUpdateInput"
                {...register("description")}
              />
            </div>
            {errors.name && (
              <span className="message">Trường name là bắt buộc</span>
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
          <div className="productFormRight">
            <div className="productUpdateUpload">
              <span>Thumbnail</span>
              {wrongImageType.thumbnail ? (
                <div>
                  <span style={{ fontSize: "12px", color: "red", top: "15%" }}>
                    Wrong image type.
                  </span>
                </div>
              ) : null}
              {imageUrl.thumbnail ? (
                <img src={imageUrl.thumbnail} alt="" className="userFormImg" />
              ) : null}
              <label>
                <Publish className="userUpdateIcon" />
                <input
                  type="file"
                  ref={upLoadThumbnailRef}
                  onChange={(e) => uploadImageThumbnail(e.target.files[0])}
                />
              </label>
            </div>
            <div className="productUpdateUpload">
              <span>Images Product</span>
              <div>
              {wrongImageType.arrayImages ? (
                <div>
                  <span style={{ fontSize: "12px", color: "red", top: "15%" }}>
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
                <input
                  id="i"
                  type="file"
                  ref={upLoadImagesRef}
                  multiple
                  onChange={(e) => uploadImageImages(e.target.files)}
                />
              </label>
              </div>
            </div>
            <Grid container spacing={2}>
              <Grid item>
                <button className="userUpdateButton">Đồng ý</button>
              </Grid>
              <Grid item>
                <Link to={"/product"}>
                  <Button variant="outlined" color="error">
                    Hủy bỏ
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
    </div>
  );
}
