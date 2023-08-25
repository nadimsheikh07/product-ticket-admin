import {
  DatePickerBox,
  DateTimePickerBox,
  DragDrop,
  MuiAutocompleteBox,
  PasswordBox,
  TextBox,
} from "@/components/form";
import { Box, Button, Grid, Stack } from "@mui/material";
import { useParams } from "next/navigation";
import React from "react";

const ProductsFormSection = ({ formik, generateCode }) => {
  const { id } = useParams();
  return (
    <Grid container spacing={2}>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <MuiAutocompleteBox
          fullWidth
          label="Client"
          placeholder="Select client"
          name="client_id"
          url="user/clients"
          value={formik.values.client_id}
          getOptionLabel="name"
          getOptionValue="id"
          onChange={(e) => formik.setFieldValue("client_id", e)}
          error={formik.touched.client_id && formik.errors.client_id}
          helperText={formik.touched.client_id && formik.errors.client_id}
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextBox
            fullWidth
            disabled={true}
            label="Code"
            name="code"
            value={formik?.values?.code}
            onChange={formik.handleChange}
            error={formik.touched.code && formik.errors.code}
            helperText={formik.touched.code && formik.errors.code}
            required
          />
          <Box>
            <Button
              disabled={id !== "new"}
              variant="outlined"
              color="primary"
              onClick={() => generateCode()}
              sx={{ width: "max-content" }}
            >
              Generate code
            </Button>
          </Box>
        </Stack>
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <MuiAutocompleteBox
        //  disabled={id === "new"}
          fullWidth
          isMaxLenght={10}
          label="Phone"
          placeholder="Select client Phone"
          name="phone"
          url="user/clients"
          value={formik.values.phone}
          getOptionLabel="phone"
          getOptionValue="id"
          onChange={(e) => formik.setFieldValue("phone", e)}
          error={formik.touched.phone && formik.errors.phone}
          helperText={formik.touched.phone && formik.errors.phone}
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextBox
          fullWidth
          isMaxLenght={20}
          label="Product Name"
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
          label="Model"
          isMaxLenght={10}
          name="model"
          value={formik?.values?.model}
          onChange={formik.handleChange}
          error={formik.touched.model && formik.errors.model}
          helperText={formik.touched.model && formik.errors.model}
          required
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="Invoice No."
          isMaxLenght={30}
          name="invoice_number"
          value={formik?.values?.invoice_number}
          onChange={formik.handleChange}
          error={formik.touched.invoice_number && formik.errors.invoice_number}
          helperText={
            formik.touched.invoice_number && formik.errors.invoice_number
          }
          required
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <DatePickerBox
          fullWidth
          label="Invoice Date"
          name="invoice_date"
          formik={formik}
          onChange={(e) => {
            formik.setFieldValue("password", e.target.value.trim());
          }}
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <DatePickerBox
          fullWidth
          label="Warranty Start"
          name="warranty_start"
          formik={formik}
          onChange={(e) => {
            formik.setFieldValue("password", e.target.value.trim());
          }}
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <DatePickerBox
          fullWidth
          label="Warranty End"
          name="warranty_end"
          formik={formik}
          onChange={(e) => {
            formik.setFieldValue("password", e.target.value.trim());
          }}
        />
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="Detail"
          isMaxLenght={250}
          placeholder="Enter detail"
          name="detail"
          multiline={true}
          rows={3}
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
