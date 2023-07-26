import { DragDrop, PasswordBox, TextBox } from "@/components/form";
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
          onChange={formik.handleChange}
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
          value={formik?.values?.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && formik.errors.phone}
          helperText={formik.touched.phone && formik.errors.phone}
          required
        />
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="Address"
          name="address"
          multiline
          rows={3}
          value={formik?.values?.address}
          onChange={formik.handleChange}
          error={formik.touched.address && formik.errors.address}
          helperText={formik.touched.address && formik.errors.address}
          required
        />
      </Grid>
      {/* {id === "new" && (
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
      )} */}
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
