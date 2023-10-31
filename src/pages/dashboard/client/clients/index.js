"use client";
import { ContainerComponent } from "@/components/container";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import { DataTable } from "@/components/dataTable";
import Iconify from "@/components/iconify/Iconify";
import Label from "@/components/label";
import useCompany from "@/hooks/useCompany";
import { AddFormButton } from "@/module/auth/addFormButton";
import { PATH_DASHBOARD } from "@/routes/paths";
import { Alert, Button, Tooltip } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";

import { useRouter } from "next/router";
// import Head from "next/document";

const CompanyEmployeesList = () => {
  const { push } = useRouter();
  const title = "Client";
  const formUrl = `${PATH_DASHBOARD.client.clients}/form`;
  const actionUrl = "admin/user/users";
  const { companyId } = useCompany();
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

export default CompanyEmployeesList;
