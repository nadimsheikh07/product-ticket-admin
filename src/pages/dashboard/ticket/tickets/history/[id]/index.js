import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import { PATH_DASHBOARD } from "@/routes/paths";
import TicketTimeline from "@/sections/dashboard/ticket/tickets/ticketTimeline";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/router";
import { enqueueSnackbar } from "notistack";

const TicketHistory = () => {
  const { query } = useRouter();
  const { id } = query;
  const [histories, setHistories] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [totalHistory, setTotalHistory] = React.useState(0);
  const [ticketDetail, setTicketDetail] = React.useState({});

  const getTicketHistories = async () => {
    await axiosInstance
      .get(`admin/catalog/ticket_histories`, {
        params: { page: page, pageSize: pageSize, ticket_id: id },
      })
      .then((response) => {
        if (response.status === 200) {
          setHistories(response?.data?.data);
          setTotalHistory(response?.data?.total);
        }
      })
      .catch((error) => {
        console.log("Ticket History Error", error);
      });
  };
  const getTicketDetail = async () => {
    await axiosInstance
      .get(`admin/catalog/tickets/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setTicketDetail(response?.data);
        }
      })
      .catch((error) => {
        console.log("Ticket Detail Error", error);
      });
  };

  useEffect(() => {
    if (id) {
      getTicketDetail();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getTicketHistories();
    }
  }, [id, page, pageSize]);

  console.log("ticketDetail", ticketDetail);

  return (
    <>
      <Box>
        <CustomBreadcrumbs
          heading="Ticket History"
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
              name: "History",
              // href: "#",
            },
          ]}
          // action={<Button variant="contained" >Back</Button>}
        />
        <Stack spacing={2}>
          <Card>
            <Container>
              <Typography variant="h5" component="h5" m={2}>
                {/* {histories[0]?.detail}  */}
                <Typography>
                  Ticket Created Date & Time: {histories[0]?.created_at}
                </Typography>
              </Typography>

              <Grid container spacing={2} m={2}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography>
                    Client Email: {ticketDetail?.client?.email}
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography>
                    Client Mobile No. {ticketDetail?.client?.phone}
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography>
                    Company Email: {ticketDetail?.company?.email}
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography>
                    Company Mobile No. {ticketDetail?.company?.phone_number}
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography>
                    Ticekt Assign To : {ticketDetail?.user?.name}
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography>
                    Product Name: {ticketDetail?.product?.name}{" "}
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography>
                    Product Code: {ticketDetail?.product?.code}{" "}
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </Card>
          <Card>
            <CardContent>
              <TicketTimeline total={totalHistory} histories={histories} />
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </>
  );
};

TicketHistory.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default TicketHistory;
