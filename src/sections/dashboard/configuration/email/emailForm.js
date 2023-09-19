import {
  DragDrop,
  MuiAutocompleteBox,
  PasswordBox,
  TextBox,
} from "@/components/form";
import { Grid } from "@mui/material";
import React from "react";

const EmailFormSection = ({ formik, id }) => {
  return (
    <Grid container spacing={2}>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextBox
          fullWidth
          isMaxLenght={20}
          label="First Email"
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
          label="Hours"
          name="hours"
          isMaxLenght={10}
          value={formik?.values?.hours}
          onChange={(e) => {
            if (e) {
              formik.setFieldValue("hours", e.target.value.replace(/\D/gm, ""));
            }
          }}
          error={formik.touched.hours && formik.errors.hours}
          helperText={formik.touched.hours && formik.errors.hours}
          required
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextBox
          fullWidth
          isMaxLenght={50}
          label="Second Email"
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
          label="Hours"
          name="hours"
          isMaxLenght={10}
          value={formik?.values?.hours}
          onChange={(e) => {
            if (e) {
              formik.setFieldValue("hours", e.target.value.replace(/\D/gm, ""));
            }
          }}
          error={formik.touched.hours && formik.errors.hours}
          helperText={formik.touched.hours && formik.errors.hours}
          required
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextBox
          fullWidth
          isMaxLenght={50}
          label="Third Email"
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
          label="Hours"
          name="hours"
          isMaxLenght={10}
          value={formik?.values?.hours}
          onChange={(e) => {
            if (e) {
              formik.setFieldValue("hours", e.target.value.replace(/\D/gm, ""));
            }
          }}
          error={formik.touched.hours && formik.errors.hours}
          helperText={formik.touched.hours && formik.errors.hours}
          required
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextBox
          fullWidth
          isMaxLenght={50}
          label="Fourth Email"
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
          label="Hours"
          name="hours"
          isMaxLenght={10}
          value={formik?.values?.hours}
          onChange={(e) => {
            if (e) {
              formik.setFieldValue("hours", e.target.value.replace(/\D/gm, ""));
            }
          }}
          error={formik.touched.hours && formik.errors.hours}
          helperText={formik.touched.hours && formik.errors.hours}
          required
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextBox
          fullWidth
          isMaxLenght={50}
          label="Fifth Email"
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
          label="Hours"
          name="hours"
          isMaxLenght={10}
          value={formik?.values?.hours}
          onChange={(e) => {
            if (e) {
              formik.setFieldValue("hours", e.target.value.replace(/\D/gm, ""));
            }
          }}
          error={formik.touched.hours && formik.errors.hours}
          helperText={formik.touched.hours && formik.errors.hours}
          required
        />
      </Grid>
    </Grid>
  );
};

export default EmailFormSection;
