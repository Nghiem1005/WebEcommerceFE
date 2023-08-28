import React, { useState, useEffect } from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import useQueryCustom from "../../hooks/useQueryCustom";
import { thunkBillTypes } from "../../constants/thunkTypes";
import { getAllBillsByShipper } from "../../api/fetchers/bill";
import TableGrid from "../../components/TableGrid";
import Loader from "../../components/Loader";
import BillListDetail from "./BillListShow";
import moment from "moment";
import { useAuth } from "../../utils/authProvider";

const BillList = () => {
  const [value, setValue] = useState(0);
  const [dataTransaction, setDataTransaction] = useState(null);
  const [isShowTransaction, setIsShowTransaction] = useState(false);
  const [pageSize, setPageSize] = useState({ page: 0, size: 10 });
  const auth = useAuth();

  const {
    isLoading: isLoadingWaiting,
    data: dataWaiting,
    refetch: r1,
  } = useQueryCustom(thunkBillTypes.GETALL_BILL_WAITING, () =>
    getAllBillsByShipper(auth.user.userId)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      r1();
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const columns = [
    { field: "billId", headerName: "Order ID" },
    {
      field: "customer",
      headerName: "Customer",
      width: 200,
      renderCell: (params) => params.row.userName,
    },
    {
      field: "address",
      headerName: "Address",
      width: 350,
      renderCell: (params) => <span>{`${params.row.address}`}</span>,
    },
    {
      field: "quantity",
      headerName: "Total Product",
      width: 120,
      align: "center",
      renderCell: (params) => params.row.products.reduce((acc, value) => acc + value.quantity, 0),
    },
    {
      field: "payDate",
      headerName: "Pay date",
      align: "center",
      width: 150,
      renderCell: (params) =>
        params.row.payDate ? moment(params.row.payDate).format("ll") : null,
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      align: "center",
      width: 150,
    },
    {
      field: "status",
      headerName: "Trạng thái đơn",
      align: "center",
      width: 150,
      renderCell: (params) => (
        <span className={`status ${params.row.status}`}>{`${
          params.row.status === "checked"
            ? "Chưa nhận đơn"
            : params.row.status === "delivering"
            ? "Đang giao"
            : "Đã giao"
        }`}</span>
      ),
    },
    {
      field: "totalPrice",
      align: "center",
      headerName: "Total",
      width: 100,
    },
  ];

  const handleRowClick = (params) => {
    setDataTransaction(params.row);
    setIsShowTransaction(true);
  };

  console.log(dataWaiting);
  return (
    <>
      <div className="flex-4">
        <div className="title__section">
          <h1>Transactions</h1>
        </div>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label={`Bill List(${dataWaiting?.length})`}
                {...a11yProps(0)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {isLoadingWaiting ? (
              <Loader />
            ) : (
              <div style={{ height: 800, width: "100%" }}>
                <TableGrid
                  data={dataWaiting}
                  columns={columns}
                  onRowClick={handleRowClick}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  getRowId={(row) => row.billId}
                />
              </div>
            )}
          </TabPanel>
        </Box>
        <BillListDetail
          data={dataTransaction}
          isShowFeedback={isShowTransaction}
          setIsShowFeedback={setIsShowTransaction}
          pageSize={pageSize}
          setPageSize={setPageSize}
          r1={r1}
          shipperId={auth.user.userId}
        />
      </div>
    </>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box sx={{ p: 3 }}>
        <Typography>{children}</Typography>
      </Box>
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default BillList;
