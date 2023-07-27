import {
  DragDrop,
  MuiAutocompleteBox,
  PasswordBox,
  TextBox,
} from "@/components/form";
import { Grid } from "@mui/material";
import React from "react";

const ProductsFormSection = ({ formik, id }) => {
  return (
    <Grid container spacing={2}>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <MuiAutocompleteBox
          fullWidth
          label="Company"
          placeholder="Select company"
          name="company_id"
          url="catalog/companies"
          value={formik.values.company_id}
          getOptionLabel="name"
          getOptionValue="id"
          onChange={(e) => formik.setFieldValue("company_id", e)}
          error={formik.touched.company_id && formik.errors.company_id}
          helperText={formik.touched.company_id && formik.errors.company_id}
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="Name"
          name="name"
          value={formik?.values?.name}
          onChange={formik.handleChange}
          error={formik.touched.name && formik.errors.name}
          helperText={formik.touched.name && formik.errors.name}
          required
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="Code"
          name="code"
          value={formik?.values?.code}
          onChange={formik.handleChange}
          error={formik.touched.code && formik.errors.code}
          helperText={formik.touched.code && formik.errors.code}
          required
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="Model"
          name="model"
          value={formik?.values?.model}
          onChange={formik.handleChange}
          error={formik.touched.model && formik.errors.model}
          helperText={formik.touched.model && formik.errors.model}
          required
        />
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="Detail"
          placeholder="Enter detail"
          name="detail"
          value={formik.values.detail}
          onChange={formik.handleChange}
          error={formik.touched.detail && formik.errors.detail}
          helperText={formik.touched.detail && formik.errors.detail}
        />
      </Grid>
    </Grid>
  );
};

export default ProductsFormSection;
