import { DragDrop, PasswordBox, TextBox, ToggleBox } from "@/components/form";
import { Grid } from "@mui/material";
import React from "react";

const CompanyFormSection = ({ formik, id }) => {
  return (
    <Grid container spacing={2}>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="Name"
          name="name"
          value={formik?.values?.name}
          onChange={(e) => {
            formik.setFieldValue("name", e.target.value.trimStart());
          }}
          error={formik.touched.name && formik.errors.name}
          helperText={formik.touched.name && formik.errors.name}
          required
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="Email"
          name="email"
          value={formik?.values?.email}
          onChange={formik.handleChange}
          error={formik.touched.email && formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
          required
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="Phone"
          name="phone_number"
          isMaxLenght={10}
          value={formik?.values?.phone_number}
          onChange={(e) => {
            if (e) {
              formik.setFieldValue("phone_number", e.target.value.replace(/\D/gm, ""));
            }
          }}
          error={formik.touched.phone_number && formik.errors.phone_number}
          helperText={formik.touched.phone_number && formik.errors.phone_number}
          required
        />
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <ToggleBox
          fullWidth
          label="Is Active"
          name="is_active"
          value={formik?.values?.is_active}
          checked={formik?.values?.is_active}
          onChange={(e) => {
            if (e.target.checked) {
              formik.setFieldValue("is_active", true);
            } else {
              formik.setFieldValue("is_active", false);
            }
          }}
          error={formik.touched.is_active && formik.errors.is_active}
          helperText={formik.touched.is_active && formik.errors.is_active}
        />
      </Grid>
      {/* <Grid item lg={6} md={6} sm={12} xs={12}>
        <DragDrop
          fullWidth={true}
          name="photo"
          url="admin/upload/image"
          value={formik.values.photo}
          onChange={(e) => {
            formik.setFieldValue("photo", e);
          }}
        />
      </Grid> */}
    </Grid>
  );
};

export default CompanyFormSection;
