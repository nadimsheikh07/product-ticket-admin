import { Box, Button } from "@mui/material";
import React from "react";
import Iconify from "../iconify/Iconify";

export const Clear = ({ onResetFilter }) => {
  return (
    <Box>
      <Button
        color="error"
        sx={{
          flexShrink: 0,
          color: (theme) => `${theme.palette.error.main}!important`,
        }}
        onClick={onResetFilter}
        startIcon={<Iconify icon="eva:trash-2-outline" />}
      >
        Clear
      </Button>
    </Box>
  );
};
