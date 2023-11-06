import {
  DatePickerBox,
  DateTimePickerBox,
  DragDrop,
  MuiAutocompleteBox,
  PasswordBox,
  SelectMuiAutocomplete,
  TextBox,
} from "@/components/form";
import axiosInstance from "@/utils/axios";
import { Box, Button, Grid, Stack } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

const ProductsFormSection = ({ formik, generateCode }) => {
  const router = useRouter();
  const [client, setClient] = React.useState([]);
  const { id } = router.query;

  const getClient = async (search = null) => {
    await axiosInstance
      .get("/admin/user/users", {
        params: {
          isActive: true,
          search: search,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          let options = [];
          response?.data &&
            response?.data?.length > 0 &&
            response?.data.forEach((item) => {
              options.push({
                label: item?.name,
                value: item?.id,
                ...item,
              });
            });
          setClient(options);
        }
      })
      .catch((error) => {
        console.log("Select Client Error", error);
      });
  };

  React.useEffect(() => {
    getClient();
  }, []);
  return (
    <Grid container spacing={2}>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <SelectMuiAutocomplete
          fullWidth
          name="client_id"
          label="Clients"
          value={formik.values.client_id}
          placeholder="Select Client"
          onChange={(e) => {
            if (e) {
              formik.setFieldValue("client_id", e);
            }
          }}
          options={client}
          searchData={getClient}
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
          <Box sx={{ height: "max-content" }}>
            <Button
              disabled={id !== "new"}
              variant="outlined"
              color="primary"
              onClick={() => generateCode()}
              sx={{ width: "max-content" }}
              fullWidth
            >
              Generate code
            </Button>
          </Box>
        </Stack>
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
          label="Serial No."
          isMaxLenght={10}
          name="serial_number"
          value={formik?.values?.serial_number}
          onChange={(e) => {
            formik.setFieldValue("serial_number", e.target.value.trim());
          }}
          error={formik.touched.serial_number && formik.errors.serial_number}
          helperText={
            formik.touched.serial_number && formik.errors.serial_number
          }
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="Invoice No."
          isMaxLenght={10}
          name="invoice_number"
          value={formik?.values?.invoice_number}
          onChange={(e) => {
            formik.setFieldValue("invoice_number", e.target.value.trim());
          }}
          error={formik.touched.invoice_number && formik.errors.invoice_number}
          helperText={
            formik.touched.invoice_number && formik.errors.invoice_number
          }
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <DatePickerBox
          disablePast={true}
          fullWidth
          label="Invoice Date"
          name="invoice_date"
          value={formik.values.invoice_date}
          onChange={(e) => {
            formik.setFieldValue("invoice_date", dayjs(e).format("YYYY-MM-DD"));
          }}
          format="DD/MM/YYYY"
          placeholder="DD/MM/YYYY"
          helperText={formik.touched.invoice_date && formik.errors.invoice_date}
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <DatePickerBox
          disablePast={false}
          fullWidth
          label="Warranty Start"
          name="warranty_start"
          value={formik.values.warranty_start}
          onChange={(e) => {
            formik.setFieldValue(
              "warranty_start",
              dayjs(e).format("YYYY-MM-DD")
            );
            formik.setFieldValue("warranty_end", null);
          }}
          format="DD/MM/YYYY"
          placeholder="DD/MM/YYYY"
          helperText={
            formik.touched.warranty_start && formik.errors.warranty_start
          }
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <DatePickerBox
          disablePast={false}
          fullWidth
          label="Warranty End"
          name="warranty_end"
          value={formik.values.warranty_end}
          onChange={(e) => {
            formik.setFieldValue("warranty_end", dayjs(e).format("YYYY-MM-DD"));
          }}
          format="DD/MM/YYYY"
          placeholder="DD/MM/YYYY"
          helperText={formik.touched.warranty_end && formik.errors.warranty_end}
          minDate={formik.values.warranty_start}
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
