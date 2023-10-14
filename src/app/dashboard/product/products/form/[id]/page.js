"use client";
import { ContainerComponent } from "@/components/container";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import { PATH_DASHBOARD } from "@/routes/paths";
import CompanyEmpolyeesFormSection from "@/sections/dashboard/client/clientForm/clientForm";
import { ProductsFormSection } from "@/sections/dashboard/product/products";
import axiosInstance from "@/utils/axios";
import { LoadingButton } from "@mui/lab";
import { Container, Stack } from "@mui/material";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

import React from "react";

const ProductsPageForm = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const title = "Product Form";
  const backUrl = `${PATH_DASHBOARD.product.products}`;
  const actionUrl = "admin/catalog/products";

  const formik = useFormik({
    initialValues: {
      client_id: "",
      name: "",
      code: "",
      serial_number: "",
      detail: "",
      warranty_start: null,
      warranty_end: null,
      invoice_number: "",
      invoice_date: null,
    },
    validate: (values) => {
      const errors = {};
      if (!values.client_id) {
        errors.client_id = "Client is Required";
      }
      if (!values.name) {
        errors.name = "Product name is required";
      }
      if (!values.code) {
        errors.code = "Code is required";
      }
      // if (!values.warranty_start) {
      //   errors.warranty_start = "Warranty start date is required";
      // }

      // if (
      //   values.warranty_start &&
      //   values.warranty_end &&
      //   values.warranty_start > values.warranty_end
      // ) {
      //   errors.warranty_end =
      //     "Warranty end date must be greater than warranty start date";
      // }
      // if (!values.warranty_end) {
      //   errors.warranty_end = "Warranty end date is required";
      // }
      // if (!values.invoice_number) {
      //   errors.invoice_number = "Invoice Number is required";
      // }
      // if (!values.invoice_date) {
      //   errors.invoice_date = "Invoice Date is required";
      // }
      // if (!values.serial_number) {
      //   errors.serial_number = "Model is required";
      // }
      return errors;
    },
    onSubmit: async (values) => {
      let method = "POST";
      let url = actionUrl;
      if (id != "new") {
        method = "PUT";
        url = `${actionUrl}/${id}`;
      }

      await axiosInstance
        .request({
          method: method,
          url: url,
          data: values,
        })
        .then((response) => {
          if (response.status === 200) {
            router.back();
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
                formik.setFieldError(key, response.data.errors[key][0]);
                // setErrors({ [key]: response.data.errors[key][0] });
              }
            }
          }
        });
    },
  });

  console.log("formikformik", formik);
  const generateCode = async () => {
    await axiosInstance
      .get(`/admin/catalog/generate-auto-code`, formik.values)
      .then((response) => {
        console.log("responseresponse", response);
        const { data, status } = response;
        if (status == 200) {
          if (data) {
            formik.setFieldValue("code", data.code);
          }
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
  };
  console.log("tata", formik.values);
  const bindData = async (id) => {
    await axiosInstance.get(`${actionUrl}/${id}`).then((response) => {
      if (response.status === 200) {
        const { data } = response;
        // bind form data from server
        for (const [key] of Object.entries(formik.values)) {
          if (data[key]) {
            formik.setFieldValue([key], data[key]);
          } else {
            formik.setFieldError(key, "");
          }
        }
      }
    });
  };

  React.useEffect(() => {
    if (id && id !== "new") {
      bindData(id);
    }
  }, [id]);

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
            name: "Product",
            href: backUrl,
          },
          { name: title },
        ]}
      />
      <form noValidate onSubmit={formik.handleSubmit}>
        <ProductsFormSection
          generateCode={generateCode}
          formik={formik}
          id={id}
        />
        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={formik?.isSubmitting}
          >
            {id === "new" ? "Create product" : "Update product"}
          </LoadingButton>
        </Stack>
      </form>
    </ContainerComponent>
  );
};

export default ProductsPageForm;
