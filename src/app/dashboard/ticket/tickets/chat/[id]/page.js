"use client";
import { ContainerComponent } from "@/components/container";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import { PATH_DASHBOARD } from "@/routes/paths";
import { TicketsFormSection } from "@/sections/dashboard/ticket/tickets";
import ChatSection from "@/sections/dashboard/ticket/tickets/chat";
import axiosInstance from "@/utils/axios";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

import React from "react";

const TicketsPageForm = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const title = "Ticket Chat";
  const backUrl = `${PATH_DASHBOARD.ticket.tickets}`;
  const actionUrl = "admin/catalog/tickets";

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validate: (values) => {
      const errors = {};

      return errors;
    },
    onSubmit: async (values) => {
      //   let method = "POST";
      //   let url = actionUrl;
      //   await axiosInstance
      //     .request({
      //       method: method,
      //       url: url,
      //       data: values,
      //     })
      //     .then((response) => {
      //       if (response.status === 200) {
      //         router.back();
      //         enqueueSnackbar(response.data.message, {
      //           variant: "success",
      //         });
      //       }
      //     })
      //     .catch((error) => {
      //       const { response } = error;
      //       // show error message
      //       enqueueSnackbar(response?.data?.message, {
      //         variant: "error",
      //       });
      //       // set server error
      //       if (response.status === 422) {
      //         // eslint-disable-next-line no-unused-vars
      //         for (const [key, value] of Object.entries(values)) {
      //           if (response.data.errors[key]) {
      //             setErrors({ [key]: response.data.errors[key][0] });
      //           }
      //         }
      //       }
      //     });
    },
  });

  const bindData = async (id) => {
    await axiosInstance.get(`${actionUrl}/${id}`).then((response) => {
      if (response.status === 200) {
        const { data } = response;
        // bind form data from server
        for (const [key] of Object.entries(formik.values)) {
          console.log("key", key);
          // if (key === "client_id") {
          //   formik.setFieldValue("client_id", data?.client_id);
          // } else if (key === "status") {
          //   formik.setFieldValue("status", data?.status);
          // } else {
          formik.setFieldValue(key, data[key]);
          // }
        }
      }
    });
  };

  //   React.useEffect(() => {
  //     if (id && id !== "new") {
  //       bindData(id);
  //     }
  //   }, [id]);
  console.log("yaya", formik.values);

  return (
    <ContainerComponent>
      <CustomBreadcrumbs
        heading={title}
        links={[
          {
            name: "Dashboard",
            href: PATH_DASHBOARD.app,
          },
          {
            name: "Ticket List",
            href: backUrl,
          },
          { name: title },
        ]}
      />
      <form noValidate onSubmit={formik.handleSubmit}>
        <ChatSection formik={formik} id={id} />
        {/* <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={formik?.isSubmitting}
          >
            {id === "new" ? "Create Ticket" : "Update Ticket"}
          </LoadingButton>
        </Stack> */}
      </form>
    </ContainerComponent>
  );
};

export default TicketsPageForm;
