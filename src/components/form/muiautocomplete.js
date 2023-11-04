import { Autocomplete, Box, Stack, TextField } from "@mui/material";
import React from "react";

const Muiautocomplete = () => {
  const data = [
    {
      name: "John Doe",
      age: 30,
    },
  ];
  return (
    <>
      <Stack spacing={2} sx={{ width: 300 }}>
        <Autocomplete
          label="Movie"
          disablePortal
          id="combo-box-demo"
          
          options={data?.name}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </>
  );
};
export default Muiautocomplete;
