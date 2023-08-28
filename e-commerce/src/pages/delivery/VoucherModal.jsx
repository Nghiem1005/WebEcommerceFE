import React from "react";
import { Box, Modal } from "@mui/material";
import VoucherItem from "../../components/voucherItem/VoucherItem";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "6px",
  p: 3,
};

const VoucherModal = ({ open, setOpen, setVoucher }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style }}>
        <VoucherItem data={{}} handleClose={handleClose}/>
        <VoucherItem data={{}} handleClose={handleClose}/>
        <VoucherItem data={{}} handleClose={handleClose}/>
        <VoucherItem data={{}} handleClose={handleClose}/>
      </Box>
    </Modal>
  );
};

export default VoucherModal;
