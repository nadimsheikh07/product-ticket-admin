import { Container } from "@mui/material";
import React from "react";
import { useSettingsContext } from "../settings";

export const ContainerComponent = ({ children }) => {
  const { themeStretch } = useSettingsContext();
  return (
    <Container maxWidth={themeStretch ? false : "lg"}>{children}</Container>
  );
};
