"use client";
import { ContainerComponent } from "@/components/container";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import { PATH_DASHBOARD } from "@/routes/paths";
import CompanyEmpolyeesFormSection from "@/sections/dashboard/company/companies_empolyeesForm/companies_empolyeesForm";
import { ProductsFormSection } from "@/sections/dashboard/product/products";
import axiosInstance from "@/utils/axios";
import { LoadingButton } from "@mui/lab";
import { Container, Stack } from "@mui/material";
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
      company_id: "",
      name: "",
      code: "",
      model: "",
      details: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.company_id) {
        errors.company_id = "Company is Required";
      }
      if (!values.name) {
        errors.name = "Name is required";
      }
      if (!values.code) {
        errors.code = "Code is required";
      }
      if (!values.model) {
        errors.model = "Model is required";
      }
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
                setErrors({ [key]: response.data.errors[key][0] });
              }
            }
          }
        });
    },
  });

  const bindData = async (id) => {
    await axiosInstance.get(`${actionUrl}/${id}`).then((response) => {
      if (response.status === 200) {
        const { data } = response;
        // bind form data from server
        for (const [key] of Object.entries(formik.values)) {
          formik.setFieldValue([key], data[key]);
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
        <ProductsFormSection formik={formik} id={id} />
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
