import { DragDrop, MuiAutocompleteBox, SelectMuiAutocomplete, TextBox } from "@/components/form";
import SelectBox from "@/components/form/select";
import SelectAutocomplete from "@/components/form/selectAutocomplete";
import axiosInstance from "@/utils/axios";
import { status } from "@/utils/constant";
import { Box, Grid } from "@mui/material";
import { isEmpty } from "lodash";
import React, { useMemo } from "react";

const TicketsFormSection = ({ formik, id }) => {
  const [client, setClient] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [user, setUsers] = React.useState([]);


  const getUsers = async (search = null) => {
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
          setUser(options);
        }
      })
      .catch((error) => {
        console.log("Select Client Error", error);
      });
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  const getClient = async (search = null) => {
    setProducts([]);
    await axiosInstance
      .get("admin/user/users", {
        params: {
          page: 1,
          pageSize: 10,
          search: search,
          user_type: "client",
          client_id: formik.values.client_id,
          isActive: true,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setClient(response?.data?.data);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  React.useEffect(() => {
    getClient();

    return () => {
      getClient();
    };
  }, [formik.values.client_id]);

  const getProduct = async (search = null, client_id) => {
    setProducts([]);
    await axiosInstance
      .get("admin/catalog/products", {
        params: {
          page: 1,
          pageSize: 10,
          search: search,
          client_id: client_id,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setProducts(response?.data?.data);
        }
      })
      .catch((error) => {
        setProducts([]);
        console.log("Client Error", error);
      });
  };

  React.useEffect(() => {
    if (id !== "new" && formik.values.client_id) {
      getProduct(null, formik.values.client_id);
    }
  }, [formik.values.client_id, id, formik.values.product_id]);

  console.log("formik.values.status", formik.values);
  return (
    <Grid container spacing={2}>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        {/* <MuiAutocompleteBox
          fullWidth
          label="Assign To"
          placeholder="Select user"
          name="user_id"
          url="user/users"
          value={formik.values.user_id}
          getOptionLabel="name"
          getOptionValue="id"
          paramsID={useMemo(
            () => ({
              user_type: "admin,user",
              isActive: true,
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
        /> */}
         <SelectMuiAutocomplete
          fullWidth
          name="user_id"
          label="Assign to"
          value={formik.values.user_id}
          placeholder="Select User"
          onChange={(e) => {
            if (e) {
              formik.setFieldValue("user_id", e);
            }
          }}
          options={user}
          searchData={getUsers}
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <SelectAutocomplete
          fullWidth
          disabled={id && id !== "new"}
          label="Client"
          placeholder="Select Client"
          name="client_id"
          value={formik.values.client_id}
          getOptionLabel="name"
          getOptionValue="id"
          onChange={(e) => {
            if (e) {
              setProducts([]);
              getProduct(null, e);
              formik.setFieldValue("client_id", e);
              formik.setFieldValue("product_id", null);
            } else {
              formik.setFieldValue("client_id", null);
              formik.setFieldValue("product_id", null);
              setProducts([]);
              getProduct(null, null);
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
          disabled={!formik.values.client_id || (id && id !== "new")}
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
          options={formik.values.client_id ? products : []}
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
          // types={["JPG", "PNG", "GIF", "JFIF", "JPEG"]}
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
