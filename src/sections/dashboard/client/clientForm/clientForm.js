import {
  DragDrop,
  MuiAutocompleteBox,
  PasswordBox,
  TextBox,
} from "@/components/form";
import { Grid } from "@mui/material";
import React from "react";

const ClientFormSection = ({ formik, id }) => {
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
          name="phone"
          isMaxLenght={10}
          value={formik?.values?.phone}
          onChange={(e) => {
            if (e) {
              formik.setFieldValue("phone", e.target.value.replace(/\D/gm, ""));
            }
          }}
          error={formik.touched.phone && formik.errors.phone}
          helperText={formik.touched.phone && formik.errors.phone}
          required
        />
      </Grid>
      {/* {id === "new" && ( */}
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <PasswordBox
          fullWidth
          label="Password"
          name="password"
          value={formik?.values?.password}
          onChange={formik.handleChange}
          error={formik.touched.password && formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
          required
        />
      </Grid>
      {/* )} */}
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="Address"
          multiline={true}
          rows={3}
          name="address"
          value={formik?.values?.address}
          onChange={formik.handleChange}
          error={formik.touched.address && formik.errors.address}
          helperText={formik.touched.address && formik.errors.address}
          required
        />
      </Grid>
    </Grid>
  );
};

export default ClientFormSection;
