import React, { useState, useEffect } from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import useQueryCustom from "../../hooks/useQueryCustom";
import { thunkBillTypes } from "../../constants/thunkTypes";
import { getAllBillsByStatus } from "../../api/fetchers/bill";
import TableGrid from "../../components/TableGrid";
import Loader from "../../components/Loader";
import TransactionDetail from "./TransactionShow";
import moment from "moment";

const TransactionList = () => {
  const [value, setValue] = useState(0);
  const [dataTransaction, setDataTransaction] = useState(null);
  const [isShowTransaction, setIsShowTransaction] = useState(false);
  const [pageSize, setPageSize] = useState({ page: 0, size: 10 });

  const {
    isLoading: isLoadingWaiting,
    data: dataWaiting,
    refetch: r1,
  } = useQueryCustom(thunkBillTypes.GETALL_BILL_WAITING, () =>
    getAllBillsByStatus("waiting")
  );
  const {
    isLoading: isLoadingChecked,
    data: dataChecked,
    refetch: r2,
  } = useQueryCustom(thunkBillTypes.GETALL_BILL_CHECKED, () =>
    getAllBillsByStatus("checked")
  );
  const {
    isLoading: isLoadingDelivering,
    data: dataDelivering,
    refetch: r3,
  } = useQueryCustom(thunkBillTypes.GETALL_BILL_DELIVERING, () =>
    getAllBillsByStatus("delivering")
  );
  const {
    isLoading: isLoadingDelivered,
    data: dataDelivered,
    refetch: r4,
  } = useQueryCustom(thunkBillTypes.GETALL_BILL_DELIVERED, () =>
    getAllBillsByStatus("deliveried")
  );
  const {
    isLoading: isLoadingCancel,
    data: dataCancel,
    refetch: r5,
  } = useQueryCustom(thunkBillTypes.GETALL_BILL_CANCEL, () =>
    getAllBillsByStatus("cancel")
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      r1();
      r2();
      r3();
      r4();
      r5();
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
      renderCell: (params) => (
        <Link to={"/user/" + params.row.userId}>{params.row.customer}</Link>
      ),
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
              variant="scrollable"
              scrollButtons={false}
              aria-label="scrollable prevent tabs example"
            >
              <Tab
                label={`Waiting Order(${dataWaiting?.length})`}
                {...a11yProps(0)}
              />
              <Tab
                label={`Checked(${dataChecked?.length})`}
                {...a11yProps(1)}
              />
              <Tab
                label={`Delivering(${dataDelivering?.length})`}
                {...a11yProps(2)}
              />
              <Tab
                label={`Delivered(${dataDelivered?.length})`}
                {...a11yProps(3)}
              />
              <Tab label={`Cancel(${dataCancel?.length})`} {...a11yProps(4)} />
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
          <TabPanel value={value} index={1}>
            {isLoadingChecked ? (
              <Loader />
            ) : (
              <div style={{ height: 600, width: "100%" }}>
                <TableGrid
                  data={dataChecked}
                  columns={columns}
                  onRowClick={handleRowClick}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  getRowId={(row) => row.billId}
                />
              </div>
            )}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {isLoadingDelivering ? (
              <Loader />
            ) : (
              <div style={{ height: 600, width: "100%" }}>
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
          <TabPanel value={value} index={3}>
            {isLoadingDelivered ? (
              <Loader />
            ) : (
              <div style={{ height: 600, width: "100%" }}>
                <TableGrid
                  data={dataDelivered}
                  columns={columns}
                  onRowClick={handleRowClick}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  getRowId={(row) => row.billId}
                />
              </div>
            )}
          </TabPanel>
          <TabPanel value={value} index={4}>
            {isLoadingCancel ? (
              <Loader />
            ) : (
              <div style={{ height: 600, width: "100%" }}>
                <TableGrid
                  data={dataCancel}
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
        <TransactionDetail
          data={dataTransaction}
          isShowFeedback={isShowTransaction}
          setIsShowFeedback={setIsShowTransaction}
          pageSize={pageSize}
          setPageSize={setPageSize}
          r1={r1}
          r2={r2}
          r3={r5}
          r4={r4}
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

export default TransactionList;
