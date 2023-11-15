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
                <Stack direction="row" spacing={20}>
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
                <Typography variant="body2" mt={5}>
                  Name:
                  {formik.values.name}
                </Typography>
                <Typography variant="body2" mt={2}>
                  Email:
                  {formik.values.email}
                </Typography>
                <Typography variant="body2" mt={2}>
                  Mobile:
                  {formik.values.phone}
                </Typography>
                {/* <Typography sx={{ mb: 1.5 }} color="text.secondary" mt={3}>
                  {formik.values.address}
                </Typography> */}
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
