import {
  DragDrop,
  MuiAutocompleteBox,
  PasswordBox,
  TextBox,
  ToggleBox,
} from "@/components/form";
import { Grid } from "@mui/material";
import React from "react";

const ClientFormSection = ({ formik, id }) => {
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
      {/* <Grid item lg={6} md={6} sm={12} xs={12}>
        <MuiAutocompleteBox
          fullWidth
          label="Company"
          placeholder="Select Company"
          name="company_id"
          // url="user/users"
          value={formik.values.company_id}
          getOptionLabel="name"
          getOptionValue="id"
          onChange={(e) => {
            if (e) {
              formik.setFieldValue("company_id", e);
            }
          }}
          error={formik.touched.company_id && formik.errors.company_id}
          helperText={formik.touched.company_id && formik.errors.company_id}
        />
      </Grid> */}
      <Grid
        item
        lg={id === "new" ? 6 : 6}
        md={id === "new" ? 6 : 6}
        sm={12}
        xs={12}
      >
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
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextBox
          fullWidth
          isMaxLenght={50}
          label="Email"
          name="email"
          value={formik?.values?.email}
          onChange={formik.handleChange}
          error={formik.touched.email && formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
          required
        />
      </Grid>
      {id === "new" && (
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <PasswordBox
            fullWidth
            label="Password"
            name="password"
            value={formik?.values?.password}
            onChange={(e) => {
              formik.setFieldValue("password", e.target.value.trim().replace(" ",""));
            }}
            error={formik.touched.password && formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
            required
          />
        </Grid>
      )}
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <TextBox
          fullWidth
          isMaxLenght={250}
          label="Address"
          multiline={true}
          rows={3}
          name="address"
          value={formik?.values?.address}
          onChange={formik.handleChange}
          error={formik.touched.address && formik.errors.address}
          helperText={formik.touched.address && formik.errors.address}
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

export default ClientFormSection;
