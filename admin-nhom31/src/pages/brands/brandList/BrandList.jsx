import { BorderColorOutlined, DeleteOutline } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllBrands, deleteBrand } from "../../../api/fetchers/brand";
import { useQueryCustom } from "../../../hooks";
import { thunkBrandTypes } from "../../../constants/thunkTypes";
import "./brand.css";
import TableGrid from "../../../components/TableGrid";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";

const BrandList = () => {
  const [pageSize, setPageSize] = useState({ page: 0, size: 5 });
  const { isLoading, data, refetch } = useQueryCustom(
    thunkBrandTypes.GETALL_BRAND,
    () => getAllBrands({ ...pageSize, size: 100 })
  );

  useEffect(() => {
    refetch();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Tên Thương hiệu",
      width: 300,
    },
    {
      field: "description",
      headerName: "Mô tả",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/brand/" + params.row.id}>
              <BorderColorOutlined className="button-edit" />
            </Link>
            <DeleteOutline
              className="brandListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  const handleDelete = async (params) => {
    const response = await deleteBrand(params.row.id);
    if (response?.data?.status === "OK") {
      toast.success("Xóa nhãn hàng thành công");
      refetch();
    } else {
      toast.error("Có lỗi");
    }
  };
  if (isLoading) return <Loader />;
  return (
    <div className="container">
      <div className="title__section titleContainer">
        <h1>Brands</h1>
        <Link to="/brand/create">
          <button className="addBtn">Create</button>
        </Link>
      </div>
      <div>
        <TableGrid
          data={data.data}
          columns={columns}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  );
};

export default BrandList;
