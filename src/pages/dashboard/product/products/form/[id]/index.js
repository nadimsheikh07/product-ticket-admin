"use client";
import { ContainerComponent } from "@/components/container";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import { StepperContext } from "@/components/stepper/stepperContext";
import { ScrollableTabs } from "@/components/tabs";
import useCompany from "@/hooks/useCompany";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { PATH_DASHBOARD } from "@/routes/paths";
import { ProductsFormSection } from "@/sections/dashboard/product/products";
import DynamicAttributeForm from "@/sections/dashboard/product/products/dynamicAttributeForm";
import axiosInstance from "@/utils/axios";
import { useFormik } from "formik";
import { reject } from "lodash";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import React from "react";

const ProductsPageForm = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { companyId } = useCompany();
  const { id } = router.query;
  const title = "Product Form";
  const backUrl = `${PATH_DASHBOARD.product.products}`;
  const actionUrl = "admin/catalog/products";
  const { value, setValue } = React.useContext(StepperContext);
  const [attributes, setAttributes] = React.useState({
    open: false,
    id: "new",
  });
  const isLastStep = value === 2 - 1;
  const [attributeData, setAttributeData] = React.useState([]);

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
      attributes: [],
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

      if (isLastStep) {
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
      } else {
        setValue(value + 1);
      }
    },
  });

  const getAttributes = async (params) => {
    await axiosInstance
      .get("admin/attribute/attributes", {
        params: {
          ...params,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setAttributeData(response?.data);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  React.useEffect(() => {
    getAttributes();

    return () => {
      getAttributes();
    };
  }, []);

  const generateCode = async () => {
    await axiosInstance
      .get(`/admin/catalog/generate-auto-code`, formik.values)
      .then((response) => {
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
  const bindData = async (id) => {
    await axiosInstance.get(`${actionUrl}/${id}`).then((response) => {
      if (response.status === 200) {
        const { data } = response;
        // bind form data from server
        for (const [key] of Object.entries(formik.values)) {
          if (data[key]) {
            if (key == "client_id") {
              let client = {
                label: data?.client?.name,
                value: data?.client?.id,
                ...data?.client,
              };
              formik.setFieldValue(key, client);
            } else if (key == "attributes") {
              let modifyAttributes = [];
              data?.attributes &&
                data?.attributes?.length > 0 &&
                data?.attributes?.forEach((element) => {
                  modifyAttributes.push({
                    ...element,
                    ["attribute_id"]: {
                      label: element?.attribute?.name,
                      value: element?.attribute?.id,
                      ...element?.attribute,
                    },
                  });
                });

              formik.setFieldValue("attributes", modifyAttributes);
            } else {
              formik.setFieldValue([key], data[key]);
            }
          } else {
            formik.setFieldError(key, "");
          }
        }
      }
    });
  };

  React.useEffect(() => {
    if (id && id !== "new" && companyId) {
      bindData(id);
    }
  }, [id, companyId]);

  const handleOpenCloseAttributes = (value = "new") => {
    setAttributes({
      open: !attributes.open,
      id: value,
    });
  };

  const addAttribute = (value) => {
    formik.setFieldValue("attributes", [...formik.values.attributes, value]);
  };

  const updateAttribute = (value) => {
    formik.setFieldValue("attributes", value);
  };

  const removeAttribute = (index) => {
    const removeEmail = formik.values.attributes.splice(index, 1);
    formik.setFieldValue(
      "attributes",
      reject(formik.values.attributes, removeEmail)
    );
  };

  const tabs = [
    {
      title: "Product Detail",
      fields: ["name", "client_id", "code"],
      component: (
        <ProductsFormSection
          generateCode={generateCode}
          formik={formik}
          id={id}
        />
      ),
    },
    {
      title: "Attribute Detail",
      fields: ["product_name"],
      component: (
        <DynamicAttributeForm
          addAttribute={addAttribute}
          removeAttribute={removeAttribute}
          attributes={attributes}
          handleOpenCloseAttributes={handleOpenCloseAttributes}
          attributeList={formik.values.attributes}
          updateAttribute={updateAttribute}
          attributeData={attributeData}
        />
      ),
    },
  ];

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
        <ScrollableTabs isLastStep={isLastStep} tabs={tabs} formik={formik} />
      </form>
    </ContainerComponent>
  );
};
ProductsPageForm.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default ProductsPageForm;
