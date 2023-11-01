import { Box, InputAdornment, TextField } from "@mui/material";
import React from "react";
import Iconify from "../iconify/Iconify";

const INPUT_WIDTH = 260;
export const SearchComponent = ({ filterSearch, onFilterSearch }) => {
  // const { syncData } = props;

  return (
    <Box>
      <TextField
        fullWidth
        type="search"
        value={filterSearch}
        sx={{
          maxWidth: { md: INPUT_WIDTH, sm: "100%", xs: "100%" },
        }}
        onChange={onFilterSearch}
        // onKeyDown={(e) => {
        //   if (e.key == "Enter") {
        //     syncData();
        //   }
        // }}
        placeholder="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: "text.disabled" }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};
