"use client";
import PropTypes from "prop-types";
import { useState } from "react";
// @mui
import { Box } from "@mui/material";
// hooks
// auth
// components
//
import Main from "./Main";
import Header from "./header";
import NavVertical from "./nav/NavVertical";
import { useSettingsContext } from "@/components/settings";
import NavHorizontal from "./nav/NavHorizontal";
import NavMini from "./nav/NavMini";
import useResponsive from "@/hooks/useResponsive";
import AuthGuard from "@/auth/AuthGuard";
import useMenu from "@/hooks/useMenu";

// ----------------------------------------------------------------------

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default function DashboardLayout({ children }) {
  const { themeLayout } = useSettingsContext();
  const isDesktop = useResponsive("up", "lg");
  const [open, setOpen] = useState(false);
  const { navConfigMenu } = useMenu();

  console.log("navConfigMenu", navConfigMenu);

  const isNavHorizontal = themeLayout === "horizontal";

  const isNavMini = themeLayout === "mini";

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const renderNavVertical = (
    <NavVertical
      openNav={open}
      onCloseNav={handleClose}
      navConfig={navConfigMenu}
    />
  );
  const renderContent = () => {
    if (isNavHorizontal) {
      return (
        <>
          <Header onOpenNav={handleOpen} />

          {isDesktop ? (
            <NavHorizontal navConfig={navConfigMenu} />
          ) : (
            renderNavVertical
          )}

          <Main>{children}</Main>
        </>
      );
    }

    if (isNavMini) {
      return (
        <>
          <Header onOpenNav={handleOpen} />

          <Box
            sx={{
              display: { lg: "flex" },
              minHeight: { lg: 1 },
            }}
          >
            {isDesktop ? (
              <NavMini isNavMini={isNavMini} navConfig={navConfigMenu} />
            ) : (
              renderNavVertical
            )}

            <Main>{children}</Main>
          </Box>
        </>
      );
    }

    return (
      <>
        <Header onOpenNav={handleOpen} />

        <Box
          sx={{
            display: { lg: "flex" },
            minHeight: { lg: 1 },
          }}
        >
          {renderNavVertical}

          <Main>{children}</Main>
        </Box>
      </>
    );
  };
  return <AuthGuard>{renderContent()}</AuthGuard>;
  // return <>{renderContent()}</>;
}
