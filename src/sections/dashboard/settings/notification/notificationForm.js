import {
  DragDrop,
  MuiAutocompleteBox,
  PasswordBox,
  TextBox,
} from "@/components/form";
import { Grid } from "@mui/material";
import React from "react";

const NotificationFormSection = ({ formik, id }) => {
  return (
    <Grid container spacing={2}>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <TextBox
          fullWidth
          isMaxLenght={50}
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
          isMaxLenght={250}
          label="Description"
          multiline={true}
          rows={3}
          name="address"
          value={formik?.values?.address}
          onChange={formik.handleChange}
          error={formik.touched.address && formik.errors.address}
          helperText={formik.touched.address && formik.errors.address}
          // required
        />
      </Grid>
    </Grid>
  );
};

export default NotificationFormSection;
