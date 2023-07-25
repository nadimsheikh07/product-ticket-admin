"use client";
import PropTypes from "prop-types";
// @mui
import { Typography, Stack } from "@mui/material";
// components
import Image from "next/image";
//
import {
  StyledRoot,
  StyledSectionBg,
  StyledSection,
  StyledContent,
} from "./styles";

// ----------------------------------------------------------------------

LoginLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  illustration: PropTypes.string,
};

export default function LoginLayout({ children, illustration, title }) {
  return (
    <StyledRoot>
      <StyledSection>
        <Typography
          variant="h3"
          sx={{ mb: 10, maxWidth: 480, textAlign: "center" }}
        >
          {title || "Hi, Welcome back"}
        </Typography>

        <Image
          disabledEffect
          visibleByDefault
          alt="auth"
          src={
            illustration || "/assets/illustrations/illustration_dashboard.png"
          }
          sx={{ maxWidth: 720, width: "100%", height: "100%" }}
          width={677}
          height={508}
        />

        <StyledSectionBg />
      </StyledSection>

      <StyledContent>
        <Stack sx={{ width: 1 }}> {children} </Stack>
      </StyledContent>
    </StyledRoot>
  );
}
