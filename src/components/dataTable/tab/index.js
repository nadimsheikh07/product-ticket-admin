import { Box, Tab, Tabs } from "@mui/material";
import React from "react";

export const TabComponent = (props) => {
  const { TAB_OPTIONS = [], filterStatus, handleFilterStatus, title } = props;

  return (
    <Box>
      <Tabs
        value={filterStatus}
        onChange={handleFilterStatus}
        sx={{
          px: 2,
          pb: 1,
        }}
      >
        {TAB_OPTIONS.map((tab, index) => (
          <Tab key={`${title}-${index}`} label={tab.label} value={tab?.value} />
        ))}
      </Tabs>
    </Box>
  );
};
