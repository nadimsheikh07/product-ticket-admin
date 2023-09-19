"use client";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import { DataTable } from "@/components/dataTable";
import Iconify from "@/components/iconify/Iconify";
import { PATH_DASHBOARD } from "@/routes/paths";
import {
  Avatar,
  Button,
  Chip,
  Container,
  Tooltip,
  Typography,
} from "@mui/material";
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
  const chatUrl = `${PATH_DASHBOARD.ticket.tickets}/chat`;
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
        <GridActionsCellItem
          key="chat"
          icon={
            <Tooltip title="Chat">
              <Iconify icon="material-symbols:chat-outline" width={25} />
            </Tooltip>
          }
          label="Chat"
          onClick={() => push(`${chatUrl}/${params.id}`)}
        />,
      ],
    },

    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: ({ row }) => {
        if (row?.status == "pending") {
          return (
            <Chip
              sx={{ textTransform: "capitalize" }}
              label={row?.status}
              variant="outlined"
              color="warning"
            />
          );
        } else if (row?.status === "processing") {
          return (
            <Chip
              sx={{ textTransform: "capitalize" }}
              label={row?.status}
              variant="outlined"
              color="success"
            />
          );
        } else if (row?.status == "cancled") {
          return (
            <Chip
              sx={{ textTransform: "capitalize" }}
              label={row?.status}
              variant="outlined"
              color="error"
            />
          );
        } else if (row?.status == "closed") {
          return (
            <Chip
              sx={{
                textTransform: "capitalize",
                color: (theme) => theme.palette.error.darker,
                borderColor: (theme) => theme.palette.error.darker,
              }}
              label={row?.status}
              variant="outlined"
            />
          );
        } else {
          return (
            <Chip
              sx={{ textTransform: "capitalize" }}
              label={row?.status}
              variant="outlined"
              color="N/A"
            />
          );
        }
      },
    },
    {
      field: "datetime",
      headerName: "Date Time",
      type: "date",
      width: 120,
      renderCell: ({ row }) => {
        return moment(row?.created_at, "DD-MM-YYYY").format("DD-MMM-YYYY");
      },
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
      headerName: "Ticket Assign To",
      width: 140,
      renderCell: ({ row }) => {
        return row?.user?.name;
      },
    },
    {
      field: "phone",
      headerName: "Phone",
      width: "200",
      renderCell: ({ row }) => {
        return row?.client?.phone || "N/A";
      },
    },
    {
      field: "photo",
      headerName: "Image",
      width: 140,
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
            src={row?.file}
            alt={row?.product?.name}
          />
        );
      },
    },
    {
      field: "detail",
      headerName: "Details",
      width: "200",
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
          disableRowSelectionOnClick={true}
        />
      </ContainerComponent>
    </>
  );
};

export default TicketsList;
