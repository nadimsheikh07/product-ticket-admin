import { DragDrop, SelectMuiAutocomplete, TextBox } from "@/components/form";
import SelectBox from "@/components/form/select";
import axiosInstance from "@/utils/axios";
import { status } from "@/utils/constant";
import { Grid } from "@mui/material";
import React from "react";

const TicketsFormSection = ({ formik, id }) => {
  const [user, setUser] = React.useState([]);
  const [client, setClient] = React.useState([]);
  const [products, setProducts] = React.useState([]);

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

  const getUser = async (params) => {
    await axiosInstance
      .get("/admin/user/users", {
        params: {
          isActive: true,
          user_type: "admin,user",
          ...params,
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
          setUsers(options);
        }
      })
      .catch((error) => {
        console.log("Select User Error", error);
      });
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  const getClients = async (params) => {
    setProducts([]);
    await axiosInstance
      .get("admin/user/users", {
        params: {
          user_type: process.env.NEXT_PUBLIC_CLIENT_TYPE,
          isActive: true,
          ...params,
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
          setClients(options);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  React.useEffect(() => {
    getClients();
  }, []);

  const getProduct = async (params) => {
    setProducts([]);
    await axiosInstance
    .get("admin/catalog/products", {
      params: {
        ...params,
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
          setProducts(options);
        }
      })
      .catch((error) => {
        setProducts([]);
        console.log("Client Error", error);
      });
  };

  // React.useEffect(() => {
  //   if (formik.values.client_id) {
  //     getProduct(null);
  //   }
  // }, [formik.values.client_id, id]);

  // console.log("formik.values.status", formik.values);
  return (
    <Grid container spacing={2}>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <SelectMuiAutocomplete
          fullWidth
          name="user_id"
          label="Assign To"
          placeholder="Select User"
          value={formik.values.user_id}
          onChange={(e) => {
            if (e) {
              formik.setFieldValue("user_id", e);
            } else {
              formik.setFieldValue("user_id", null);
            }
          }}
          options={users}
          searchData={getUsers}
          helperText={formik.touched.user_id && formik.errors.user_id}
          required
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <SelectMuiAutocomplete
          disabled={id !== "new"}
          fullWidth
          name="client_id"
          label="Client"
          placeholder="Select Client"
          value={formik.values.client_id}
          onChange={(e) => {
            if (e) {
              setProducts([]);
              getProducts({
                search: null,
                client_id: e?.value ? e?.value : "",
              });
              formik.setFieldValue("client_id", e);
              formik.setFieldValue("product_id", null);
            } else {
              formik.setFieldValue("client_id", null);
              formik.setFieldValue("product_id", null);
              setProducts([]);
            }
          }}
          options={clients}
          searchData={getClients}
          helperText={formik.touched.client_id && formik.errors.client_id}
          required
        />
      </Grid>
      {console.log("productsproducts", getProducts)}
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <SelectMuiAutocomplete
          fullWidth
          disabled={!formik.values.client_id || id !== "new"}
          name="product_id"
          label="Product"
          placeholder="Select Product"
          value={formik.values.product_id}
          onChange={(e) => {
            formik.setFieldValue("product_id", e || null);
          }}
          options={products}
          searchData={getProducts}
          params={React.useMemo(
            () => ({
              client_id: formik.values.client_id?.value || "",
            }),
            [formik.values.client_id]
          )}
          helperText={formik.touched.product_id && formik.errors.product_id}
          required
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
