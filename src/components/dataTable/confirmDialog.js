import { Button } from "@mui/material";
import React from "react";
import ConfirmDialog from "../confirm-dialog/ConfirmDialog";

export const ConfirmDialogBox = ({
  selected,
  handleDeleteRows,
  handleCloseConfirm,
  openConfirm,
}) => {
  return (
    <ConfirmDialog
      open={openConfirm}
      onClose={handleCloseConfirm}
      title="Delete"
      content={
        <>
          Are you sure want to delete <strong> {selected.length} </strong>{" "}
          items?
        </>
      }
      action={
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            handleDeleteRows();
          }}
        >
          Delete
        </Button>
      }
    />
  );
};
