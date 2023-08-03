"use client";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import { DataTable } from "@/components/dataTable";
import Iconify from "@/components/iconify/Iconify";
import { PATH_DASHBOARD } from "@/routes/paths";
import { Button, Container, Tooltip } from "@mui/material";
import React from "react";
import NextLink from "next/link";
import { ContainerComponent } from "@/components/container";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";

const CompanyEmployeesList = () => {
  const { push } = useRouter();
  const title = "Client";
  const formUrl = `${PATH_DASHBOARD.client.clients}/form`;
  const actionUrl = "admin/catalog/clients";
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
      ],
    },
    {
      field: "name",
      headerName: "Name",
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
          action={
            <Button
              component={NextLink}
              href={`${formUrl}/new`}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Client
            </Button>
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
        />
      </ContainerComponent>
    </>
  );
};

export default CompanyEmployeesList;
