import PropTypes from "prop-types";
import { useEffect } from "react";
// next
import { usePathname } from "next/navigation";
// @mui
import { Box, Stack, Drawer } from "@mui/material";
// hooks
import useResponsive from "@/hooks/useResponsive";
// config
import { NAV } from "@/utils/config-global";
// components
import Logo from "@/components/logo/Logo";
import Scrollbar from "@/components/scrollbar/Scrollbar";
import { NavSectionVertical } from "@/components/nav-section";
//
import navConfig from "./config-navigation";
import NavAccount from "./NavAccount";
import NavToggleButton from "./NavToggleButton";

// ----------------------------------------------------------------------

NavVertical.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function NavVertical({ isNavMini, openNav, onCloseNav }) {
  const pathname = usePathname();

  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
        }}
      >
        <Logo />

        <NavAccount />
      </Stack>

      <NavSectionVertical data={navConfig} />
    </Scrollbar>
  );
  console.log("openNav", openNav, isNavMini);
  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_DASHBOARD },
      }}
    >
      <NavToggleButton />

      {isDesktop ? (
        <Drawer
          open
          variant="persistent"
          sx={{
            flexShrink: 0,
          }}
          PaperProps={{
            sx: {
              width: NAV.W_DASHBOARD,
              zIndex: 1,
              bgcolor: "transparent",
              borderRightStyle: "dashed",
              transition: (theme) =>
                theme.transitions.create("width", {
                  duration: theme.transitions.duration.standard,
                }),
              ...(isNavMini && {
                width: NAV.W_DASHBOARD_MINI,
              }),
            },
          }}
        >
          <Scrollbar
            sx={{
              height: 1,
              "& .simplebar-content": {
                height: 1,
                display: "flex",
                flexDirection: "column",
              },
            }}
          >
            {renderContent}
          </Scrollbar>
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: NAV.W_DASHBOARD,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
