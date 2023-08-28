import React from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import useLocationQuery from "../hooks/useLocationQuery";

const useStyle = makeStyles(() => ({
  ul: {
    justifyContent: "space-around",
  },
}));

const PaginationPage = ({ page, size, totalPage,  pageCur = "/" }) => {
  const classes = useStyle();
  const location = useLocation();
  const query = useLocationQuery();
  const numberOfPages = totalPage;
  let filterField;
  if (location.search.includes("brandId")) {
    const brandId = query.get('brandId');
    filterField = `brandId=${brandId}`;
  } else if (location.search.includes("categoryId")) {
    const categoryId = query.get('categoryId');
    filterField = `categoryId=${categoryId}`;
  } else if (location.search.includes("search")) {
    const search = query.get('search');
    filterField = `search=${search}`;
  } else {
    filterField = ``;
  }

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 0}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`${pageCur}?${filterField}&page=${item.page}&size=${size}`}
        />
      )}
    />
  );
};

export default PaginationPage;
