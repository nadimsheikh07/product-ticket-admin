"use client";
import { ContainerComponent } from "@/components/container";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import { DataTable } from "@/components/dataTable";
import { PasswordBox } from "@/components/form";
import Iconify from "@/components/iconify/Iconify";
import Label from "@/components/label";
import useCompany from "@/hooks/useCompany";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { AddFormButton } from "@/module/auth/addFormButton";
import { PATH_DASHBOARD } from "@/routes/paths";
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Badge, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Tooltip } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";

import { useRouter } from "next/router";
import React from "react";
// import Head from "next/document";

const CompanyEmployeesList = (formik) => {
  const [open, setOpen] = React.useState(false);

  const { push } = useRouter();
  const title = "Client";
  const formUrl = `${PATH_DASHBOARD.client.clients}/form`;
  const actionUrl = "admin/user/users";
  const { companyId } = useCompany();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: "200",
      getActions: (params) => [
        <GridActionsCellItem
          key="viewAction"
          icon={
            <Tooltip title="Edit">
              <Iconify icon="circum:edit" width={25} />
            </Tooltip>
          }
          label="Edit"
          onClick={() => push(`${formUrl}/${params.id}`)}
        />,
        <GridActionsCellItem
          key="password"
          icon={
            <Tooltip title="Password">
              <Badge color="primary" variant="standard">
                <Iconify icon="mdi:password" width={25} />
              </Badge>
            </Tooltip>
          }
          label="Chat"
          onClick={handleClickOpen}
        />,
      ],
    },
    {
      field: "name",
      headerName: "Client Name",
      width: "200",
      isfilter: false,
      disableColumnFilter: true,
    },
    {
      field: "is_active",
      headerName: "Is Active",
      width: 140,
      renderCell: ({ row }) => {
        if (row.is_active) {
          return <Label color="primary">Active</Label>;
        } else {
          return <Label color="error">InActive</Label>;
        }
      },
    },
    {
      field: "company_id",
      headerName: "Company Name",
      width: "200",
    },
    {
      field: "email",
      headerName: "Email",
      width: "200",
    },
    {
      field: "phone",
      headerName: "Phone",
      width: "200",
    },
    {
      field: "address",
      headerName: "Address",
      width: "200",
    },
    // {
    //   field: "phone",
    //   headerName: "Phone",
    //   width: "200",
    // },
  ];

  return (
    <>
      {/* <Head>
      <title>
        login
      </title>
    </Head> */}

    <Box>
    <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
       
      >
        <DialogTitle sx={{ m: 0, p: 2 , mb:2}}>
          Update Password
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 12,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Container sx={{mb:1}}>
          <PasswordBox
            fullWidth
            label="Password"
            name="password"
            value={formik?.values?.password}
            // onChange={(e) => {
            //   formik.setFieldValue("password", e.target.value.trim().replace);
            // }}
            // error={formik.touched.password && formik.errors.password}
            // helperText={formik.touched.password && formik.errors.password}
            required
          />
        </Container>
        <Container>
          <PasswordBox
            fullWidth
            label="Conform Password"
            name="conform_password"
            value={formik?.values?.conform_password}
            // onChange={(e) => {
            //   formik.setFieldValue("conform_password", e.target.value.trim().replace);
            // }}
            // error={formik.touched.conform_password && formik.errors.conform_password}
            // helperText={formik.touched.conform_password && formik.errors.conform_password}
            required
          />
        </Container>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
      <ContainerComponent>
        <CustomBreadcrumbs
          heading="Client List"
          links={[
            {
              name: "Dashboard",
              href: PATH_DASHBOARD.app,
            },
            {
              name: "Clients",
              // href: "#",
            },
            {
              name: "List",
            },
          ]}
          action={<AddFormButton title=" New Client" url={`${formUrl}/new`} />}
        />

        <DataTable
          title={title}
          actionUrl={actionUrl}
          defaultSortModel={[{ field: "updated_at", sort: "desc" }]}
          defaultFilterModel={{
            items: [],
          }}
          columns={columns}
          checkboxSelection={true}
          disableRowSelectionOnClick={true}
          params={{
            user_type: "client",
          }}
        />
      </ContainerComponent>
    </>
  );
};
CompanyEmployeesList.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default CompanyEmployeesList;
