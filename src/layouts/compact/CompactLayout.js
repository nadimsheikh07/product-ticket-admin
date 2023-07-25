import PropTypes from "prop-types";
// next
import dynamic from "next/dynamic";
// @mui
import { Stack, Container, Box, Card } from "@mui/material";
// hooks
import useOffSetTop from "@/hooks/useOffSetTop";

// config
import { HEADER } from "@/utils/config-global";

//
import Header from "./Header";

// ----------------------------------------------------------------------

CompactLayout.propTypes = {
  children: PropTypes.node,
};

export default function CompactLayout({ children }) {
  return (
    <Card
      sx={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
      }}
      component="div"
    >
      <Container component="main">
        <Stack
          sx={{
            py: 0,
            m: "auto",
            maxWidth: 400,
            minHeight: "100vh",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </Stack>
      </Container>
    </Card>
  );
}
