import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import { PATH_DASHBOARD } from "@/routes/paths";
import TicketTimeline from "@/sections/dashboard/ticket/tickets/ticketTimeline";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/router";
// import { enqueueSnackbar } from "notistack";
import Iconify from "@/components/iconify";
import TicketComment from "../../comment";

const TicketHistory = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { query } = useRouter();
  const { id } = query;
  const [histories, setHistories] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [totalHistory, setTotalHistory] = React.useState(0);
  const [ticketDetail, setTicketDetail] = React.useState({});

  const getTicketComment = async () => {
    await axiosInstance
      .get(`admin/ticket_comment/ticket_comments`, {
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
      getTicketComment();
    }
  }, [id, page, pageSize]);

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
          <Card variant="outlined">
            <Container>
              <Stack
                justifyContent="center"
                spacing={60}
                direction="row"
                mt={2}
              >
                <Typography component="div" variant="h6" mt={3} mb={2}>
                  Ticket Created Date & Time: {ticketDetail?.created_at}
                </Typography>
                <Button
                  size="large"
                  onClick={handleClickOpen}
                  sx={{ width: "60px", height: "60px" }}
                >
                  Add Comment
                  {/* <Iconify icon="carbon:task" width={35}/> */}
                </Button>
              </Stack>
              {/* <Grid container spacing={2} m={2}> */}
              <Card sx={{ mb: 2 }} variant="outlined">
                <Typography component="p" variant="h6" m={3}>
                  Client Information
                </Typography>
                <Grid container spacing={2} m={2}>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography variant="subtitle1" component="div">
                      Client Email:
                    </Typography>
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    {ticketDetail?.client?.email}
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography variant="subtitle1" component="div">
                      Client Mobile No.
                    </Typography>
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    {ticketDetail?.client?.phone}
                  </Grid>
                </Grid>
              </Card>

              <Card sx={{ mb: 2 }} variant="outlined">
                <Typography component="p" variant="h6" m={3}>
                  Company Information
                </Typography>
                <Grid container spacing={2} m={2}>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography variant="subtitle1" component="div">
                      Company Email:
                    </Typography>
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    {ticketDetail?.company?.email}
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography variant="subtitle1" component="div">
                      Company Mobile No.
                    </Typography>
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    {ticketDetail?.company?.phone_number}
                  </Grid>
                </Grid>
              </Card>

              <Card sx={{ mb: 5 }} variant="outlined">
                <Typography component="p" variant="h6" m={3}>
                  Assign & Product Information
                </Typography>
                <Grid container spacing={2} m={2}>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography variant="subtitle1" component="div">
                      Ticekt Assign To :
                    </Typography>
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    {ticketDetail?.user?.name}
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography variant="subtitle1" component="div">
                      Ticekt Assign To :
                    </Typography>
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    {ticketDetail?.user?.email}
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography variant="subtitle1" component="div">
                      Product Name:
                    </Typography>
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    {ticketDetail?.product?.name}
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography variant="subtitle1" component="div">
                      Product Code:
                    </Typography>
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    {ticketDetail?.product?.code}
                  </Grid>
                </Grid>
              </Card>
            </Container>
          </Card>
          <Card variant="outlined">
            <CardContent>
              <TicketTimeline
                total={totalHistory}
                histories={histories}
                setPageSize={setPageSize}
                pageSize={pageSize}
              />
            </CardContent>
          </Card>
        </Stack>
      </Box>
      <TicketComment
        open={open}
        handleClose={handleClose}
        ticket_id={id}
        getTicketComment={getTicketComment}
        getTicketDetail={getTicketDetail}
      />
    </>
  );
};

TicketHistory.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default TicketHistory;
