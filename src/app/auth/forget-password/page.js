"use client";
import GuestGuard from "@/auth/GuestGuard";
import ResetPassword from "@/sections/auth/resetPassword";
import { Box } from "@mui/material";
import { useFormik } from "formik";


const ForgetPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
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
          zIndex: 1800,
          pt: 5,
        }}
      >
        <ResetPassword formik={formik} />
      </Box>
    </GuestGuard>
  );
};

export default ForgetPassword;
