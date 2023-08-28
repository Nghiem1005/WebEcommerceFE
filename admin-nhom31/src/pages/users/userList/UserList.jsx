import "./userList.css";
import { useState, useEffect } from "react";
import { BorderColorOutlined, DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useQueryCustom } from "../../../hooks";
import { thunkUserTypes } from "../../../constants/thunkTypes.js";
import { getAllUSers, deleteUser } from "../../../api/fetchers/user";
import Loader from "../../../components/Loader";
import TableGrid from "../../../components/TableGrid";
import { toast } from "react-toastify";

export default function UserList() {
  const [pageSize, setPageSize] = useState({ page: 0, size: 5 });
  const { isLoading, data, refetch } = useQueryCustom(
    thunkUserTypes.GETALL_USER,
    () => getAllUSers({ ...pageSize, size: 100 })
  );

  useEffect(() => {
    refetch();
  }, []);

  const columns = [
    { field: "id", headerName: "Id", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={"http://localhost:8080/api/v1/image/user" + params.row.image}
              alt=""
            />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 200 },
    {
      field: "enable",
      headerName: "Status",
      align: "center",
      width: 120,
      renderCell: (params) => {
        return params.row.enable ? (
          <span className="status active">
            <p>Active</p>
          </span>
        ) : (
          <div className="status inactive">Inactive</div>
        );
      },
    },
    {
      field: "role",
      headerName: "Role",
      width: 160,
      renderCell: (params) => <span>{params.row?.role?.name}</span>,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
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
    const response = await deleteUser(params.row.id);
    if (response?.data?.status === "OK") {
      toast.success("Xóa user thành công");
      refetch();
    } else {
      toast.error("Có lỗi");
    }
  };

  const handleRowClick = (params) => {
    // setDataFeedback(params.row);
    // setIsShowFeedback(true);
  };

  if (isLoading) return <Loader />;
  return (
    <>
      <div className="container">
        <div className="title__section titleContainer">
          <h1>Users</h1>
          <Link to="/user/create">
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
