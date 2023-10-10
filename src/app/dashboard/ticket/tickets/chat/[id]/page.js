"use client";
import { useAuthContext } from "@/auth/useAuthContext";
import { ContainerComponent } from "@/components/container";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import { PATH_DASHBOARD } from "@/routes/paths";
import { TicketsFormSection } from "@/sections/dashboard/ticket/tickets";
import ChatSection from "@/sections/dashboard/ticket/tickets/chat";
import axiosInstance from "@/utils/axios";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

import React from "react";

const TicketsPageForm = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { user } = useAuthContext();
  const title = "Ticket Chat";
  const backUrl = `${PATH_DASHBOARD.ticket.tickets}`;
  const actionUrl = "admin/ticket_chat/ticket_chats";
  const [ticketChat, setTicketChat] = React.useState([]);

  const viewTicketChatMessage = async () => {
    await axiosInstance
      .post(`admin/ticket_chat/ticket_chats/view`, {
        ticket_id: id,
        user_id: user?.id,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("ViewChatMessage", response);
        }
      })
      .catch((error) => {
        console.log("Ticket Viewed Error", error);
      });
  };

  const getTicketChat = async () => {
    await axiosInstance
      .get("admin/ticket_chat/ticket_chats", {
        params: { ticket_id: Number(id) },
      })
      .then((response) => {
        if (response.status === 200) {
          viewTicketChatMessage();
          setTicketChat(response.data);
        }
      })
      .catch((error) => {
        console.log("Ticket Chat Error", error);
      });
  };

  React.useEffect(() => {
    getTicketChat();
  }, []);

  const formik = useFormik({
    initialValues: {
      message: "",
      is_reply: true,
      ticket_id: Number(id),
      is_view: false,
    },
    validate: (values) => {
      const errors = {};

      return errors;
    },
    onSubmit: async (values) => {
      let method = "POST";
      let url = actionUrl;
      await axiosInstance
        .request({
          method: method,
          url: url,
          data: values,
        })
        .then((response) => {
          if (response.status === 200) {
            formik.resetForm();
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

  return (
    <ContainerComponent>
      <CustomBreadcrumbs
        heading={title}
        links={[
          {
            name: "Dashboard",
            href: PATH_DASHBOARD.app,
          },
          {
            name: "Ticket List",
            href: backUrl,
          },
          { name: title },
        ]}
      />
      <form noValidate onSubmit={formik.handleSubmit}>
        <ChatSection ticketChat={ticketChat} formik={formik} id={id} />
      </form>
    </ContainerComponent>
  );
};

export default TicketsPageForm;
