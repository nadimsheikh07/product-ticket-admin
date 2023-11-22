import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import { ContainerComponent } from "@/components/container";
import { useFormik } from "formik";
import React from "react";
import axiosInstance from "@/utils/axios";
import { useSnackbar } from "notistack";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { PATH_DASHBOARD } from "@/routes/paths";
import { AdminProfile, CompanyProfile } from "@/sections/dashboard/profile";
import { Grid } from "@mui/material";

const AdminProfiles = () => {
  const actionUrl = "admin/user/profile";
  const [open, setOpen] = React.useState(false);
  const [openUpdatePassword, setOpenUpdatePassword] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickUpdatePassword = () => {
    setOpenUpdatePassword(!openUpdatePassword);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      user_type: "admin",
      company: {
        name: "",
        email: "",
        phone_number: "",
        code: "",
      },
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Name is required";
      }
      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      const phoneRegex = /^\d+$/i;
      if (!values.phone) {
        errors.phone = "Phone is required";
      } else if (!phoneRegex.test(values.phone)) {
        errors.phone = "Invalid phone number";
      } else if (values.phone.length < 10 || values.phone.length > 10) {
        errors.phone = "Phone number must be 10 digit";
      }

      return errors;
    },
    onSubmit: async (values) => {
      await axiosInstance
        .post(actionUrl, values)
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

  const bindData = async () => {
    await axiosInstance.get(`${actionUrl}`).then((response) => {
      if (response.status === 200) {
        const { user } = response?.data;
        // bind form data from server
        for (const [key] of Object.entries(formik.values)) {
          if (user[key]) {
            formik.setFieldValue([key], user[key]);
          } else {
            formik.setFieldError(key, "");
          }
        }
      }
    });
  };

  React.useEffect(() => {
    bindData();
  }, []);
  return (
    <>
      <ContainerComponent>
        <CustomBreadcrumbs
          heading="Admin Profile"
          links={[
            {
              name: "Dashboard",
              href: PATH_DASHBOARD.app,
            },
            {
              name: "Profile",
              // href: "#",
            },
          ]}
        />
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <AdminProfile
              formik={formik}
              open={open}
              setOpen={setOpen}
              handleClickOpen={handleClickOpen}
              handleClose={handleClose}
              handleClickUpdatePassword={handleClickUpdatePassword}
              openUpdatePassword={openUpdatePassword}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <CompanyProfile
              formik={formik}
              open={open}
              setOpen={setOpen}
              handleClickOpen={handleClickOpen}
              handleClose={handleClose}
            />
          </Grid>
        </Grid>
      </ContainerComponent>
    </>
  );
};
AdminProfiles.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default AdminProfiles;
