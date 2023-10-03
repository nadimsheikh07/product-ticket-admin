import { DragDrop, MuiAutocompleteBox, TextBox } from "@/components/form";
import SelectBox from "@/components/form/select";
import SelectAutocomplete from "@/components/form/selectAutocomplete";
import axiosInstance from "@/utils/axios";
import { status } from "@/utils/constant";
import { Box, Grid } from "@mui/material";
import React, { useMemo } from "react";

const TicketsFormSection = ({ formik, id }) => {
  const [client, setClient] = React.useState([]);
  const [product, setProduct] = React.useState([]);

  const getClient = async (search = null) => {
    await axiosInstance
      .get("admin/user/users", {
        params: {
          page: 1,
          pageSize: 10,
          search: search,
          user_type: "client",
          client_id: formik.values.client_id,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setClient(response?.data?.data);
        }
      })
      .catch((error) => {
        console.log("Country Error", error);
      });
  };

  const getProduct = async (search = null, client_id) => {
    await axiosInstance
      .get("admin/catalog/products", {
        params: {
          page: 1,
          pageSize: 10,
          search: search,
          country_id: client_id,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setProduct(response?.data?.data);
        }
      })
      .catch((error) => {
        console.log("Client Error", error);
      });
  };

  React.useEffect(() => {
    getClient();
  }, [formik.values.client_id]);

  console.log("formik.values.status", formik.values);
  return (
    <Grid container spacing={2}>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <MuiAutocompleteBox
          fullWidth
          label="User"
          placeholder="Select user"
          name="user_id"
          url="user/users"
          value={formik.values.user_id}
          getOptionLabel="name"
          getOptionValue="id"
          paramsID={useMemo(
            () => ({
              admin_client: "admin_client",
            }),
            []
          )}
          onChange={(e) => {
            if (e) {
              formik.setFieldValue("user_id", e);
            }
          }}
          error={formik.touched.user_id && formik.errors.user_id}
          helperText={formik.touched.user_id && formik.errors.user_id}
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <SelectAutocomplete
          fullWidth
          label="Client"
          placeholder="Select Client"
          name="client_id"
          value={formik.values.client_id}
          getOptionLabel="name"
          getOptionValue="id"
          onChange={(e) => {
            if (e) {
              setProduct([]);
              getProduct(null, e);
              formik.setFieldValue("client_id", e);
              formik.setFieldValue("product_id", null);
            } else {
              formik.setFieldValue("client_id", null);
              formik.setFieldValue("product_id", null);
              setProduct([]);
            }
          }}
          onInputChange={(e) => {
            if (e) {
              getClient(e);
            }
          }}
          options={client}
          helperText={formik.touched.client_id && formik.errors.client_id}
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <SelectAutocomplete
          fullWidth
          label="Product"
          placeholder="Select Product"
          name="product_id"
          value={formik.values.product_id}
          getOptionLabel="name"
          getOptionValue="id"
          onChange={(e) => {
            if (e) {
              formik.setFieldValue("product_id", e);
            } else {
              formik.setFieldValue("product_id", null);
            }
          }}
          onInputChange={(e) => {
            if (e) {
              getProduct(e, formik.values.client_id);
            }
          }}
          options={product}
          helperText={formik.touched.product_id && formik.errors.product_id}
        />
      </Grid>

      <Grid item lg={6} md={6} sm={12} xs={12}>
        <SelectBox
          fullWidth
          label="Status"
          placeholder="Select"
          name="status"
          options={status}
          value={String(formik.values.status)}
          onChange={formik.handleChange}
          error={formik.touched.status && formik.errors.status}
          helperText={formik.touched.status && formik.errors.status}
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
          label="Detail"
          isMaxLenght={250}
          placeholder="Enter detail"
          multiline={true}
          rows={3}
          name="detail"
          value={formik.values.detail}
          onChange={formik.handleChange}
          error={formik.touched.detail && formik.errors.detail}
          helperText={formik.touched.detail && formik.errors.detail}
        />
      </Grid>
    </Grid>
  );
};

export default TicketsFormSection;
