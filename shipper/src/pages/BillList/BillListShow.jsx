import React from "react";
import { Box, Drawer, Paper, Typography, Grid, Button } from "@mui/material";
import TableGrid from "../../components/TableGrid";
import { updateBillStatus } from "../../api/fetchers/bill";
import { toast } from "react-toastify";
import { useRef } from "react";

const BillListDetail = ({
  data,
  isShowFeedback,
  setIsShowFeedback,
  pageSize,
  setPageSize,
  r1,
  shipperId,
}) => {
  const ref = useRef();
  const columns = [
    {
      field: "name",
      headerName: "Product",
      width: 150,
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
      field: "quantity",
      headerName: "Quantity",
      align: "center",
      type: "number",
      width: 120,
    },
    {
      field: "price",
      headerName: "Unit Price",
      type: "number",
      width: 120,
    },
    {
      field: "discount",
      headerName: "Discount",
      type: "number",
      width: 120,
    },
    {
      field: "pricePayed",
      headerName: "Total",
      type: "number",
      width: 120,
    },
  ];

  const onUpdate = async (bill) => {
    const { data } = await updateBillStatus(bill.deliveryId, {
      status: "delivering",
      shipperId: shipperId,
      billId: bill.billId,
    });

    if (data.status !== "OK") {
      setIsShowFeedback(false);
      toast.error("Có lỗi");
    } else {
      setIsShowFeedback(false);
      toast.success("Nhận đơn thành công");
      ref.current.style.display = "none";
      r1();
    }
  };

  const onUpdateDelivered = async (bill) => {
    const { data } = await updateBillStatus(bill.deliveryId, {
      status: "deliveried",
      shipperId: shipperId,
      billId: bill.billId,
      payDate: Date.now(),
      billStatus: "paid",
    });
    if (data.status !== "OK") {
      setIsShowFeedback(false);
      toast.error("Có lỗi");
    } else {
      toast.success("Xác nhận đã giao đơn thành công");
      setIsShowFeedback(false);
      r1();
    }
  };

  return (
    <Drawer
      open={isShowFeedback}
      anchor="right"
      onClose={() => setIsShowFeedback(!isShowFeedback)}
      modal
      sx={{ zIndex: 100000 }}
    >
      <Box className="show" role="presentation">
        <Paper
          elevation={0}
          sx={{ flex: 1, mx: "auto", width: "100%", p: 2, mt: 3 }}
        >
          <Typography variant="h5">Transaction Customer</Typography>
          <Typography variant="h5" color="textSecondary">
            Order Transaction #{data?.billId}{" "}
          </Typography>
          <Grid container>
            <Grid item md={6}>
              <Typography variant="body2" color="textSecondary">
                Customer Information
              </Typography>
              <Typography variant="body1">{data?.customer}</Typography>
              <Typography variant="body1">{data?.address}</Typography>
              <br />
              <Typography variant="body2" color="textSecondary">
                Total Price
                <Typography variant="body1">
                  {data?.totalPrice} VND (bought by {data?.paymentMethod})
                </Typography>
              </Typography>
            </Grid>
            <Grid item md={6}>
              <Typography variant="body2" align="right" color="textSecondary">
                Date bought
              </Typography>
              <Typography variant="body1" align="right">
                {data?.payDate}
              </Typography>
              {data?.status === "deliveried" ? (
                <div className="posi">
                  <img
                    style={{
                      width: "200px",
                    }}
                    src="https://cdn.fast.vn/tmp/20200930082333-4.PNG"
                    alt=""
                  />
                </div>
              ) : null}
            </Grid>
          </Grid>
          <Box sx={{ mt: "60px" }}></Box>
          <Typography variant="h6">Products</Typography>
          {data?.products?.length > 0 ? (
            <TableGrid
              data={data.products}
              columns={columns}
              setPageSize={{ ...setPageSize, size: 5 }}
              pageSize={pageSize}
            />
          ) : null}
          <br />
          <br />
          <Grid container ref={ref}>
            {data?.status === "checked" ? (
              <>
                <Grid item md={6}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => onUpdate(data)}
                  >
                    Delivery
                  </Button>
                  <span style={{ marginRight: "10px" }}></span>
                </Grid>
              </>
            ) : data?.status === "delivering" ? (
              <Grid item md={6}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => onUpdateDelivered(data)}
                >
                  Delivered Success
                </Button>
                <span style={{ marginRight: "10px" }}></span>
              </Grid>
            ) : null}
          </Grid>
        </Paper>
      </Box>
    </Drawer>
  );
};

export default BillListDetail;
