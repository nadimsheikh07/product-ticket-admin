"use client";
import { ContainerComponent } from "@/components/container";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import { DataTable } from "@/components/dataTable";
import Iconify from "@/components/iconify/Iconify";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { AddFormButton } from "@/module/auth/addFormButton";
import { PATH_DASHBOARD } from "@/routes/paths";
import { Button, Tooltip } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

const UserList = () => {
  const { push } = useRouter();
  const title = "User List";
  const formUrl = `${PATH_DASHBOARD.user.user}/form`;
  const actionUrl = "admin/user/get_admins";
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
      width: "140",
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
          action={<AddFormButton title="New Admin" url={`${formUrl}/new`} />}

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
              user_type: process.env.NEXT_PUBLIC_SUPER_ADMIN_TYPE,
            }),
            []
          )}
        />
      </ContainerComponent>
    </>
  );
};
UserList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default UserList;
