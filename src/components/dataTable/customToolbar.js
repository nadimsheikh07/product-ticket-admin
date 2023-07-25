import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import React from "react";
import { DateComponent } from "./date";
import { SearchComponent } from "./search";
import { Clear } from "./clear";
import { Box, Stack } from "@mui/material";
import { DeleteIcon } from "./deleteIcon";
// import { CustomGridToolbarFilterButton } from "./dataStyle";

export const CustomToolbar = ({
  isColumnButton = true,
  isFilterButton = true,
  isDensitySelector = true,
  isDate = true,
  isSearch = true,
  isClear = true,
  filterEndDate,
  filterStartDate,
  onFilterEndDate,
  onFilterStartDate,
  filterSearch,
  onFilterSearch,
  onResetFilter,
  handleOpenConfirm,
  selectionModel,
}) => {
  return (
    <GridToolbarContainer
      sx={{
        background: (theme) => theme.palette.grey[200],
        flexWrap: "nowrap",
        display: { md: "flex", sm: "grid", xs: "grid" },
        // gap: "10px",
        justifyContent: "space-between",
      }}
    >
      {/* <Stack
        direction="row"
        justifyContent={{ lg: "left", md: "left", sm: "center", xs: "center" }}
      >
        {isColumnButton && (
          <Box sx={{ position: "relative" }}>
            {" "}
            <GridToolbarColumnsButton />
          </Box>
        )}
        {isFilterButton && (
          <Box sx={{ position: "relative" }}>
            {" "}
            <GridToolbarFilterButton />{" "}
          </Box>
        )}
        {isDensitySelector && (
          <Box sx={{ position: "relative" }}>
            <GridToolbarDensitySelector />
          </Box>
        )}
      </Stack>
      {isDate && (
        <DateComponent
          filterEndDate={filterEndDate}
          filterStartDate={filterStartDate}
          onFilterEndDate={onFilterEndDate}
          onFilterStartDate={onFilterStartDate}
        />
      )} */}
      {isSearch && (
        <SearchComponent
          filterSearch={filterSearch}
          onFilterSearch={onFilterSearch}
        />
      )}
      <Stack
        direction="row"
        justifyContent={{
          lg: "end",
          md: "end",
          sm: "space-between",
          xs: "space-between",
        }}
        width={{ lg: "auto", md: "auto", sm: "100%", xs: "100%" }}
      >
        {((isClear && filterSearch) || filterEndDate || filterStartDate) && (
          <Clear onResetFilter={onResetFilter} />
        )}
        {selectionModel.length > 0 && (
          <DeleteIcon
            handleOpenConfirm={handleOpenConfirm}
            selectionModel={selectionModel}
          />
        )}
      </Stack>
    </GridToolbarContainer>
  );
};
