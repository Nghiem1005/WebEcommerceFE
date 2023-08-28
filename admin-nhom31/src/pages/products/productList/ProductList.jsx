import { BorderColorOutlined, DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQueryCustom } from "../../../hooks";
import { thunkProductTypes } from "../../../constants/thunkTypes";
import { getAllProducts, deleteProduct } from "../../../api/fetchers/product";
import "./productList.css";
import { Rating } from "@mui/material";
import Loader from "../../../components/Loader";
import TableGrid from "../../../components/TableGrid";
import { toast } from "react-toastify";

export default function ProductList() {
  const [pageSize, setPageSize] = useState({ page: 0, size: 20 });
  const { isLoading, data, refetch } = useQueryCustom(
    thunkProductTypes.GETALL_PRODUCT,
    () => getAllProducts({ ...pageSize, size: 100 })
  );

  useEffect(() => {
    refetch();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="productListProduct">
            <img
              className="productListImg"
              src={
                "http://localhost:8080/api/v1/image/product/thumbnail/" +
                params.row.thumbnail
              }
              alt=""
            />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "standCost",
      headerName: "Stand Cost",
      width: 140,
    },
    {
      field: "discountPro",
      headerName: "Discount",
      width: 140,
      renderCell: (params) => params.row.discount.percent,
    },
    {
      field: "priceDiscount",
      headerName: "Price Discount",
      width: 140,
      renderCell: (params) =>
        (
          params.row.standCost -
          params.row.standCost * params.row.discount.percent
        ).toFixed(2),
    },
    {
      field: "vote",
      headerName: "Vote",
      width: 160,
      renderCell: (params) => {
        return (
          <Rating
            name="half-rating"
            defaultValue={params.row.vote}
            precision={0.5}
            readOnly
          />
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id}>
              <BorderColorOutlined className="button-edit" />
            </Link>
            <DeleteOutline
              className="button-delete"
              onClick={() => handleDelete(params)}
            />
          </>
        );
      },
    },
  ];

  const handleDelete = async (params) => {
    const response = await deleteProduct(params.row.id);
    if (response?.data?.status === "OK") {
      toast.success("Xóa sản phẩm thành công");
      refetch();
    } else {
      toast.error("Có lỗi");
    }
  };

  const handleRowClick = (params) => {
    // setDataFeedback(params.row);
    // setIsShowFeedback(true);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="container">
        <div className="title__section titleContainer">
          <h1>Products</h1>
          <Link to="/product/create">
            <button className="addBtn">Create</button>
          </Link>
        </div>
        <TableGrid
          data={data.data.list}
          columns={columns}
          pageSize={pageSize}
          setPageSize={setPageSize}
          onRowClick={handleRowClick}
        />
      </div>
    </>
  );
}
