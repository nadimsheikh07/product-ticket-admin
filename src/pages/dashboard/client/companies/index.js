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

const CompanyList = () => {
  const { push } = useRouter();
  const title = "Company List";
  const formUrl = `${PATH_DASHBOARD.company.companies}/form`;
  const actionUrl = "admin/catalog/companies";
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
      headerName: "Company Name",
      width: "200",
    },
    {
      field: "email",
      headerName: "Email",
      width: "200",
    },
    // {
    //   field: "password",
    //   headerName: "Password",
    //   width: "200",
    // },
    {
      field: "phone",
      headerName: "Phone",
      width: "200",
    },
    // },
    {
      field: "address",
      headerName: "Address",
      width: "200",
    },
  ];

  return (
    <>
      <ContainerComponent>
        <CustomBreadcrumbs
          heading="Company List"
          links={[
            {
              name: "Dashboard",
              href: PATH_DASHBOARD.app,
            },
            {
              name: "Companies",
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
              New Company
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
CompanyList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CompanyList;
