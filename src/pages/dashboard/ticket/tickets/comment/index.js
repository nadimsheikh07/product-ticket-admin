import { TextBox } from "@/components/form";
import {
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import axiosInstance from "@/utils/axios";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import SelectBox from "@/components/form/select";
import { status } from "@/utils/constant";
import { useSnackbar } from "notistack";

const TicketComment = ({
  open,
  handleClose,
  ticket_id,
  getTicketDetail,
  getTicketComment,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { id } = router.query;
  const actionUrl = "admin/ticket_comment/ticket_comments";

  const formik = useFormik({
    initialValues: {
      detail: "",
      status: "pending",
      ticket_id: ticket_id,
    },
    onSubmit: async (values) => {
      let method = "POST";
      let url = actionUrl;

      await axiosInstance
        .request({
          method: method,
          url: url,
          data: values,
        })
        .then((response) => {
          if (response?.status === 200) {
            handleClose();
            if (response?.data?.message) {
              enqueueSnackbar(response?.data?.message, { variant: "success" });
              getTicketDetail();
              getTicketComment();
            }
          }
        })
        .catch((error) => {
          const { response } = error;
          if (response?.data?.message) {
            enqueueSnackbar(response?.data?.message, { variant: "error" });
          }
        });
    },
  });

  React.useEffect(() => {
    formik.setFieldValue("ticket_id", ticket_id);
  }, [ticket_id]);
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
          <form noValidate onSubmit={formik.handleSubmit}>
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
          </form>
        </Dialog>
      </Box>
    </>
  );
};

export default TicketComment;
