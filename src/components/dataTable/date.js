import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Box, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const INPUT_WIDTH = 160;
export const DateComponent = ({
  filterStartDate,
  onFilterStartDate,
  filterEndDate,
  onFilterEndDate,
}) => {
  return (
    <>
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{
              width: { md: "auto", sm: "100%!important", xs: "100%!important" },
            }}
            label="Start date"
            value={filterStartDate}
            onChange={(newValue) => onFilterStartDate(newValue)}
            renderInput={(params) => (
              <TextField
                size="small"
                {...params}
                fullWidth
                sx={{
                  maxWidth: { md: INPUT_WIDTH, sm: "100%", xs: "100%" },
                }}
                format="DD-MM-YYYY"
                inputFormat="DD/MM/YYYY"
                views={["day", "month", "year"]}
              />
            )}
          />
        </LocalizationProvider>
      </Box>
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{
              width: { md: "auto", sm: "100%!important", xs: "100%!important" },
            }}
            label="End date"
            value={filterEndDate}
            onChange={(newValue) => onFilterEndDate(newValue)}
            renderInput={(params) => (
              <TextField
                size="small"
                {...params}
                fullWidth={true}
                sx={{
                  maxWidth: { md: INPUT_WIDTH, sm: "100%", xs: "100%" },
                }}
              />
            )}
          />
        </LocalizationProvider>
      </Box>
    </>
  );
};
