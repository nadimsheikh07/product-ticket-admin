"use client";
import { ContainerComponent } from "@/components/container";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import { DataTable } from "@/components/dataTable";
import Iconify from "@/components/iconify/Iconify";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { AddFormButton } from "@/module/auth/addFormButton";
import { PATH_DASHBOARD } from "@/routes/paths";
import axiosInstance from "@/utils/axios";
import { Avatar, Button, Chip, Stack, Tooltip } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useFormik } from "formik";
import moment from "moment";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";

const TicketsList = () => {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const title = "Open Tickets";
  const formUrl = `${PATH_DASHBOARD.ticket.open_tickets}/form`;
  const actionUrl = "admin/catalog/open_tickets";

  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: "120",
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
      field: "created_at",
      headerName: "Create Date",
      width: 120,
      renderCell: ({ row }) => {
        return row?.created_at
          ? moment(row?.created_at, "DD-MM-YYYY hh:ss a").format("DD-MMM-YYYY")
          : "N/A";
      },
    },
    {
      field: "name",
      headerName: "Client Name",
      width: 180,
    },
    {
      field: "company_id",
      headerName: "Company Name",
      width: "200",
    },
    {
      field: "product_name",
      headerName: "Product Name",
      width: 140,
    },
    {
      field: "email",
      headerName: "Client Email",
      width: 140,
    },
    {
      field: "phone",
      headerName: "Client Phone",
      width: "200",
    },
    {
      field: "file",
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
            alt={row?.product_name}
          />
        );
      },
    },
    {
      field: "address",
      headerName: "Client Address",
      width: "200",
    },
    {
      field: "serial_number",
      headerName: "Serial Number",
      width: "200",
    },
    {
      field: "warranty_start",
      headerName: "Warranty Start",
      width: "200",
      renderCell: ({ row }) => {
        return row?.warranty_start
          ? moment(row?.warranty_start, "YYYY-MM-DD").format("DD-MMM-YYYY")
          : "N/A";
      },
    },
    {
      field: "warranty_end",
      headerName: "Warranty End",
      width: "200",
      renderCell: ({ row }) => {
        return row?.warranty_end
          ? moment(row?.warranty_end, "YYYY-MM-DD").format("DD-MMM-YYYY")
          : "N/A";
      },
    },
    {
      field: "invoice_number",
      headerName: "Invoice Number",
      width: "200",
    },
    {
      field: "invoice_date",
      headerName: "Invoice Date",
      renderCell: ({ row }) => {
        return row?.invoice_date
          ? moment(row?.invoice_date, "YYYY-MM-DD").format("DD-MMM-YYYY")
          : "N/A";
      },
    },
    {
      field: "product_detail",
      headerName: "Product Detail",
      width: "200",
    },
    {
      field: "complain_detail",
      headerName: "Complain Detail",
      width: "200",
    },
  ];

  return (
    <>
      <ContainerComponent>
        <CustomBreadcrumbs
          heading="Open Ticket List"
          links={[
            {
              name: "Dashboard",
              href: PATH_DASHBOARD.app,
            },
            {
              name: "Open Tickets",
              // href: "#",
            },
            {
              name: "List",
            },
          ]}
          action={
            <AddFormButton title="New Open Ticket" url={`${formUrl}/new`} />
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
          params={React.useMemo(() => {
            return { is_admin_view: true };
          }, [])}
        />
      </ContainerComponent>
    </>
  );
};
TicketsList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default TicketsList;
