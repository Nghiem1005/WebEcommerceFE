import React from "react";
import { Box, Drawer, Paper, Typography, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import TableGrid from "../../components/TableGrid";
import { updateBillStatus } from "../../api/fetchers/bill";
import { toast } from "react-toastify";
import { useRef } from "react";

const BillDeliveringDetail = ({
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
      status: 'deliveried',
      shipperId: shipperId,
      billId: bill.billId,
      payDate: Date.now(),
      billStatus: 'paid'
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

  // const onDelete = async (bill) => {
  //   const { data } = await updateBillStatus(bill.billId, {
  //     status: "delivering",
  //     payDate: null,
  //     paymentMethod: bill.paymentMethod,
  //   });

  //   if (data.status !== "OK") {
  //     toast.error("Có lỗi", {
  //       position: toast.POSITION.TOP_CENTER,
  //     });
  //   } else {
  //     toast.success("Hủy đơn thành công", {
  //       position: toast.POSITION.TOP_CENTER,
  //     });
  //     setIsShowFeedback(false);
  //     ref.current.style.display = "none";
  //     r1();
  //   }
  // };

  return (
    <Drawer
      open={isShowFeedback}
      anchor="right"
      onClose={() => setIsShowFeedback(!isShowFeedback)}
      modal
      sx={{ zIndex: 100000 }}
    >
      <Box sx={{ width: 700 }} role="presentation">
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
              <Link to={"/user/" + data?.user}>
                <Typography variant="body1">{data?.userName}</Typography>
              </Link>
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
            <Grid item md={6}>
              <Button
                variant="contained"
                color="success"
                onClick={() => onUpdate(data)}
              >
                Delivered Success
              </Button>
              <span style={{ marginRight: "10px" }}></span>
              {/* <Button
                    variant="outlined"
                    color="error"
                    onClick={() => onDelete(data)}
                  >
                    Cancel
                  </Button> */}
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Drawer>
  );
};

export default BillDeliveringDetail;
