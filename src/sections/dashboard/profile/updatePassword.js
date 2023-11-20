import { PasswordBox } from "@/components/form";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  CardContent,
  Container,
  Dialog,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useSnackbar } from "notistack";
import axiosInstance from "@/utils/axios";

const UpdatePassword = ({ open, handleClose }) => {
  const actionUrl = "admin/auth/update_password";
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.current_password) {
        errors.current_password = "Current password is required";
      }
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length > 10) {
        errors.password = "Password must be less than 10 characters";
      } else if (!passwordRegex.test(values.password)) {
        errors.password =
          "Must Contain 10 Characters, One Uppercase, One Lowercase, One Number and one special case Character";
      }
      if (values.password !== values.password_confirmation) {
        errors.password_confirmation =
          "Current password does not match with previous password";
      }

      return errors;
    },
    onSubmit: async (values) => {
      await axiosInstance
        .put(actionUrl, values)
        .then((response) => {
          if (response.status === 200) {
            enqueueSnackbar(response?.data?.message, {
              variant: "success",
            });
            handleClose();
          }
        })
        .catch((error) => {
          console.log("PROFILE ADMIN", error);
          const { response } = error;
          enqueueSnackbar(response?.data?.message, {
            variant: "error",
          });
          // set server error
          if (response.status === 422) {
            // eslint-disable-next-line no-unused-vars
            for (const [key, value] of Object.entries(values)) {
              if (response.data.errors[key]) {
                formik.setFieldError(key, response.data.errors[key][0]);
              }
            }
          }
        });
    },
  });
  console.log("formik", formik.errors);
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <IconButton
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
          <DialogTitle id="alert-dialog-title">{"Password Update"}</DialogTitle>
          <Divider sx={{ mb: 3 }} />
          <Container>
            <Box component="form" noValidate onSubmit={formik.handleSubmit}>
              <PasswordBox
                fullWidth
                label="Current Password"
                name="current_password"
                value={formik?.values?.current_password}
                onChange={(e) => {
                  formik.setFieldValue(
                    "current_password",
                    e.target.value.trimStart()
                  );
                }}
                error={
                  formik.touched.current_password &&
                  formik.errors.current_password
                }
                helperText={
                  formik.touched.current_password &&
                  formik.errors.current_password
                }
                required
              />
              <PasswordBox
                fullWidth
                label="Password"
                name="password"
                value={formik?.values?.password}
                onChange={(e) => {
                  formik.setFieldValue("password", e.target.value.trim());
                }}
                error={formik.touched.password && formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
                // required
              />
              <PasswordBox
                fullWidth
                label="Confirm Password"
                name="password_confirmation"
                value={formik?.values?.password_confirmation}
                onChange={(e) => {
                  formik.setFieldValue(
                    "password_confirmation",
                    e.target.value.trim()
                  );
                }}
                error={
                  formik.touched.password_confirmation &&
                  formik.errors.password_confirmation
                }
                helperText={
                  formik.touched.password_confirmation &&
                  formik.errors.password_confirmation
                }
                // required
              />
              <LoadingButton
                autoFocus
                fullWidth
                type="submit"
                variant="contained"
                loading={formik.isSubmitting}
              >
                Submit
              </LoadingButton>
            </Box>
          </Container>
        </CardContent>
      </Dialog>
    </>
  );
};

export default UpdatePassword;
