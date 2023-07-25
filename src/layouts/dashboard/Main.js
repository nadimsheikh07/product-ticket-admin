import PropTypes from "prop-types";
// @mui
import { Box, useTheme } from "@mui/material";
// hooks
import useResponsive from "@/hooks/useResponsive";
// config
import { HEADER, NAV } from "@/utils/config-global";
import { useSettingsContext } from "@/components/settings";
// components

// ----------------------------------------------------------------------

const SPACING = 8;

Main.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node,
};

export default function Main({ children, sx, ...other }) {
  const theme = useTheme();
  const { themeLayout } = useSettingsContext();

  const isNavHorizontal = themeLayout === "horizontal";

  const isNavMini = themeLayout === "mini";

  const isDesktop = useResponsive("up", "lg");

  if (isNavHorizontal) {
    return (
      <Box
        component="div"
        sx={{
          pt: `${HEADER.H_MOBILE + SPACING}px`,
          pb: `${HEADER.H_MOBILE + SPACING}px`,
          ...(isDesktop && {
            px: 2,
            pt: `${HEADER.H_DASHBOARD_DESKTOP + 80}px`,
            pb: `${HEADER.H_DASHBOARD_DESKTOP + SPACING}px`,
          }),
        }}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      component="div"
      sx={{
        flexGrow: 1,
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(isDesktop && {
          px: 2,
          py: `${HEADER.H_DASHBOARD_DESKTOP + SPACING}px`,
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          width: `calc(100% - ${NAV.W_DASHBOARD}px)`,
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_DASHBOARD_MINI}px)`,
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }),
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
