import React from "react";
import { Divider, Grid, Paper, Typography } from "@mui/material";

const VoucherItem = ({ data, handleClose }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 1,
        backgroundColor: "#f8ebed",
        marginBottom: "10px",
        cursor: "pointer",
      }}
      onClick={handleClose}
    >
      <Grid container>
        <Grid item>
          <img
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "6px",
              objectFit: "cover",
              marginRight: "10px",
            }}
            src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          />
        </Grid>
        <Grid item md={8} direction={"column"}>
          <Typography sx={{ fontSize: "14px" }}>
            Sinh nhật shop 4 tuổi
          </Typography>
          <Typography sx={{ color: "red", fontSize: "12px" }}>
            Giảm giá 15k
          </Typography>
          <Typography sx={{ color: "red", fontSize: "12px" }}>
            Còn lại 14 ngày
          </Typography>
          <Divider component={"p"} sx={{ margin: "4px 0 4px 0" }} />
          <Typography sx={{ color: "red", fontSize: "12px" }} align="right">
            Áp dụng
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default VoucherItem;
