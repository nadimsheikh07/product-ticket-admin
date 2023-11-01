"use client";
import { ContainerComponent } from "@/components/container";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import { DataTable } from "@/components/dataTable";
import Iconify from "@/components/iconify/Iconify";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { AddFormButton } from "@/module/auth/addFormButton";
import { PATH_DASHBOARD } from "@/routes/paths";
import InstantMessageBox from "@/sections/dashboard/ticket/tickets/instant_message";
import axiosInstance from "@/utils/axios";
import { Avatar, Badge, Button, Chip, Stack, Tooltip } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useFormik } from "formik";
import moment from "moment";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";

const TicketsList = () => {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [openChat, setOpenChat] = React.useState(false);
  const title = "Tickets";
  const formUrl = `${PATH_DASHBOARD.ticket.tickets}/form`;
  const chatUrl = `${PATH_DASHBOARD.ticket.tickets}/chat`;
  const actionUrl = "admin/catalog/tickets";
  const [refreshTicket, setRefreshTicket] = React.useState(false);

  const relaunchChat = async (id) => {
    await axiosInstance
      .post(`admin/ticket_chat/ticket_chats/relaunch_chat`, {
        ticket_id: id,
      })
      .then((response) => {
        if (response.status === 200) {
          setRefreshTicket(true);
          enqueueSnackbar(response.data.message, {
            variant: "success",
          });
        }
      })
      .catch((error) => {
        console.log("relaunchChat Error", error);
        setRefreshTicket(false);
        const { response } = error;
        enqueueSnackbar(response?.data?.message || "", {
          variant: "error",
        });
      });
  };

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
        ["closed", "cancled"].includes(params?.row?.status) ? (
          <GridActionsCellItem
            key="relaunch"
            icon={
              <Tooltip title="Relaunch">
                <Badge
                  color="primary"
                  variant="standard"
                  badgeContent={params?.row?.chats_count}
                >
                  <Iconify icon="carbon:chat-launch" width={25} />
                </Badge>
              </Tooltip>
            }
            label="Relaunch"
            onClick={() => relaunchChat(params?.id)}
          />
        ) : (
          <GridActionsCellItem
            key="chat"
            icon={
              <Tooltip title="Chat">
                <Badge
                  color="primary"
                  variant="standard"
                  badgeContent={params?.row?.chats_count}
                >
                  <Iconify icon="material-symbols:chat-outline" width={25} />
                </Badge>
              </Tooltip>
            }
            label="Chat"
            onClick={() => push(`${chatUrl}/${params.id}`)}
          />
        ),
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
      headerName: "Create Date",
      type: "date",
      width: 120,
      renderCell: ({ row }) => {
        return moment(row?.created_at, "DD-MM-YYYY hh:ss a").format(
          "DD-MMM-YYYY"
        );
      },
    },
    {
      field: "client_id",
      headerName: "Client Name",
      width: 180,
      renderCell: ({ row }) => {
        return row?.client?.name;
      },
    },
    {
      field: "company_id",
      headerName: "Company Name",
      width: "200",
      renderCell: ({ row }) => {
        return row?.company?.name;
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
  const [ticketChat, setTicketChat] = React.useState([]);

  const formik = useFormik({
    initialValues: {
      message: "",
      is_reply: true,
      ticket_id: "",
      is_view: false,
    },
    validate: (values) => {
      const errors = {};

      return errors;
    },
    onSubmit: async (values) => {
      let method = "POST";
      let url = "admin/ticket_chat/ticket_chats";
      await axiosInstance
        .request({
          method: method,
          url: url,
          data: values,
        })
        .then((response) => {
          if (response.status === 200) {
            // formik.resetForm();
            formik.setFieldValue("message", "");
            getTicketChat();
            enqueueSnackbar(response.data.message, {
              variant: "success",
            });
          }
        })
        .catch((error) => {
          const { response } = error;
          // show error message
          enqueueSnackbar(response?.data?.message, {
            variant: "error",
          });
          // set server error
          if (response.status === 422) {
            // eslint-disable-next-line no-unused-vars
            for (const [key, value] of Object.entries(values)) {
              if (response.data.errors[key]) {
                setErrors({ [key]: response.data.errors[key][0] });
              }
            }
          }
        });
    },
  });

  async function getTicketChat() {
    await axiosInstance
      .get("admin/ticket_chat/ticket_chats", {
        params: { ticket_id: Number(formik.values.ticket_id) },
      })
      .then((response) => {
        if (response.status === 200) {
          setTicketChat(response.data);
        }
      });
  }

  React.useEffect(() => {
    if (formik.values.ticket_id) {
      getTicketChat();
    }
  }, [formik.values.ticket_id]);

  const handleOpen = () => {
    setOpenChat(true);
  };
  const handleClose = () => {
    setOpenChat(false);
  };
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
          action={<AddFormButton title="New Ticket" url={`${formUrl}/new`} />}
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
          forceRefresh={refreshTicket}
          setForceRefresh={setRefreshTicket}
          params={React.useMemo(() => {
            return { is_admin_view: true };
          }, [])}
        />
      </ContainerComponent>
      <InstantMessageBox
        open={openChat}
        handleClose={handleClose}
        formik={formik}
        data={ticketChat}
        id={formik.values.ticket_id}
      />
    </>
  );
};
TicketsList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default TicketsList;
