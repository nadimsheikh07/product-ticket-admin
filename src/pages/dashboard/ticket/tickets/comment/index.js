import { TextBox } from "@/components/form";
import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { ContainerComponent } from "@/components/container";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { PATH_DASHBOARD } from "@/routes/paths";
import { TicketsFormSection } from "@/sections/dashboard/ticket/tickets";
import axiosInstance from "@/utils/axios";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";
import SelectBox from "@/components/form/select";
import { status } from "@/utils/constant";

const TicketComment = ({ open, handleClose }) => {
  const router = useRouter();
  const { id } = router.query;
  const actionUrl = "admin/catalog/tickets";

  const formik = useFormik({
    initialValues: {
      detail: "",
      status: "pending",
    },
    onSubmit: async (values) => {
      let method = "POST";
      let url = actionUrl;
      if (id != "new") {
        method = "PUT";
        url = `${actionUrl}/${id}`;
      }

      await axiosInstance.request({
        method: method,
        url: url,
        data: values,
      });
    },
  });

  return (
    <>
      <Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="Comment"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">
            {"Please Add Your Comment"}
          </DialogTitle>
          <Container>
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
            <TextBox
              fullWidth
              label="Commant"
              isMaxLenght={250}
              placeholder="Enter Comment"
              name="detail"
              multiline={true}
              rows={4}
              value={formik.values.detail}
              onChange={formik.handleChange}
              error={formik.touched.detail && formik.errors.detail}
              helperText={formik.touched.detail && formik.errors.detail}
            />
          </Container>

          <DialogActions>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={formik?.isSubmitting}
            >
              Submit
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default TicketComment;
