"use client";
import { ContainerComponent } from "@/components/container";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import { DataTable } from "@/components/dataTable";
import Iconify from "@/components/iconify/Iconify";
import Label from "@/components/label";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { PATH_DASHBOARD } from "@/routes/paths";
import { Avatar, Button, Tooltip } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

const CompanyList = () => {
  const { push } = useRouter();
  const title = "Company List";
  const formUrl = `${PATH_DASHBOARD.company.companies}/form`;
  const actionUrl = "admin/company/companies";
  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: "140",
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
      field: "logo",
      headerName: "Company Logo",
      width: "200",
      renderCell: ({ row }) => {
        return (
          <Avatar
            url="api/upload/image"
            variant="rounded"
            sx={{
              "&.MuiAvatar-root": {
                width: "80px !important",
                "& .MuiAvatar-img": {
                  objectFit: "contain",
                },
              },
            }}
            src={row?.logo}
            alt={row?.company?.name}
          />
        );
      },
    },
    {
      field: "name",
      headerName: "Company Name",
      width: "200",
    },
    {
      field: "code",
      headerName: "Company Code",
      width: "200",
    },
   
    {
      field: "email",
      headerName: "Email",
      width: "200",
    },
   
    {
      field: "phone_number",
      headerName: "Phone",
      width: "200",
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
          isRowSelectable={(params) => params?.row?.id !== 1}
          disableRowSelectionOnClick={true}
        />
      </ContainerComponent>
    </>
  );
};
CompanyList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CompanyList;
