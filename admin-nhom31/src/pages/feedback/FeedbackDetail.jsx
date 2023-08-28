import React from "react";
import {
  Box,
  Drawer,
  Paper,
  Typography,
  Grid,
  Rating,
} from "@mui/material";
import { Link } from "react-router-dom";
import moment from "moment";

const FeedbackDetail = ({ data, isShowFeedback, setIsShowFeedback }) => {
  return (
    <Drawer
      open={isShowFeedback}
      anchor="right"
      onClose={() => setIsShowFeedback(!isShowFeedback)}
      modal
      sx={{ zIndex: 100000 }}
    >
      <Box className="show" role="presentation">
        <Paper elevation={0} sx={{ flex: 1, mx: "auto", width: "100%", p: 2, mt: 3 }}>
          <Typography variant="h5">Đánh giá từ khách hàng</Typography>
          <Grid container>
            <Grid item md={6} >
              <Typography variant="body2" color="textSecondary">
                Thông tin khách hàng
              </Typography>
              <Link to={'/user/' + data?.user}>
              <Typography variant="body1">{data?.userName}</Typography>
              <Typography variant="body1">hieuddeu@gmail.com</Typography>
              </Link>
            </Grid>
            <Grid item md={6}>
              <Typography variant="body2" align="right" color="textSecondary">
                Feedback
              </Typography>
              <Typography variant="body1" align="right">
                <Rating
                  name="half-rating"
                  defaultValue={data?.vote}
                  precision={0.5}
                  readOnly
                />
              </Typography>
              <Typography variant="body1" align="right">
                {data?.update_date}
              </Typography>
            </Grid>
          </Grid>
            <Box sx={{ mt: '60px'}}></Box>
            <Typography variant="h6">Sản phẩm</Typography>
            <Link to={'/product/' + data?.product}>
            <Box style={{ display: 'flex', alignItems: 'center'}}> 
              <img style={{ height: '100px', width: '100px'}} src={`http://localhost:8080/api/v1/image/product/thumbnail/${data?.productThumbnail}` || 'https://shikimart.vn/wp-content/uploads/woocommerce-placeholder-600x600.png?v=1593231130'} alt='' />
              <span style={{ marginLeft: '20px', fontSize: '16px', color: '#000'}}>{data?.productName}</span>
            </Box>
            </Link>
            <Box sx={{ mt: '60px'}}></Box>
            <Typography variant="h6">Nội dung</Typography>
            <Typography variant="body2" color="textSecondary">Chỉnh sửa lần cuối ({data?.createDate || moment(Date.now()).format('ll')})</Typography>
            <Typography>
              {data?.content}
            </Typography>
        </Paper>
      </Box>
    </Drawer>
  );
};

export default FeedbackDetail;
