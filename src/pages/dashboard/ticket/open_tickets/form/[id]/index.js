"use client";
import { ContainerComponent } from "@/components/container";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import { DatePickerBox, DragDrop, TextBox } from "@/components/form";
import SelectBox from "@/components/form/select";
import { StepperContext } from "@/components/stepper/stepperContext";
import { ScrollableTabs } from "@/components/tabs";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { PATH_DASHBOARD } from "@/routes/paths";
import axiosInstance from "@/utils/axios";
import { status } from "@/utils/constant";
import { Grid } from "@mui/material";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import React from "react";

const TicketsPageForm = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = router.query;
  const title = "Open Ticket Form";
  const backUrl = `${PATH_DASHBOARD.ticket.open_tickets}`;
  const { value, setValue } = React.useContext(StepperContext);
  const isLastStep = value === 3 - 1;
  const actionUrl = "admin/catalog/open_tickets";

  const formik = useFormik({
    initialValues: {
      name: "",
      product_name: "",
      email: "",
      phone: "",
      address: "",
      serial_number: "",
      warranty_start: "",
      warranty_end: "",
      invoice_number: "",
      invoice_date: "",
      product_detail: "",
      complain_detail: "",
      file: "",
      status: "",
      status: "pending",
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Client name is Required";
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
      if (!values.product_name) {
        errors.product_name = "Product name is Required";
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
                  setErrors({ [key]: response.data.errors[key][0] });
                }
              }
            }
          });
      } else {
        setValue(value + 1);
      }
    },
  });

  const bindData = async (id) => {
    await axiosInstance.get(`${actionUrl}/${id}`).then((response) => {
      if (response.status === 200) {
        const { data } = response;
        // bind form data from server
        for (const [key] of Object.entries(formik.values)) {
          formik.setFieldValue(key, data[key]);
        }
      }
    });
  };

  React.useEffect(() => {
    if (id && id !== "new") {
      bindData(id);
    }
  }, [id]);

  const tabs = [
    {
      title: "User Detail",
      fields: ["name", "email", "phone"],
      component: (
        <>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <TextBox
                fullWidth
                isMaxLenght={25}
                label="Client Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
                required={true}
              />
            </Grid>
            <Grid item md={6}>
              <TextBox
                fullWidth
                isMaxLenght={50}
                label="Client Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
                required={true}
              />
            </Grid>
            <Grid item md={12}>
              <TextBox
                fullWidth
                label="Client Phone"
                isMaxLenght={10}
                name="phone"
                value={formik.values.phone}
                onChange={(e) => {
                  if (e) {
                    formik.setFieldValue(
                      "phone",
                      e.target.value.replace(/\D/gm, "")
                    );
                  }
                }}
                error={formik.touched.phone && formik.errors.phone}
                helperText={formik.touched.phone && formik.errors.phone}
                required
              />
            </Grid>
            <Grid item md={12}>
              <TextBox
                fullWidth
                isMaxLenght={150}
                label="Client Address"
                name="address"
                type="text"
                multiline
                rows={4}
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && formik.errors.address}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
          </Grid>
        </>
      ),
    },
    {
      title: "Product Detail",
      fields: ["product_name"],
      component: (
        <Grid container spacing={2}>
          <Grid item md={6}>
            <TextBox
              fullWidth
              isMaxLenght={25}
              label="Product Name"
              name="product_name"
              value={formik.values.product_name}
              onChange={formik.handleChange}
              error={formik.touched.product_name && formik.errors.product_name}
              helperText={
                formik.touched.product_name && formik.errors.product_name
              }
              required={true}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextBox
              fullWidth
              isMaxLenght={20}
              label="Serial No."
              name="serial_number"
              value={formik?.values?.serial_number}
              onChange={(e) => {
                formik.setFieldValue(
                  "serial_number",
                  e.target.value.trimStart()
                );
              }}
              error={
                formik.touched.serial_number && formik.errors.serial_number
              }
              helperText={
                formik.touched.serial_number && formik.errors.serial_number
              }
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextBox
              fullWidth
              isMaxLenght={20}
              label="Invoice No."
              name="invoice_number"
              value={formik?.values?.invoice_number}
              onChange={formik.handleChange}
              error={
                formik.touched.invoice_number && formik.errors.invoice_number
              }
              helperText={
                formik.touched.invoice_number && formik.errors.invoice_number
              }
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <DatePickerBox
              disablePast={true}
              fullWidth
              label="Invoice Date"
              name="invoice_date"
              value={formik.values.invoice_date}
              onChange={(e) => {
                formik.setFieldValue(
                  "invoice_date",
                  dayjs(e).format("YYYY-MM-DD")
                );
              }}
              format="DD/MM/YYYY"
              placeholder="DD/MM/YYYY"
              helperText={
                formik.touched.invoice_date && formik.errors.invoice_date
              }
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <DatePickerBox
              disablePast={false}
              fullWidth
              label="Warranty Start"
              name="warranty_start"
              value={formik.values.warranty_start}
              onChange={(e) => {
                formik.setFieldValue(
                  "warranty_start",
                  dayjs(e).format("YYYY-MM-DD")
                );
                formik.setFieldValue("warranty_end", null);
              }}
              format="DD/MM/YYYY"
              placeholder="DD/MM/YYYY"
              helperText={
                formik.touched.warranty_start && formik.errors.warranty_start
              }
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <DatePickerBox
              disablePast={false}
              fullWidth
              label="Warranty End"
              name="warranty_end"
              value={formik.values.warranty_end}
              onChange={(e) => {
                formik.setFieldValue(
                  "warranty_end",
                  dayjs(e).format("YYYY-MM-DD")
                );
              }}
              format="DD/MM/YYYY"
              placeholder="DD/MM/YYYY"
              helperText={
                formik.touched.warranty_end && formik.errors.warranty_end
              }
              minDate={formik.values.warranty_start}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextBox
              fullWidth
              label="Product Detail"
              isMaxLenght={250}
              placeholder="Enter Product Detail"
              name="product_detail"
              multiline={true}
              rows={3}
              value={formik.values.product_detail}
              onChange={formik.handleChange}
              error={
                formik.touched.product_detail && formik.errors.product_detail
              }
              helperText={
                formik.touched.product_detail && formik.errors.product_detail
              }
            />
          </Grid>
        </Grid>
      ),
    },
    {
      title: "Complain Detail",
      fields: [],
      component: (
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <SelectBox
              fullWidth
              label="Status"
              placeholder="Select"
              name="status"
              options={status}
              value={String(formik.values.status)}
              onChange={formik.handleChange}
              error={formik.touched.status && formik.errors.status}
              helperText={formik.touched.status && formik.errors.status}
            />
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DragDrop
              fullWidth={true}
              title="Image"
              name="file"
              url="api/upload/image"
              value={formik.values.file}
              onChange={(e) => {
                formik.setFieldValue("file", e);
              }}
            />
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextBox
              fullWidth
              label="Complain Detail"
              isMaxLenght={250}
              placeholder="Enter detail"
              multiline={true}
              rows={3}
              name="complain_detail"
              value={formik.values.complain_detail}
              onChange={formik.handleChange}
              error={
                formik.touched.complain_detail && formik.errors.complain_detail
              }
              helperText={
                formik.touched.complain_detail && formik.errors.complain_detail
              }
            />
          </Grid>
        </Grid>
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
            name: "Open Ticket",
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
TicketsPageForm.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default TicketsPageForm;
