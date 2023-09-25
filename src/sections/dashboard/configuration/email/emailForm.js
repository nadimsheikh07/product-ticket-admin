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
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <TextBox
          fullWidth
          isMaxLenght={50}
          label="First Email"
          name="name"
          value={formik?.values?.name}
          onChange={(e) => {
            formik.setFieldValue("name", e.target.value.trimStart());
          }}
          error={formik.touched.name && formik.errors.name}
          helperText={formik.touched.name && formik.errors.name}
          // required
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12}>
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
          // required
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="Short By"
          name="short"
          isMaxLenght={10}
          value={formik?.values?.short}
          onChange={(e) => {
            if (e) {
              formik.setFieldValue("short", e.target.value.replace(/\D/gm, ""));
            }
          }}
          error={formik.touched.short && formik.errors.short}
          helperText={formik.touched.short && formik.errors.short}
          // required
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <TextBox
          fullWidth
          isMaxLenght={50}
          label="Second Email"
          name="email_1"
          value={formik?.values?.email_1}
          onChange={formik.handleChange}
          error={formik.touched.email_1 && formik.errors.email_1}
          helperText={formik.touched.email_1 && formik.errors.email_1}
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="Hours"
          name="hours_1"
          isMaxLenght={10}
          value={formik?.values?.hours_1}
          onChange={(e) => {
            if (e) {
              formik.setFieldValue("hours_1", e.target.value.replace(/\D/gm, ""));
            }
          }}
          error={formik.touched.hours_1 && formik.errors.hours_1}
          helperText={formik.touched.hours_1 && formik.errors.hours_1}
          // required
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="Short By"
          name="short_1"
          isMaxLenght={10}
          value={formik?.values?.short_1}
          onChange={(e) => {
            if (e) {
              formik.setFieldValue("short_1", e.target.value.replace(/\D/gm, ""));
            }
          }}
          error={formik.touched.short_1 && formik.errors.short_1}
          helperText={formik.touched.short_1 && formik.errors.short_1}
          // required
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <TextBox
          fullWidth
          isMaxLenght={50}
          label="Third Email"
          name="email_2"
          value={formik?.values?.email_2}
          onChange={formik.handleChange}
          error={formik.touched.email_2 && formik.errors.email_2}
          helperText={formik.touched.email_2 && formik.errors.email_2}
          // required
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="Hours"
          name="hours_2"
          isMaxLenght={10}
          value={formik?.values?.hours_2}
          onChange={(e) => {
            if (e) {
              formik.setFieldValue("hours_2", e.target.value.replace(/\D/gm, ""));
            }
          }}
          error={formik.touched.hours_2 && formik.errors.hours_2}
          helperText={formik.touched.hours_2 && formik.errors.hours_2}
          // required
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="Short By"
          name="short_2"
          isMaxLenght={10}
          value={formik?.values?.short_2}
          onChange={(e) => {
            if (e) {
              formik.setFieldValue("short_2", e.target.value.replace(/\D/gm, ""));
            }
          }}
          error={formik.touched.short_2 && formik.errors.short_2}
          helperText={formik.touched.short_2 && formik.errors.short_2}
          // required
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <TextBox
          fullWidth
          isMaxLenght={50}
          label="Fourth Email"
          name="email_3"
          value={formik?.values?.email_3}
          onChange={formik.handleChange}
          error={formik.touched.email_3 && formik.errors.email_3}
          helperText={formik.touched.email_3 && formik.errors.email_3}
          // required
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="Hours"
          name="hours_3"
          isMaxLenght={10}
          value={formik?.values?.hours_3}
          onChange={(e) => {
            if (e) {
              formik.setFieldValue("hours_3", e.target.value.replace(/\D/gm, ""));
            }
          }}
          error={formik.touched.hours_3 && formik.errors.hours_3}
          helperText={formik.touched.hours_3 && formik.errors.hours_3}
          // required
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="Short By"
          name="short_3"
          isMaxLenght={10}
          value={formik?.values?.short_3}
          onChange={(e) => {
            if (e) {
              formik.setFieldValue("short_3", e.target.value.replace(/\D/gm, ""));
            }
          }}
          error={formik.touched.short_3 && formik.errors.short_3}
          helperText={formik.touched.short_3 && formik.errors.short_3}
          // required
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <TextBox
          fullWidth
          isMaxLenght={50}
          label="Fifth Email"
          name="email_4"
          value={formik?.values?.email_4}
          onChange={formik.handleChange}
          error={formik.touched.email_4 && formik.errors.email_4}
          helperText={formik.touched.email_4 && formik.errors.email_4}
          // required
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="Hours"
          name="hours_4"
          isMaxLenght={10}
          value={formik?.values?.hours_4}
          onChange={(e) => {
            if (e) {
              formik.setFieldValue("hours_4", e.target.value.replace(/\D/gm, ""));
            }
          }}
          error={formik.touched.hours_4 && formik.errors.hours_4}
          helperText={formik.touched.hours_4 && formik.errors.hours_4}
          // required
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="Short By"
          name="short_4"
          isMaxLenght={10}
          value={formik?.values?.short_4}
          onChange={(e) => {
            if (e) {
              formik.setFieldValue("short_4", e.target.value.replace(/\D/gm, ""));
            }
          }}
          error={formik.touched.short_4 && formik.errors.short_4}
          helperText={formik.touched.short_4 && formik.errors.short_4}
          // required
        />
      </Grid>
    </Grid>
  );
};

export default EmailFormSection;
