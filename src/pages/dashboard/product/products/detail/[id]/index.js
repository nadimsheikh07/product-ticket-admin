import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { PATH_DASHBOARD } from "@/routes/paths";
import axiosInstance from "@/utils/axios";
import { Box, Card, Container, Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ProductDetails = () => {
  const { query } = useRouter();
  const { id } = query;

  const [detail, setDetail] = React.useState({});

  const getDetail = async () => {
    await axiosInstance
      .get(`admin/catalog/products/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setDetail(response?.data);
        }
      })
      .catch((error) => {
        console.log(" Product Error", error);
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
          heading="Product Details"
          links={[
            {
              name: "Dashboard",
              href: PATH_DASHBOARD.app,
            },
            {
              name: "Product",
              href: PATH_DASHBOARD.product.products,
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
                Product Created Date & Time: {detail?.created_at}
              </Typography>

              {/* <Grid container spacing={2} m={2}> */}
              <Card sx={{ mb: 2 }} variant="outlined">
                <Typography component="div" variant="h6" m={3}>
                  Product Information
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
                  {detail?.attributes &&
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
                    })}
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
                    {detail?.company?.email}
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography variant="subtitle1" component="div">
                      Company Mobile No.
                    </Typography>
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    {detail?.company?.phone_number}
                  </Grid>
                </Grid>
              </Card>

              <Card sx={{ mb: 5 }} variant="outlined">
                <Typography component="p" variant="h6" m={3}>
                  Client Information
                </Typography>
                <Grid container spacing={2} m={2}>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography variant="subtitle1" component="div">
                      Client :{" "}
                    </Typography>
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    {detail?.client?.name}
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography variant="subtitle1" component="div">
                      Client Email :
                    </Typography>
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    {detail?.client?.email}
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography variant="subtitle1" component="div">
                      Client Mobile No:
                    </Typography>
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    {detail?.client?.phone}
                  </Grid>
                </Grid>
              </Card>
            </Container>
          </Card>
        </Stack>
      </Box>
    </>
  );
};

ProductDetails.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default ProductDetails;
