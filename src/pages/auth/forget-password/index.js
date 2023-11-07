"use client";
import GuestGuard from "@/auth/GuestGuard";
import ForgotPassword from "@/sections/auth/forgotPassword";
import ResetPassword from "@/sections/auth/forgotPassword";
import axiosInstance from "@/utils/axios";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";

const ForgetPasswords = () => {
  const actionUrl = "admin/auth/forgot_password";
  const { enqueueSnackbar } = useSnackbar();
  const title = "Forget Password";

  const formik = useFormik({
    initialValues: {
      email: "",
      user_type:"admin"
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      return errors;
    },
    onSubmit: async (values) => {
      // await
      let method = "POST";
      let url = actionUrl;

      await axiosInstance
        .request({
          method: method,
          url: url,
          data: values,
        })
        .then((response) => {
          if (response.status === 200) {
            enqueueSnackbar(response.data.message, {
              variant: "success",
            });
          }
        })
        .catch((error) => {
          const { response } = error;
          // show error message
          enqueueSnackbar(response?.data?.message, {
            variant: "error",
          });

          // set server error
          if (response.status === 422) {
            // eslint-disable-next-line no-unused-vars
            for (const [key, value] of Object.entries(values)) {
              if (response.data.errors[key]) {
                formik.setFieldError(key, response.data.errors[key][0]);
                // setErrors({ [key]: response.data.errors[key][0] });
              }
            }
          }
        });
    },
  });
  return (
    <GuestGuard>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          background: (theme) => theme.palette.common.white,
          zIndex: 1200,
          pt: 5,
        }}
      >
        <ForgotPassword formik={formik} />
      </Box>
    </GuestGuard>
  );
};

export default ForgetPasswords;
