"use client";
import GuestGuard from "@/auth/GuestGuard";
import NewPassword from "@/sections/auth/newPassword";
import { Box } from "@mui/material";
import { useFormik } from "formik";

const ResetPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      new_password: "",
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

      if (!values.new_password) {
        errors.new_password = "Confirm Password is required";
      } else if (values.new_password.length > 10) {
        errors.new_password = "Password must be less than 10 characters";
      } else if (!passwordRegex.test(values.new_password)) {
        errors.new_password =
          "Must Contain 10 Characters, One Uppercase, One Lowercase, One Number and one special case Character";
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
        <NewPassword formik={formik} />
      </Box>
    </GuestGuard>
  );
};

export default ResetPassword;
