import Iconify from "@/components/iconify";
import useCompany from "@/hooks/useCompany";
import { Alert, Button } from "@mui/material";
import NextLink from "next/link";
import React from "react";

export const AddFormButton = ({
  url,
  title,
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
        <Button
          component={NextLink}
          href={`${formUrl}/new`}
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          {title}
        </Button>
      )}
    </>
  );
};
