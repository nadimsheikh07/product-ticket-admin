import { Dialog, DialogContent } from "@mui/material";
import React from "react";
import InstantChatSection from "./chat";

const InstantMessageBox = ({ open, handleClose, formik, data, id }) => {
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="md">
        <DialogContent>
          <form noValidate onSubmit={formik.handleSubmit}>
            <InstantChatSection ticketChat={data} formik={formik} id={id} />
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InstantMessageBox;
