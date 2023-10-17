"use client";
import { PasswordBox, TextBox } from "@/components/form";
import { PATH_AUTH } from "@/routes/paths";
import { Box, Button, Grid, Link, Stack, Typography } from "@mui/material";
import NextLink from "next/link";

const NewPassword = ({ method = "new_password", formik }) => {
  return (
    <Box text-align="center">
      <Grid container justifyContent="center">
        <Grid item lg={3} md={5} sm={8} xs={12}>
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
                Reset Password
              </Typography>
              <Typography variant="body2" component="p" textAlign="center">
                Please enter your new password
              </Typography>
            </Stack>

            <form noValidate onSubmit={formik.handleSubmit}>
              <TextBox
                disabled
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
                label="Confirm password"
                name="new_password"
                value={formik?.values?.new_password}
                onChange={(e) => {
                  formik.setFieldValue("new_password", e.target.value.trim());
                }}
                error={formik.touched.new_password && formik.errors.new_password}
                helperText={formik.touched.new_password && formik.errors.new_password}
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
                Update password
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
export default NewPassword;
