"use client";
import { Box, Container, Grid, useTheme } from "@mui/material";
import React, { useState } from "react";
import AppWidget from "./widget";
import axiosInstance from "@/utils/axios";

const DashboardSection = () => {
  const [user, setUser] = useState([]);

  const getUsers = async () => {
    await axiosInstance
      .get("/api/total_count")
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
    <Container>
      <Grid container spacing={2}>
        <Grid item md={3} sm={6} xs={12}>
          <AppWidget
            title="Total Admin"
            total={user?.totalAdmin}
            icon="eva:person-fill"
            // chart={{
            //   series: 48,
            // }}
          />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <AppWidget
            title="Total Company"
            total={user?.totalCompany}
            icon="mdi:company"
            color="info"
            // chart={{
            //   series: 75,
            // }}
          />
        </Grid>
         <Grid item md={3} sm={6} xs={12}>
          <AppWidget
            title="Total Company Employee"
            total={user?.totalEmployee}
            icon="clarity:employee-solid"
            color="info"
            // chart={{
            //   series: 75,
            // }}
          />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <AppWidget
            title="Total Clients"
            total={user?.totalClients}
            icon="material-symbols:person"
            color="error"
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
        <Grid item md={3} sm={6} xs={12}>
          <AppWidget
            title="Total Open Tickets"
            total={user?.openTicketCount}
            icon="lets-icons:ticket-duotone"
            color="primary"
            // chart={{
            //   series: 75,
            // }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
export default DashboardSection;
