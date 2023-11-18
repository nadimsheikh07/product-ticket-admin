import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { Box, Card, IconButton, Pagination, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

const TicketTimeline = ({ histories, total, setPageSize, pageSize }) => {
  return (
    <>
      <Box>
        <Timeline position="alternate">
          {histories?.length > 10 && (
            <TimelineItem onClick={() => setPageSize(pageSize - 10)}>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot
                  color="primary"
                  variant="outlined"
                  sx={{
                    padding: 0,
                  }}
                >
                  <IconButton size="small">
                    <KeyboardDoubleArrowUpIcon fontSize="small" />
                  </IconButton>
                </TimelineDot>
                <TimelineConnector sx={{ bgcolor: "primary.main" }} />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}></TimelineContent>
            </TimelineItem>
          )}
          {histories &&
            histories?.length > 0 &&
            histories.map((item, index) => {
              return (
                <TimelineItem key={`histories?.length-${{ index }}`}>
                  <TimelineOppositeContent
                    sx={{ m: "auto 0" }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                  >
                    {item?.updated_at}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot
                      sx={(theme) => ({
                        "&.MuiTimelineDot-root": {
                          borderColor: theme.palette.primary.light,
                        },
                      })}
                    >
                      <Card
                        variant="outlined"
                        sx={(theme) => ({
                          "&.MuiCard-root": {
                            borderRadius: "50%",
                            width: "10px",
                            height: "10px",
                            bgcolor: theme.palette.primary.main,
                          },
                        })}
                      />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: "12px", px: 2 }}>
                    <Typography variant="h6" component="span">
                      {item?.status}
                    </Typography>
                    <Typography>{item?.comment}</Typography>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          {total != histories?.length && (
            <TimelineItem onClick={() => setPageSize(pageSize + 10)}>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot
                  color="primary"
                  variant="outlined"
                  sx={{
                    padding: 0,
                  }}
                >
                  <IconButton size="small">
                    <KeyboardDoubleArrowDownIcon fontSize="small" />
                  </IconButton>
                </TimelineDot>
                <TimelineConnector sx={{ bgcolor: "primary.main" }} />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}></TimelineContent>
            </TimelineItem>
          )}
        </Timeline>
      </Box>
    </>
  );
};

export default TicketTimeline;
