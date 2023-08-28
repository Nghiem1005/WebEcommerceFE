import React, { useState, useEffect } from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import useQueryCustom from "../../hooks/useQueryCustom";
import { thunkBillTypes } from "../../constants/thunkTypes";
import { getBillDeliveringByShipper } from "../../api/fetchers/bill";
import TableGrid from "../../components/TableGrid";
import Loader from "../../components/Loader";
import BillDeliveredDetail from "./BillDeliveredShow";
import moment from "moment";
import { useAuth } from "../../utils/authProvider";

const BillDelivering = () => {
  const [value, setValue] = useState(0);
  const [dataTransaction, setDataTransaction] = useState(null);
  const [isShowTransaction, setIsShowTransaction] = useState(false);
  const [pageSize, setPageSize] = useState({ page: 0, size: 10 });
  const auth = useAuth()

  const {
    isLoading: isLoadingDelivering,
    data: dataDelivering,
    refetch: r1,
  } = useQueryCustom(thunkBillTypes.GETALL_BILL_WAITING, () =>
  getBillDeliveringByShipper(auth.user.userId, "deliveried")
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
      renderCell: (params) => params.row.products.length,
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
                label={`Bill Delivered(${dataDelivering?.length})`}
                {...a11yProps(0)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {isLoadingDelivering ? (
              <Loader />
            ) : (
              <div style={{ height: 800, width: "100%" }}>
                <TableGrid
                  data={dataDelivering}
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
        <BillDeliveredDetail
          data={dataTransaction}
          isShowFeedback={isShowTransaction}
          setIsShowFeedback={setIsShowTransaction}
          pageSize={pageSize}
          setPageSize={setPageSize}
          r1={r1}
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

export default BillDelivering;
