"use client";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import { DataTable } from "@/components/dataTable";
import Iconify from "@/components/iconify/Iconify";
import { PATH_DASHBOARD } from "@/routes/paths";
import { Button, Chip, Container, Tooltip } from "@mui/material";
import React from "react";
import NextLink from "next/link";
import { ContainerComponent } from "@/components/container";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import moment from "moment";

const TicketsList = () => {
  const { push } = useRouter();
  const title = "Tickets";
  const formUrl = `${PATH_DASHBOARD.ticket.tickets}/form`;
  const actionUrl = "admin/catalog/tickets";
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
      field: "client_id",
      headerName: "Client",
      width: 140,
      renderCell: ({ row }) => {
        return row?.client?.name;
      },
    },
    {
      field: "product_id",
      headerName: "Product",
      width: 140,
      renderCell: ({ row }) => {
        return row?.product?.name;
      },
    },
    {
      field: "user_id",
      headerName: "User",
      width: 140,
      renderCell: ({ row }) => {
        return row?.user?.name;
      },
    },
    {
      field: "datetime",
      headerName: "Date Time",
      type: "any",
      width: 120,
      renderCell: ({ row }) => {
        return moment(row?.created_at, "DD-MM-YYYY").format("DD-MM-YYYY");
      },
    },
    {
      field: "detail",
      headerName: "Details",
      width: "200",
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: ({ row }) => {
        if (row?.status === "open") {
          return (
            <Chip
              sx={{ textTransform: "capitalize" }}
              label={row?.status}
              variant="outlined"
              color="success"
            />
          );
        } else {
          return (
            <Chip
              sx={{ textTransform: "capitalize" }}
              label={row?.status}
              variant="outlined"
              color="warning"
            />
          );
        }
      },
    },
  ];
  return (
    <>
      <ContainerComponent>
        <CustomBreadcrumbs
          heading="Ticket List"
          links={[
            {
              name: "Dashboard",
              href: PATH_DASHBOARD.app,
            },
            {
              name: "Tickets",
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
              New Ticket
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

export default TicketsList;
