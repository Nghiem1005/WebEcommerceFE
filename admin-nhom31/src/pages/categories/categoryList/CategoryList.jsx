import { BorderColorOutlined, DeleteOutline } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getAllCategories,
  deleteCategory,
} from "../../../api/fetchers/category.js";
import { useQueryCustom } from "../../../hooks";
import "./category.css";
import { thunkCategoryTypes } from "../../../constants/thunkTypes";
import Loader from "../../../components/Loader.jsx";
import TableGrid from "../../../components/TableGrid";
import { toast } from "react-toastify";


const CategoryList = () => {
  const [pageSize, setPageSize] = useState({ page: 0, size: 5 });
  const { isLoading, data, refetch } = useQueryCustom(
    thunkCategoryTypes.GETALL_CATEGORY,
    () => getAllCategories({ ...pageSize, size: 100 })
  );

  useEffect(() => {
    refetch();
  }, []);


  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Category Name",
      width: 300,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/category/" + params.row.id}>
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
    const response = await deleteCategory(params.row.id);
    if (response?.data?.status === "OK") {
      toast.success("Xóa loại sản phẩm thành công");
      refetch();
    } else {
      toast.error("Có lỗi");
    }
  };
  if (isLoading) return <Loader />;
  return (
    <div className="container">
      <div className="title__section titleContainer">
        <h1>Categories</h1>
        <Link to="/category/create">
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

export default CategoryList;
