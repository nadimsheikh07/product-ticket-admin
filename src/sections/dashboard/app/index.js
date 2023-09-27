'use client'
import { Box, Grid, useTheme } from "@mui/material";
import React, { useState } from "react";
import AppWidget from "./widget";
import axiosInstance from "@/utils/axios";
import { useSettingsContext } from "@/components/settings";

const DashboardSection = () => {
  const [user, setUser] = useState([]);
  // const [client, setClient] = useState([]);
  // const [product, setProduct] = useState([]);
  // const [ticket, setTicket] = useState([]);
  // const { themeLayout } = useSettingsContext();

  const getUsers = async (params) => {
    await axiosInstance
      .get("/api/total_count", {
        params: params,
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
        }
      })
      .catch((error) => {
        console.log("UserError", error);
      });
  };
  React.useEffect(() => {
    getUsers();
  }, []);

  const theme = useTheme();
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item md={3} sm={6} xs={12}>
          <AppWidget
            title="Total Users"
            total={user?.totalUsers}
            icon="eva:person-fill"
            // chart={{
            //   series: 48,
            // }}
          />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <AppWidget
            title="Total Clients"
            total={user?.totalClients}
            icon="octicon:person-16"
            color="info"
            // chart={{
            //   series: 75,
            // }}
          />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <AppWidget
            title="Total Products"
            total={user?.totalProducts}
            icon="icon-park-outline:ad-product"
            color="success"
            // chart={{
            //   series: 75,
            // }}
          />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <AppWidget
            title="Total Tickets"
            total={user?.totalTickets}
            icon="mdi:ticket"
            color="warning"
            // chart={{
            //   series: 75,
            // }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default DashboardSection;
