import { PasswordBox, TextBox } from "@/components/form";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
import UpdatePassword from "./updatePassword";
import EditProfile from "./editProfile";

const AdminProfile = ({
  formik,
  handleClickOpen,
  open,
  handleClickUpdatePassword,
  openUpdatePassword,
  handleClose,
}) => {
  return (
    <>
      <Box>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Stack direction="row" spacing={18}>
                  <Box>
                    <Typography component="div" variant="h6" mt={1} mb={2} gutterBottom>
                      Profile Information
                    </Typography>
                   
                  </Box>
                  <Box>
                    <Button onClick={handleClickOpen}>
                      <EditIcon />
                    </Button>
                    <Button onClick={handleClickUpdatePassword}>
                      <LockIcon />
                    </Button>
                  </Box>
                </Stack>
                <Grid container spacing={2} m={2}>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography variant="subtitle1" component="div">
                    Name:
                    </Typography>
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                  {formik.values.name}
                  </Grid>
                </Grid>
                <Grid container spacing={2} m={2}>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography variant="subtitle1" component="div">
                    Email:
                    </Typography>
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                  {formik.values.email}
                  </Grid>
                </Grid>
                <Grid container spacing={2} m={2}>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography variant="subtitle1" component="div">
                    Mobile:
                    </Typography>
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                  {formik.values.phone}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <EditProfile open={open} handleClose={handleClose} formik={formik} />
      <UpdatePassword
        open={openUpdatePassword}
        handleClose={handleClickUpdatePassword}
      />
    </>
  );
};

export default AdminProfile;
