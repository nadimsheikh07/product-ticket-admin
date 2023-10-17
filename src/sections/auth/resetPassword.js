import {
  Box,
  Button,
  FormControl,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { PATH_AUTH } from "@/routes/paths";
import { TextBox } from "@/components/form";

const ResetPassword = ({ method = "forget_password", formik }) => {
  return (
    <Box text-align="center">
      <Grid container justifyContent="center">
        <Grid item lg={4} md={5} sm={8} xs={12}>
          <Stack spacing={6} sx={{ mb: 5, position: "relative" }}>
            <Box>
              <Box
                component="img"
                alt={method}
                src={`/assets/icons/auth/ic_${method}.svg`}
                sx={{
                  width: "100%",
                  height: "96px",
                  position: "relative",
                  right: 0,
                }}
              />
            </Box>
            <Stack spacing={2}>
              <Typography variant="h3" component="h3" textAlign="center">
                Forgot your password?
              </Typography>
              <Typography variant="body2" component="p" textAlign="center">
                Please enter the email address associated with your account and
                We will email you a link to reset your password.
              </Typography>
            </Stack>

            <form noValidate onSubmit={formik.handleSubmit}>
              <TextBox
                fullWidth
                isMaxLenght={50}
                label="Email"
                name="email"
                value={formik?.values?.email}
                onChange={formik.handleChange}
                error={formik.touched.email && formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
                required
              />
              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 2,
                  bgcolor: "text.primary",
                }}
                type="submit"
              >
                Send Request
              </Button>
              <Box sx={{ textAlign: "right" }}>
                <Link
                  component={NextLink}
                  href={PATH_AUTH.login}
                  variant="body2"
                  color="primary"
                  underline="hover"
                  textAlign="center"
                  mt={2}
                >
                  Return to sign in
                </Link>
              </Box>
            </form>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ResetPassword;
