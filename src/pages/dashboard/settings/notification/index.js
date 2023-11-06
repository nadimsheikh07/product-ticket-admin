"use client";
import { ContainerComponent } from "@/components/container";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import { DataTable } from "@/components/dataTable";
import Iconify from "@/components/iconify/Iconify";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { PATH_DASHBOARD } from "@/routes/paths";
import { Button, Tooltip } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import NextLink from "next/link";
import { useRouter } from "next/router";
// import Head from "next/document";

const CompanyEmployeesList = () => {
  const { push } = useRouter();
  const title = "Notification";
  const formUrl = `${PATH_DASHBOARD.settings.notification}/form`;
  const actionUrl = "admin/user/clients";
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
      headerName: "Employee Name",
      width: "200",
    },
    // {
    //   field: "company_id",
    //   headerName: "Company Name",
    //   width: "200",
    // },
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
          heading={`${title} List`}
          links={[
            {
              name: "Dashboard",
              href: PATH_DASHBOARD.app,
            },
            {
              name: title,
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
              New Notification
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
          disableRowSelectionOnClick={true}
        />
      </ContainerComponent>
    </>
  );
};
CompanyEmployeesList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CompanyEmployeesList;
