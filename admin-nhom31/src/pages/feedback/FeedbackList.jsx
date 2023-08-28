import React, { useState, useEffect } from "react";
import { Rating } from "@mui/material";
import FeedbackDetail from "./FeedbackDetail";
import { useQueryCustom } from "../../hooks";
import { thunkFeedbackTypes } from "../../constants/thunkTypes.js";
import { getAllFeedbacks } from "../../api/fetchers/feedback";
import "./feedback.css";
import TableGrid from "../../components/TableGrid";
import Loader from "../../components/Loader";

const FeedbackList = () => {
  const [dataFeedback, setDataFeedback] = useState(null);
  const [isShowFeedback, setIsShowFeedback] = useState(false);
  const [pageSize, setPageSize] = useState({ page: 0, size: 5 });

  const { isLoading, data, refetch } = useQueryCustom(
    thunkFeedbackTypes.GETALL_FEEDBACK,
    () => getAllFeedbacks({ ...pageSize, size: 100 })
  );

  useEffect(() => {
    refetch();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "userName",
      headerName: "User Name",
      width: 150,
    },
    {
      field: "product",
      headerName: "Feedback Product",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="productListProduct">
            <img
              className="productListImg"
              src={
                "http://localhost:8080/api/v1/image/product/thumbnail/" +
                params.row.productThumbnail
              }
              alt=""
            />
            {params.row.productName}
          </div>
        );
      },
    },
    {
      field: "start_date",
      headerName: "Start date",
      width: 120,
    },
    {
      field: "update_date",
      headerName: "Update date",
      width: 120,
    },
    {
      field: "vote",
      headerName: "Rating",
      width: 150,
      renderCell: (params) => {
        return (
          <Rating
            name="half-rating"
            defaultValue={params.row.vote}
            precision={0.5}
            readOnly
          />
        );
      },
    },
    {
      field: "content",
      headerName: "Content",
      width: 300,
    },
  ];

  const handleRowClick = (params) => {
    setDataFeedback(params.row);
    setIsShowFeedback(true);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="container">
        <div className="title__section">
          <h1>Feedbacks</h1>
        </div>
        <div>
          <TableGrid
            data={data.data.list}
            columns={columns}
            pageSize={pageSize}
            setPageSize={setPageSize}
            onRowClick={handleRowClick}
          />
        </div>
      </div>
      <FeedbackDetail
        data={dataFeedback}
        isShowFeedback={isShowFeedback}
        setIsShowFeedback={setIsShowFeedback}
      />
    </>
  );
};

export default FeedbackList;
