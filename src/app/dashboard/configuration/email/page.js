"use client";
import { ContainerComponent } from "@/components/container";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import { PATH_DASHBOARD } from "@/routes/paths";
import { EmailFormSection } from "@/sections/dashboard/configuration/email";
import axiosInstance from "@/utils/axios";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

import React from "react";

const EmailPageForm = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const title = "Email";
  const actionUrl = "admin/catalog/email_settings";

  const defaultValues = {
    email: "",
    hours: "",
    // sort_by: "",
  };

  const formik = useFormik({
    initialValues: {
      settings: [defaultValues, defaultValues, defaultValues, defaultValues],
    },
    validate: (values) => {
      const errors = {};
      // if (!values.mail) {
      //   errors.mail = "Email is required";
      // }
      // if (!values.hours) {
      //   errors.hours = "Hours is required";
      // }
      return errors;
    },
    onSubmit: async (values) => {
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
            // router.back();
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
                setErrors({ [key]: response.data.errors[key][0] });
              }
            }
          }
        });
    },
  });

  const bindData = async (id) => {
    await axiosInstance
      .get(`${actionUrl}`)
      .then((response) => {
        if (response.status === 200) {
          const { data } = response;
          // bind form data from server
          formik.setFieldValue("settings", data);
        }
      })
      .catch((error) => {
        console.log("Email Setting", error);
      });
  };

  React.useEffect(() => {
    bindData();
  }, []);

  return (
    <ContainerComponent>
      <CustomBreadcrumbs
        heading={`${title} Configuration`}
        links={[
          {
            name: "Dashboard",
            href: PATH_DASHBOARD.app,
          },
          {
            name: title,
            // href: backUrl,
          },
          { name: `${title} Form` },
        ]}
      />
      <form noValidate onSubmit={formik.handleSubmit}>
        <EmailFormSection formik={formik} />
        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={formik?.isSubmitting}
          >
            Submit
          </LoadingButton>
        </Stack>
      </form>
    </ContainerComponent>
  );
};

export default EmailPageForm;
