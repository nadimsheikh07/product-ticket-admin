import { SelectAutocomplete } from "@/components/form";
import axiosInstance from "@/utils/axios";
import { Grid } from "@mui/material";
import React from "react";

const RelationModule = ({ formik }) => {
  const [client, setClient] = React.useState([]);
  const [product, setProduct] = React.useState([]);

  const getClient = async (search = null) => {
    await axiosInstance
      .get("admin/user/clients", {
        params: {
          page: 1,
          pageSize: 10,
          search: search,
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

  console.log("formik.values", formik.values);

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};
export default RelationModule;
