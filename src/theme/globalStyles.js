// @mui
import useResponsive from "@/hooks/useResponsive";
import { GlobalStyles as MUIGlobalStyles, useTheme } from "@mui/material";

// ----------------------------------------------------------------------

export default function GlobalStyles() {
  const theme = useTheme();
  const isMobile = useResponsive("down", "md");

  const styledGridToolbarContainer = {
    ".MuiDataGrid-panel": {
      inset: "-305px auto auto 20px !important",
      ".MuiDataGrid-filterForm": {
        flexDirection: "column",
        gap: "15px",
        minWidth: "100%",
        maxHeight: "100%",
        padding: "12px !important",
        paddingBottom: "20px !important",
        paddingRight: "20px !important",
        ".MuiFormControl-root": {
          width: "auto!important",
        },
        ".MuiIconButton-root": {
          alignSelf: "end",
        },
        ".MuiInput-root": {
          ".MuiInput-input": {
            option: {
              background: "lightgray!important",
              padding: "0px !important",
              fontSize: "12px !important",
              width: "10px !important",
              height: "100% !important",

              minWidth: "10px !important",
              minHeight: "100% !important",

              maxWidth: "10px !important",
              maxHeight: "100% !important",
            },
          },
        },
      },
    },
  };

  const inputGlobalStyles = (
    <MUIGlobalStyles
      styles={{
        "*": {
          boxSizing: "border-box",
        },
        html: {
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100%",
          WebkitOverflowScrolling: "touch",
        },
        body: {
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100%",
        },
        "#__next": {
          width: "100%",
          height: "100%",
        },
        input: {
          "&[type=number]": {
            MozAppearance: "textfield",
            "&::-webkit-outer-spin-button": {
              margin: 0,
              WebkitAppearance: "none",
            },
            "&::-webkit-inner-spin-button": {
              margin: 0,
              WebkitAppearance: "none",
            },
          },
        },
        img: {
          display: "block",
          maxWidth: "100%",
        },
        ul: {
          margin: 0,
          padding: 0,
        },
        ...(isMobile && styledGridToolbarContainer),
      }}
    />
  );

  return inputGlobalStyles;
}
