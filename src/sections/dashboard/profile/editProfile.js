import { TextBox } from "@/components/form";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  CardContent,
  Dialog,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const EditProfile = ({ formik, open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    > <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      <CardContent>
        <DialogTitle id="alert-dialog-title">{"Profile Edit"}</DialogTitle>
       
        <Divider sx={{mb:3}}/>
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} sx={12}>
              <TextBox
                fullWidth
                label="Name"
                size="medium"
                name="name"
                type="text"
                InputProps={{ disableUnderline: true }}
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} sx={12}>
              <TextBox
                fullWidth
                label="Mobile"
                size="medium"
                name="phone"
                type="number"
                InputProps={{ disableUnderline: true }}
                onChange={formik.handleChange}
                value={formik.values.phone}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && formik.errors.phone}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} sx={12}>
              <TextBox
                // disabled
                fullWidth
                label="Email"
                size="medium"
                name="email"
                type="email"
                InputProps={{ disableUnderline: true }}
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                error={formik.touched.email && formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>

            <Grid lg={12} md={12} sm={12} sx={12}>
              <LoadingButton
                autoFocus
                fullWidth
                type="submit"
                variant="contained"
                loading={formik.isSubmitting}
              >
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Dialog>
  );
};

export default EditProfile;
