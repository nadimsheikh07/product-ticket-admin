import { TextBox } from "@/components/form";
import Iconify from "@/components/iconify";
import { Box, Card, CardContent } from "@mui/material";
import React from "react";
import { MessageBox } from "react-chat-elements";

const ChatSection = ({ formik, id }) => {
  return (
    <Box>
      <Card>
        <CardContent>
          <MessageBox
            position={"left"}
            type={"text"}
            title={"Message Box Title"}
            text="Here is a text type message box"
          />
          <MessageBox
            position={"right"}
            type={"text"}
            title={"Message Box Title"}
            text="Here is a text type message box"
          />

          <Box sx={{ mt: 2 }}>
            <TextBox
              fullWidth
              label="Message"
              isMaxLenght={250}
              placeholder="Enter message"
              multiline={true}
              rows={3}
              name="detail"
              value={formik.values.detail}
              onChange={formik.handleChange}
              error={formik.touched.detail && formik.errors.detail}
              helperText={formik.touched.detail && formik.errors.detail}
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
