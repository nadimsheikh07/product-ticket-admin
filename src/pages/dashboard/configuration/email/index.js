"use client";
import { useAuthContext } from "@/auth/useAuthContext";
import { ContainerComponent } from "@/components/container";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { SubmitButton } from "@/module/auth/submitButton";
import { PATH_DASHBOARD } from "@/routes/paths";
import { EmailFormSection } from "@/sections/dashboard/configuration/email";
import axiosInstance from "@/utils/axios";
import { dynamicEmailValidation } from "@/validation/dynamicValidation";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { useFormik } from "formik";
import { reject } from "lodash";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import React from "react";

const EmailPageForm = () => {
  const router = useRouter();
  const { user } = useAuthContext();
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
      settings: [defaultValues],
    },
    validate: (values) => {
      const errors = {};
      if (values.settings && values.settings?.length > 0) {
        dynamicEmailValidation(values, errors);
      }

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

  const addEmail = () => {
    formik.setFieldValue("settings", [
      ...formik.values.settings,
      defaultValues,
    ]);
  };

  const removeEmail = (index) => {
    const removeEmail = formik.values.settings.splice(index, 1);
    formik.setFieldValue(
      "settings",
      reject(formik.values.settings, removeEmail)
    );
  };

  const bindData = async (id) => {
    await axiosInstance
      .get(`${actionUrl}`, {
        params: {
          user_id: user?.id,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const { data } = response;
          // bind form data from server
          if (data && data?.length > 0) {
            formik.setFieldValue("settings", data);
          }
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
          // { name: `${title} Form` },
        ]}
      />
      <form noValidate onSubmit={formik.handleSubmit}>
        <EmailFormSection
          formik={formik}
          addEmail={addEmail}
          removeEmail={removeEmail}
        />
        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <SubmitButton loading={formik?.isSubmitting} />
          {/* <LoadingButton
            type="submit"
            variant="contained"
            loading={formik?.isSubmitting}
          >
            Submit
          </LoadingButton> */}
        </Stack>
      </form>
    </ContainerComponent>
  );
};
EmailPageForm.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default EmailPageForm;
