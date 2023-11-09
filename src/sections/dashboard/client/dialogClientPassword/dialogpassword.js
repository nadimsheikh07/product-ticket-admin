import { PasswordBox } from "@/components/form";
import axiosInstance from "@/utils/axios";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";

const DialogClientPasswords = ({ handleClose, open }) => {
  const actionUrl = "admin/auth/update_password";
  const { enqueueSnackbar } = useSnackbar();
  // const  token  = searchParams;
  const title = "Update Password";
  const formik = useFormik({
    initialValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
      // token: token,
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
          if (password === password_confirmation) {
            // Passwords match, continue with your logic
          } else {
            errors.password = "Passwords did not match";
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
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle sx={{ m: 0, p: 2, mb: 2 }}>Update Password</DialogTitle>
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
        <form  noValidate onSubmit={formik.handleSubmit}>
          <Container sx={{ mb: 1 }}>
            <PasswordBox
              fullWidth
              label="Current Password"
              name="current_password"
              value={formik?.values?.current_password}
              onChange={(e) => {
                formik.setFieldValue("current_password", e.target.value.trimStart());
              }}
              error={formik.touched.current_password && formik.errors.current_password}
              helperText={formik.touched.current_password && formik.errors.current_password}
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
              required
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
              required
            />
          </Container>
          <DialogActions>
            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{
               
                // bgcolor: "text.primary",
              }}
              type="submit"
            >
              Update password
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
export default DialogClientPasswords;
