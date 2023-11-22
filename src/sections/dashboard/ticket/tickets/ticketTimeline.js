import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { Box, Card, Chip, IconButton, Pagination, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

const TicketTimeline = ({ histories, total, setPageSize, pageSize }) => {
  return (
    <>
      <Box>
        <Timeline position="alternate">
          {histories?.length > 10 && (
            <TimelineItem>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot
                  color="primary"
                  variant="outlined"
                  sx={{
                    padding: 0,
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => setPageSize(pageSize - 10)}
                  >
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
              let color = "primary";
              const getStatus = () => {
                if (item?.status == "pending") {
                  color = "warning";
                  return (
                    <Chip
                      sx={{ textTransform: "capitalize" }}
                      label={item?.status}
                      variant="outlined"
                      color="warning"
                    />
                  );
                } else if (item?.status === "processing") {
                  color = "success";
                  return (
                    <Chip
                      sx={{ textTransform: "capitalize" }}
                      label={item?.status}
                      variant="outlined"
                      color="success"
                    />
                  );
                } else if (item?.status == "cancelled") {
                  color = "error";
                  return (
                    <Chip
                      sx={{ textTransform: "capitalize" }}
                      label={item?.status}
                      variant="outlined"
                      color="error"
                    />
                  );
                } else if (item?.status == "hold") {
                  color = "primary";
                  return (
                    <Chip
                      sx={{ textTransform: "capitalize" }}
                      label={item?.status}
                      variant="outlined"
                      color="primary"
                    />
                  );
                } else if (item?.status == "closed") {
                  color = "error";
                  return (
                    <Chip
                      sx={{
                        textTransform: "capitalize",
                        color: (theme) => theme.palette.error.darker,
                        borderColor: (theme) => theme.palette.error.darker,
                      }}
                      label={item?.status}
                      variant="outlined"
                    />
                  );
                } else {
                  color = "inherit";
                  return (
                    <Chip
                      sx={{ textTransform: "capitalize" }}
                      label={item?.status}
                      variant="outlined"
                      color="inherit"
                    />
                  );
                }
              };

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
                          borderColor: theme.palette[color]?.light,
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
                            bgcolor: theme.palette[color]?.main,
                          },
                        })}
                      />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: "12px", px: 2 }}>
                    <Typography variant="h6" component="span">
                      {getStatus()}
                    </Typography>
                    <Typography>{item?.comment}</Typography>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          {total != histories?.length && (
            <TimelineItem>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot
                  color="primary"
                  variant="outlined"
                  sx={{
                    padding: 0,
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => setPageSize(pageSize + 10)}
                  >
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
