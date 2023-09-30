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
import moment from "moment";
import { QrActionColumn } from "@/module/qrActionColumn";

const ProductsList = () => {
  const { push } = useRouter();
  const title = "Products";
  const formUrl = `${PATH_DASHBOARD.product.products}/form`;
  const actionUrl = "admin/catalog/products";
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
      headerName: "Client Name",
      width: 140,
      renderCell: ({ row }) => {
        return row?.client?.name;
      },
    },
    {
      field: "name",
      headerName: "Product Name",
      width: "200",
    },
    {
      field: "code",
      headerName: "Product Code",
      width: "200",
    },
    {
      ...QrActionColumn(),
    },
    {
      field: "phone",
      headerName: "Client Phone",
      width: "200",
      renderCell: ({ row }) => {
        return row?.client?.phone || "N/A";
      },
    },
    {
      field: "model",
      headerName: "Serial No.",
      width: "200",
    },
    {
      field: "invoice_number",
      headerName: "Invoice Number",
      width: "200",
    },
    {
      field: "invoic_date",
      headerName: "Invoice Date",
      type: "any",
      width: 200,
      renderCell: ({ row }) => {
        return row?.invoice_date
          ? moment(row?.invoice_date, "YYYY-MM-DD").format("DD-MMM-YYYY")
          : "N/A";
      },
    },
    {
      field: "warranty_start",
      headerName: "Warranty Date",
      type: "any",
      width: 200,
      renderCell: ({ row }) => {
        return row?.warranty_start
          ? moment(row?.warranty_start, "YYYY-MM-DD").format("DD-MMM-YYYY")
          : "N/A";
      },
    },
    {
      field: "warranty_end",
      headerName: "Warranty End Date",
      type: "any",
      width: 200,
      renderCell: ({ row }) => {
        return row?.warranty_end
          ? moment(row?.warranty_end, "YYYY-MM-DD").format("DD-MMM-YYYY")
          : "N/A";
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
          heading="Product List"
          links={[
            {
              name: "Dashboard",
              href: PATH_DASHBOARD.app,
            },
            {
              name: "Products",
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
              New Product
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

export default ProductsList;
