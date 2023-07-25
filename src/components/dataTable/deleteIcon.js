import { Badge, Box, IconButton } from "@mui/material";
import React from "react";
import Iconify from "../iconify/Iconify";

export const DeleteIcon = ({ handleOpenConfirm, selectionModel }) => {
  return (
    <Box>
      <IconButton color="error" onClick={handleOpenConfirm}>
        <Badge badgeContent={selectionModel.length} color="primary">
          <Iconify icon="eva:trash-2-outline" width={22} />
        </Badge>
      </IconButton>
    </Box>
  );
};
