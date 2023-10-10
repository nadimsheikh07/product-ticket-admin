import { useAuthContext } from "@/auth/useAuthContext";
import { TextBox } from "@/components/form";
import SelectAutocomplete from "@/components/form/selectAutocomplete";
import Iconify from "@/components/iconify";
import axiosInstance from "@/utils/axios";
import { Box, Card, CardContent } from "@mui/material";
import React from "react";
import { MessageBox } from "react-chat-elements";

const InstantChatSection = ({ formik, id, ticketChat }) => {
  const { user } = useAuthContext();
  const [tickets, setTickets] = React.useState([]);

  const getTickets = async () => {
    await axiosInstance
      .get("admin/catalog/tickets")
      .then(async (response) => {
        if (response.status === 200) {
          let newTicket = [];
          response?.data &&
            response?.data?.length > 0 &&
            response?.data.forEach((element) => {
              newTicket.push({
                name: element?.product?.name,
                id: element?.id,
                user_name: element?.user?.name,
              });
            });
          await setTickets(newTicket);
        }
      })
      .catch((error) => {
        console.log("Ticket Error", error);
      });
  };
  React.useEffect(() => {
    getTickets();
  }, []);

  return (
    <Box>
      <Card>
        <CardContent>
          <Box sx={{ my: 2 }}>
            <SelectAutocomplete
              fullWidth
              label="Tickets"
              placeholder="Select Ticket"
              options={tickets}
              name="ticket_id"
              getOptionLabel="name"
              getOptionValue="id"
              value={formik.values.ticket_id}
              onChange={(e) => {
                formik.setFieldValue("ticket_id", e);
              }}
              error={formik.touched.ticket_id && formik.errors.ticket_id}
              helperText={formik.touched.ticket_id && formik.errors.ticket_id}
              onIconClick={formik.handleSubmit}
              isAssignUser={true}
            />
          </Box>
          {ticketChat &&
            ticketChat?.length > 0 &&
            ticketChat.map((item, index) => {
              return (
                <MessageBox
                  key={`TicketChatAdmin-${index}`}
                  position={
                    Number(user?.id) === Number(item?.user_id)
                      ? "right"
                      : "left"
                  }
                  type={"text"}
                  title={item?.user?.name}
                  text={item?.message}
                />
              );
            })}

          <Box sx={{ mt: 2 }}>
            <TextBox
              fullWidth
              label="Message"
              isMaxLenght={250}
              placeholder="Enter message"
              multiline={true}
              rows={3}
              name="message"
              value={formik.values.message}
              onChange={formik.handleChange}
              error={formik.touched.message && formik.errors.message}
              helperText={formik.touched.message && formik.errors.message}
              icon={<Iconify icon="wpf:sent" />}
              onIconClick={formik.handleSubmit}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
export default InstantChatSection;
