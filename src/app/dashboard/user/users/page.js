"use client";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import { DataTable } from "@/components/dataTable";
import Iconify from "@/components/iconify/Iconify";
import { PATH_DASHBOARD } from "@/routes/paths";
import { Button, Container, Tooltip } from "@mui/material";
import React, { useMemo } from "react";
import NextLink from "next/link";
import { ContainerComponent } from "@/components/container";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";

const UserList = () => {
  const { push } = useRouter();
  const title = "User List";
  const formUrl = `${PATH_DASHBOARD.user.user}/form`;
  const actionUrl = "admin/user/users";
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
      field: "user_type",
      headerName: "User Type",
      width: 140,
      renderCell: ({ row }) => {
        return row?.user_type?.user_type;
      },
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
  ];

  return (
    <>
      <ContainerComponent>
        <CustomBreadcrumbs
          heading="User List"
          links={[
            {
              name: "Dashboard",
              href: PATH_DASHBOARD.app,
            },
            {
              name: "Users",
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
              New User
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
          params={useMemo(
            () => ({
              user_type: "admin,user",
            }),
            []
          )}
        />
      </ContainerComponent>
    </>
  );
};

export default UserList;
