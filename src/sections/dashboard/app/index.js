"use client";
import { useSettingsContext } from "@/components/settings";
import axiosInstance from "@/utils/axios";
import { Person } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import React, { useState } from "react";

const AppSection = () => {
  const [user, setUser] = useState([]);
  const { themeLayout } = useSettingsContext();

  const getUsers = async (params) => {
    await axiosInstance
      .get("/admin/user/users", {
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

  return (
    <Container maxWidth>
      <Grid container spacing={{ lg: 4, md: 4, sm: 2, xs: 2 }}>
        <Grid item lg={themeLayout == "vertical" ? 6 : 3} md={3} sm={6} xs={6}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
               {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
                <Stack spacing={{ lg: 1.2, md: 1.2, sm: 1, xs: 1 }}>
                  <Typography
                    component="h4"
                    variant="h4"
                    sx={{
                      fontWeight: 500,
                      fontSize: {
                        lg: "20px",
                        md: "20px",
                        sm: "14px",
                        xs: "14px",
                      },
                    }}
                  >
                    User
                  </Typography>

                  <Typography
                    component="h2"
                    variant="h2"
                    sx={{
                      fontWeight: 700,
                      fontSize: {
                        lg: "24px",
                        md: "24px",
                        sm: "16px",
                        xs: "16px",
                      },
                    }}
                    color="primary"
                  >
                    {user?.length || 0}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AppSection;
