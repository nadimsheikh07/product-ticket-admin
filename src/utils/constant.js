import dayjs from "dayjs";

export const projectName = "Product Ticket";

export const CurrencyCode = [
  {
    label: "$",
    value: "$",
  },
  {
    label: "₹",
    value: "₹",
  },
];
export const CountryCode = [
  {
    label: "India",
    value: "+91",
  },
  {
    label: "USA",
    value: "+1",
  },
  {
    label: "UK",
    value: "+44",
  },
];
export const status = [
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Processing",
    value: "processing",
  },
  {
    label: "Cancelled",
    value: "cancled",
  },
  {
    label: "Closed",
    value: "closed",
  },
];
export const userType = [
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "User/Employe",
    value: "user",
  },
];

export const ShopTimeDay = [
  {
    label: "Mon",
    value: "Mon",
  },
  {
    label: "Tue",
    value: "Tue",
  },
  {
    label: "Wed",
    value: "Wed",
  },
  {
    label: "Thu",
    value: "Thu",
  },
  {
    label: "Fri",
    value: "Fri",
  },
  {
    label: "Sat",
    value: "Sat",
  },
  {
    label: "Sun",
    value: "Sun",
  },
];

export const getDefaultDateTime = () => {
  let newDate = dayjs().format("YYYY-MM-DD");
  let newTime = dayjs("2018-04-13 00:00:00").format("HH:mm:ss");
  let totalDateTime = `${newDate} ${newTime}`;

  return totalDateTime;
};
