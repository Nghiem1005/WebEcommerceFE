import TableGrid from "../../../components/TableGrid";
import { BorderColorOutlined, DeleteOutline } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllRoles, deleteRole } from "../../../api/fetchers/role";
import { useQueryCustom } from "../../../hooks";
import { thunkRoleTypes } from "../../../constants/thunkTypes";
import "./role.css";
import Loader from "../../../components/Loader";

const RoleList = () => {
  const [pageSize, setPageSize] = useState({ page: 0, size: 5 });
  const { isLoading, data, refetch } = useQueryCustom(
    thunkRoleTypes.GETALL_ROLE,
    () => getAllRoles({ ...pageSize, size: 100 })
  );

  useEffect(() => {
    refetch();
  }, []);

  const handleDelete = async (id) => {
    await deleteRole(id);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Role Name",
      width: 300,
    },
    {
      field: "description",
      headerName: "Description",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/role/" + params.row.id}>
            <BorderColorOutlined className="button-edit"/>
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

  if (isLoading) return <Loader />;

  return (
    <div className="flex-4">
      <div className="title__section titleContainer">
        <h1>Roles</h1>
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

export default RoleList;
