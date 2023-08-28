import { BorderColorOutlined, DeleteOutline } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { thunkDiscountTypes } from "../../../constants/thunkTypes";
import { useQueryCustom } from "../../../hooks";
import {
  getAllDiscounts,
  deleteDiscount,
} from "../../../api/fetchers/discount";
import "../../brands/brandList/brand.css";
import Loader from "../../../components/Loader";
import TableGrid from "../../../components/TableGrid";
import { toast } from "react-toastify";

const DiscountList = () => {
  const [pageSize, setPageSize] = useState({ page: 0, size: 5 });
  const { isLoading, data, refetch } = useQueryCustom(
    thunkDiscountTypes.GETALL_DISCOUNT,
    () => getAllDiscounts({ ...pageSize, size: 100 })
  );

  useEffect(() => {
    refetch();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "code",
      headerName: "Code",
      width: 120,
    },
    {
      field: "title",
      headerName: "Title",
      width: 200,
    },
    {
      field: "description",
      headerName: "Description",
      width: 160,
    },
    {
      field: "percent",
      headerName: "Percent",
      width: 120,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 120,
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/discount/" + params.row.id}>
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
    const response = await deleteDiscount(params.row.id);
    if (response?.data?.status === "OK") {
      toast.success("Xóa mã giảm giá thành công");
      refetch();
    } else {
      toast.error("Có lỗi");
    }
  };

  if (isLoading) return <Loader />;
  return (
    <>
      <div className="container">
        <div className="title__section titleContainer">
          <h1>Discount</h1>
          <Link to="/discount/create">
            <button className="addBtn">Create</button>
          </Link>
        </div>
        <TableGrid
          data={data.data.list}
          columns={columns}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </div>
    </>
  );
};

export default DiscountList;
