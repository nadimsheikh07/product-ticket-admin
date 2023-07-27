import {
  DragDrop,
  MuiAutocompleteBox,
  PasswordBox,
  TextBox,
} from "@/components/form";
import SelectBox from "@/components/form/select";
import { Status } from "@/utils/constant";
import { Grid } from "@mui/material";
import React from "react";

const TicketsFormSection = ({ formik, id }) => {
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
        <MuiAutocompleteBox
          fullWidth
          label="Product"
          placeholder="Select Product"
          name="product_id"
          url="catalog/products"
          value={formik.values.products_id}
          getOptionLabel="name"
          getOptionValue="id"
          onChange={(e) => formik.setFieldValue("products_id", e)}
          error={formik.touched.products_id && formik.errors.products_id}
          helperText={formik.touched.products_id && formik.errors.products_id}
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <MuiAutocompleteBox
          fullWidth
          label="User"
          placeholder="Select User"
          name="user_id"
          url="user/users"
          value={formik.values.users_id}
          getOptionLabel="name"
          getOptionValue="id"
          onChange={(e) => formik.setFieldValue("users_id", e)}
          error={formik.touched.users_id && formik.errors.users_id}
          helperText={formik.touched.users_id && formik.errors.users_id}
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
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <SelectBox
          fullWidth
          label="Status"
          placeholder="Enter Select"
          name="status"
          options={Status}
          value={formik.values.status}
          onChange={formik.handleChange}
          error={formik.touched.status && formik.errors.status}
          helperText={formik.touched.status && formik.errors.status}
        />
      </Grid>
    </Grid>
  );
};

export default TicketsFormSection;
