import { useAuthContext } from "@/auth/useAuthContext";
import { TextBox } from "@/components/form";
import Iconify from "@/components/iconify";
import { Box, Card, CardContent } from "@mui/material";
import React from "react";
import { MessageBox } from "react-chat-elements";

const ChatSection = ({ formik, id, ticketChat }) => {
  const { user } = useAuthContext();
  return (
    <Box>
      <Card>
        <CardContent>
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
export default ChatSection;
