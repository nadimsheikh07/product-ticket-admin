import {
  DragDrop,
  MuiAutocompleteBox,
  PasswordBox,
  TextBox,
  ToggleBox,
} from "@/components/form";
import { Grid } from "@mui/material";
import React from "react";

const AttributeFormSection = ({ formik, id }) => {
  return (
    <Grid container spacing={2}>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextBox
          fullWidth
          isMaxLenght={20}
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
    </Grid>
  );
};

export default AttributeFormSection;
