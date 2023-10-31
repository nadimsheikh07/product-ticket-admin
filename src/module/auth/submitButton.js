import Iconify from "@/components/iconify";
import useCompany from "@/hooks/useCompany";
import { LoadingButton } from "@mui/lab";
import { Alert, Button } from "@mui/material";
import React from "react";

export const SubmitButton = ({
  title = "Submit",
  loading,
  alertText = "Please select company first.",
}) => {
  const { companyId } = useCompany();
  return (
    <>
      {!companyId ? (
        <>
          <Alert variant="outlined" severity="error">
            {alertText}
          </Alert>
        </>
      ) : (
        <LoadingButton type="submit" variant="contained" loading={loading}>
          {title}
        </LoadingButton>
      )}
    </>
  );
};
