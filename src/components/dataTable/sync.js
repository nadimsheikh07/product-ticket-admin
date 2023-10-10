import { Box, Button, IconButton } from "@mui/material";
import React from "react";
import Iconify from "../iconify/Iconify";

export const Sync = ({ refresh }) => {
  return (
    <Box sx={{ mr: "12px" }}>
      <IconButton onClick={() => refresh()}>
        <Iconify
          icon="uiw:reload"
          sx={{ color: (theme) => theme.palette.primary.main }}
          width={20}
        />
      </IconButton>
    </Box>
  );
};
