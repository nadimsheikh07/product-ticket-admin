// @mui
import { Stack, Box } from "@mui/material";
// config
import { NAV } from "@/utils/config-global";
// utils
import { hideScrollbarX } from "@/utils/cssStyles";
// components
import Logo from "@/components/logo/Logo";
import { NavSectionMini } from "@/components/nav-section";
//
import NavToggleButton from "./NavToggleButton";

// ----------------------------------------------------------------------

export default function NavMini({ isNavMini, navConfig = [] }) {
  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: !isNavMini ? NAV.W_DASHBOARD : NAV.W_DASHBOARD_MINI },
        transition: (theme) =>
          theme.transitions.create("width", {
            duration: theme.transitions.duration.standard,
          }),
      }}
    >
      <NavToggleButton
        sx={{
          top: 22,
          left: NAV.W_DASHBOARD_MINI - 12,
        }}
      />

      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: "fixed",
          width: !isNavMini ? NAV.W_DASHBOARD : NAV.W_DASHBOARD_MINI,
          transition: (theme) =>
            theme.transitions.create("width", {
              duration: theme.transitions.duration.standard,
            }),
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...hideScrollbarX,
        }}
      >
        <Logo sx={{ mx: "auto", my: 2 }} />

        <NavSectionMini data={navConfig} />
      </Stack>
    </Box>
  );
}
