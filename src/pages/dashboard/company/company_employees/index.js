"use client";
import { ContainerComponent } from "@/components/container";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import { DataTable } from "@/components/dataTable";
import Iconify from "@/components/iconify/Iconify";
import Label from "@/components/label";
import useCompany from "@/hooks/useCompany";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { AddFormButton } from "@/module/auth/addFormButton";
import { PATH_DASHBOARD } from "@/routes/paths";
import DialogClientPasswords from "@/sections/dashboard/client/dialogClientPassword/dialogpassword";
import { Badge, Box, Tooltip } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";

import { useRouter } from "next/router";
import React from "react";
// import Head from "next/document";

const CompanyEmployeesLists = (formik) => {
  const [open, setOpen] = React.useState(false);

  const { push } = useRouter();
  const title = "Employees";
  const formUrl = `${PATH_DASHBOARD.company.company_employees}/form`;
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
          label="Password"
          onClick={handleClickOpen}
        />,
      ],
    },
    {
      field: "name",
      headerName: "Employee Name",
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
      <Box>
        <DialogClientPasswords handleClose={handleClose} open={open} />
      </Box>
      <ContainerComponent>
        <CustomBreadcrumbs
          heading="Company Employee List"
          links={[
            {
              name: "Dashboard",
              href: PATH_DASHBOARD.app,
            },
            {
              name: "Company Employee",
              // href: "#",
            },
            {
              name: "List",
            },
          ]}
          action={
            <AddFormButton title=" New Employee" url={`${formUrl}/new`} />
          }
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
            user_type: process.env.NEXT_PUBLIC_EMPLOYEE_TYPE,
          }}
        />
      </ContainerComponent>
    </>
  );
};
CompanyEmployeesLists.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default CompanyEmployeesLists;
