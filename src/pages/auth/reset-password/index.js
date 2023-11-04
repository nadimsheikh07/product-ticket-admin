"use client";
import GuestGuard from "@/auth/GuestGuard";
import ResetPassword from "@/sections/auth/resetPassword";
import axiosInstance from "@/utils/axios";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import React from "react";

const ResetPasswords = ({ params, searchParams }) => {
  const actionUrl = "admin/auth/reset_password";
  const { enqueueSnackbar } = useSnackbar();
  const  token  = searchParams;
  const title = "Forget Password";
  const formik = useFormik({
    initialValues: {
      // email: "",
      password: "",
      new_password: "",
      token: token,
    },
    validate: (values) => {
      const errors = {};
      // if (!values.email) {
      //   errors.email = "Email is required";
      // } else if (
      //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      // ) {
      //   errors.email = "Invalid email address";
      // }

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
    
      //   if (!values.new_password) {
      //   errors.new_password = "Confirm Password is required";
      // } else if (values.new_password.length > 10) {
      //   errors.new_password = "Password must be less than 10 characters";
      // } else if (!passwordRegex.test(values.new_password)) {
      //   errors.new_password =
      //     "Must Contain 10 Characters, One Uppercase, One Lowercase, One Number and one special case Character";
      // }
      if(values.password !== values.new_password){
        errors.new_password="Current password does not match with previous password"
      }

      return errors;
    },
    onSubmit: async (values) => {
      // await
      let method = "PUT";
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
          if (password === new_password) {
            // Passwords match, continue with your logic
          } else {
            errors.password='Passwords did not match';
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

  React.useEffect(() => {
    if (token) {
      formik.setFieldValue("token", token);
    }
  }, [token]);
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
        <ResetPassword formik={formik} />
      </Box>
    </GuestGuard>
  );
};

export default ResetPasswords;
