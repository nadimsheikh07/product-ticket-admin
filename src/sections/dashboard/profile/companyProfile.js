import { useAuthContext } from "@/auth/useAuthContext";
import { Grid, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const CompanyProfile = ({
  formik,
  handleClose,
  handleClickOpen,
  open,
  setOpen,
}) => {
  const { user } = useAuthContext();
  return (
    <>
      <Box>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Stack direction="row" spacing={20}>
                  <Box>
                    <Typography sx={{ fontSize: 14 }} variant="h6" gutterBottom>
                      Company Information
                    </Typography>
                  </Box>
                  {/* <Box>
                    <Button onClick={handleClickOpen}>
                      <EditIcon />
                    </Button>
                  </Box> */}
                </Stack>
                {user?.user_type === "admin" && (
                  <Grid container spacing={2} m={2}>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <Typography variant="subtitle1" component="div">
                        Code:
                      </Typography>
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      {formik?.values?.company?.code}
                    </Grid>
                  </Grid>
                )}
                <Grid container spacing={2} m={2}>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography variant="subtitle1" component="div">
                      Name:
                    </Typography>
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    {formik?.values?.company?.name}
                  </Grid>
                </Grid>
                <Grid container spacing={2} m={2}>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography variant="subtitle1" component="div">
                      Email:
                    </Typography>
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    {formik.values.company?.email}
                  </Grid>
                </Grid>
                <Grid container spacing={2} m={2}>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography variant="subtitle1" component="div">
                      Mobiel No:
                    </Typography>
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    {formik.values.company?.phone_number}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CompanyProfile;
