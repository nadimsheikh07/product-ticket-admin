import { styled } from "@mui/material";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

export const CustomGridToolbarFilterButton = styled(GridToolbarFilterButton)(
  ({ theme }) => ({
    inset: "-305px auto auto 60px",
    "& .MuiDataGrid-filterForm": {
      display: "flex",
      flexDirection: "column",
      "& .MuiFormControl-root": {
        width: "100%",
        "& .MuiIconButton-root": {
          alignSelf: "end",
        },
      },
    },
  })
);
