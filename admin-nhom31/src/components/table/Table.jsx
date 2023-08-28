import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import "./table.css";
import moment from "moment";

const TableComponents = ({ data }) => {
  return (
    <TableContainer stickyHeader aria-label="sticky table" component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.billId}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={'http://localhost:8080/api/v1/image/product/thumbnail/' + row.productThumbnail} alt="" className="image" />
                  {row.productName}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.userResponseDTO.name}</TableCell>
              <TableCell className="tableCell">{moment(row.payDate).format('ll')}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.payMethod}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponents;
