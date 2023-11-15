import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { PATH_DASHBOARD } from "@/routes/paths";
import axiosInstance from "@/utils/axios";
import { Box, Card, Container, Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const TicketDetails = () => {
  const { query } = useRouter();
  const { id } = query;

  const [detail, setDetail] = React.useState({});

  const getDetail = async () => {
    await axiosInstance
      .get(`admin/catalog/tickets/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setDetail(response?.data);
        }
      })
      .catch((error) => {
        console.log(" Ticket Error", error);
      });
  };

  useEffect(() => {
    if (id) {
      getDetail();
    }
  }, [id]);

  return (
    <>
      <Box>
        <CustomBreadcrumbs
          heading="Ticket Details"
          links={[
            {
              name: "Dashboard",
              href: PATH_DASHBOARD.app,
            },
            {
              name: "Ticket",
              href: PATH_DASHBOARD.ticket.tickets,
            },
            {
              name: "Detail",
              // href: "#",
            },
          ]}
          // action={<Button variant="contained" >Back</Button>}
        />
        <Stack spacing={2}>
          <Card variant="outlined">
            <Container>
              <Typography component="div" variant="h6" mt={3} mb={2}>
                TIcket Created Date & Time: {detail?.created_at}
              </Typography>

              {/* <Grid container spacing={2} m={2}> */}
              <Card sx={{ mb: 2 }} variant="outlined">
                <Typography component="div" variant="h6" m={3}>
                  Ticket Details
                </Typography>
                <Grid container spacing={2} m={2}>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography variant="subtitle1" component="div">
                      Product Name:
                    </Typography>
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    {detail?.name}
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography variant="subtitle1" component="div">
                      Product Code:
                    </Typography>
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    {detail?.code}
                  </Grid>
                  {/* {detail?.attributes &&
                    detail?.attributes.map((item, index) => {
                      return (
                        <>
                          <Grid item lg={3} md={3} sm={12} xs={12}>
                            <Typography variant="subtitle1" component="div">
                              Product Attribute:
                            </Typography>
                          </Grid>
                          <Grid item lg={3} md={3} sm={12} xs={12}>
                            {item?.attribute?.name}
                          </Grid>
                          <Grid item lg={3} md={3} sm={12} xs={12}>
                            <Typography variant="subtitle1" component="div">
                              Product Attribute Value:
                            </Typography>
                          </Grid>
                          <Grid item lg={3} md={3} sm={12} xs={12}>
                            {item?.value}
                          </Grid>
                        </>
                      );
                    })} */}
                </Grid>
              </Card>

             
              
            </Container>
          </Card>
        </Stack>
      </Box>
    </>
  );
};

TicketDetails.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default TicketDetails;
