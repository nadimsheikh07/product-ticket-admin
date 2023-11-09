import {
  MuiAutocompleteBox,
  SelectMuiAutocomplete,
  TextBox,
} from "@/components/form";
import axiosInstance from "@/utils/axios";
import { Delete, Edit } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { includes, some } from "lodash";
import { useSnackbar } from "notistack";
import React from "react";

const DynamicAttributeForm = ({
  removeAttribute,
  addAttribute,
  attributes,
  attributeList = [],
  handleOpenCloseAttributes,
  updateAttribute,
  attributeData,
}) => {
  const [attribute, setAttribute] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      attribute_id: "",
      value: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.attribute_id) {
        errors.attribute_id = "Attribute is required";
      }
      if (!values.value) {
        errors.value = "Attribute value is required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      if (attributes?.id === "new") {
        if (
          !some(attributeList, (item) => {
            return Boolean(
              item?.attribute_id?.value === values?.attribute_id?.value
            );
          })
        ) {
          await addAttribute(values);
          handleOpenCloseAttributes("new");
          formik.resetForm();
        } else {
          enqueueSnackbar(
            "Attribute already selected. Please select different attribute.",
            {
              variant: "error",
            }
          );
        }
      } else {
        let newAttributes = [];
        attributeList &&
          attributeList?.length > 0 &&
          attributeList.forEach((element, index) => {
            if (index === attributes?.id) {
              newAttributes.push({
                attribute_id: values.attribute_id,
                value: values.value,
              });
            } else {
              newAttributes.push(element);
            }
          });
        await updateAttribute(newAttributes);
        handleOpenCloseAttributes("new");
        formik.resetForm();
      }
    },
  });

  const bindData = async (id) => {
    const data = attributeList.find((item, index) => index === attributes?.id);
    // bind form data from server
    for (const [key] of Object.entries(formik.values)) {
      if (data[key]) {
        formik.setFieldValue([key], data[key]);
      } else {
        formik.setFieldError(key, "");
      }
    }
  };

  React.useEffect(() => {
    if (attributes?.id > -1 && attributes?.id !== "new") {
      bindData(attributes?.id);
    }
  }, [attributes?.id, attributes?.open]);

  console.log("attributeList", attributeList);

  const getAttribute = async (params) => {
    setAttribute([]);
    await axiosInstance
      .get("/admin/attribute/attributes", {
        params: {
          isActive: true,
          ...params,
        },
      })
      .then((response) => {
        setAttribute([]);
        if (response.status === 200) {
          let options = [];
          response?.data &&
            response?.data?.length > 0 &&
            response?.data.forEach((item) => {
              if (attributeList?.length > 0) {
                if (
                  !some(attributeList, (checkExistItem) => {
                    return Boolean(
                      checkExistItem?.attribute_id?.value === item?.id
                    );
                  })
                ) {
                  options.push({
                    label: item?.name,
                    value: item?.id,
                    ...item,
                  });
                }
              } else {
                options.push({
                  label: item?.name,
                  value: item?.id,
                  ...item,
                });
              }
            });
          setAttribute(options);
        }
      })
      .catch((error) => {
        console.log("Select Attribute Error", error);
      });
  };

  React.useEffect(() => {
    getAttribute();
  }, [attributeList?.length]);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={12} sm={12} xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: "100%" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Sr no.</TableCell>
                  <TableCell>Attribute Name</TableCell>
                  <TableCell align="left">Attribute Value</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attributeList &&
                  attributeList?.length > 0 &&
                  attributeList.map((item, index) => {
                    return (
                      <TableRow
                        key={`Attribute-${index + 1}`}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell component="th" scope="row">
                          {item?.attribute_id?.label}
                        </TableCell>
                        <TableCell align="right">
                          <Typography
                            component="p"
                            variant="body2"
                            noWrap
                            maxWidth="26px"
                            width="100%"
                          >
                            {item.value}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={() => handleOpenCloseAttributes(index)}
                          >
                            <Edit />
                          </IconButton>

                          <IconButton
                            onClick={() => removeAttribute(index)}
                            color="error"
                          >
                            <Delete color="error" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item md={12} sm={12} xs={12} textAlign="end">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenCloseAttributes("new")}
          >
            Add Attributes
          </Button>
        </Grid>
      </Grid>

      <Dialog
        maxWidth="md"
        fullWidth={true}
        open={attributes?.open}
        onClose={() => {
          handleOpenCloseAttributes("new");
          formik.resetForm();
        }}
      >
        <DialogContent sx={{ py: 4 }}>
          <form noValidate onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Stack justifyContent="space-between" direction="row"mb={1}>
                  <Typography component="h4" variant="h4">
                    Product Attribute
                  </Typography>
                  <IconButton onClick={handleOpenCloseAttributes}>
                  <CloseIcon/>
                  </IconButton>
                </Stack>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                {/* <MuiAutocompleteBox
                  fullWidth
                  label="Attribute"
                  placeholder="Select attribute"
                  name="attribute_id"
                  url="attribute/attributes"
                  value={formik.values.attribute_id}
                  getOptionLabel="name"
                  getOptionValue="id"
                  onChange={(e) => formik.setFieldValue("attribute_id", e)}
                  error={
                    formik.touched.attribute_id && formik.errors.attribute_id
                  }
                  helperText={
                    formik.touched.attribute_id && formik.errors.attribute_id
                  }
                /> */}
                <SelectMuiAutocomplete
                  fullWidth
                  name="attribute_id"
                  label="Attribute"
                  value={formik.values.attribute_id}
                  placeholder="Select attribute"
                  onChange={(e) => {
                    if (e) {
                      formik.setFieldValue("attribute_id", e);
                    }
                  }}
                  options={attribute}
                  searchData={getAttribute}
                  helperText={
                    formik.touched.attribute_id && formik.errors.attribute_id
                  }
                  required
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextBox
                  fullWidth
                  disabled={!formik.values.attribute_id}
                  label="Attribute Value"
                  name="value"
                  value={formik?.values?.value}
                  onChange={formik.handleChange}
                  error={formik.touched.value && formik.errors.value}
                  helperText={formik.touched.value && formik.errors.value}
                  required
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Stack alignItems="flex-end" sx={{ mt: 1 }}>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={formik?.isSubmitting}
                  >
                    {attributes.id === "new"
                      ? "Create attribute"
                      : "Update attribute"}
                  </LoadingButton>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DynamicAttributeForm;
