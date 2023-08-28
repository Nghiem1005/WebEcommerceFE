import React from "react";
import { Box, Drawer, Paper, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import TableGrid from "../../components/TableGrid";

const BillDeliveredDetail = ({
  data,
  isShowFeedback,
  setIsShowFeedback,
  pageSize,
  setPageSize,
  r1,
}) => {
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
              <Typography variant="h6" color="textSecondary">
                Deliveried by{" "}
                <span style={{ color: "red" }}>
                  {data?.shipperName} ({data?.shipperPhone})
                </span>
              </Typography>
            </Grid>
            <Grid item md={6}>
              <Typography variant="body2" align="right" color="textSecondary">
                Date bought
              </Typography>
              <Typography variant="body1" align="right">
                {data?.payDate}
              </Typography>
              <div
                style={{
                  position: "absolute",
                  top: "223px",
                  opacity: ".6",
                  transform: "rotate(-38deg)",
                }}
              >
                <img
                  style={{
                    width: "200px",
                  }}
                  src="https://cdn.fast.vn/tmp/20200930082333-4.PNG"
                  alt=""
                />
              </div>
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
        </Paper>
      </Box>
    </Drawer>
  );
};

export default BillDeliveredDetail;
