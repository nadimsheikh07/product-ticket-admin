// routes
import { PATH_DASHBOARD } from "@/routes/paths";
// components
import SvgColor from "@/components/svg-color";
import { projectName } from "@/utils/constant";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const ICONS = {
  blog: icon("ic_blog"),
  cart: icon("ic_cart"),
  chat: icon("ic_chat"),
  mail: icon("ic_mail"),
  user: icon("ic_user"),
  file: icon("ic_file"),
  lock: icon("ic_lock"),
  label: icon("ic_label"),
  blank: icon("ic_blank"),
  kanban: icon("ic_kanban"),
  folder: icon("ic_folder"),
  banking: icon("ic_banking"),
  booking: icon("ic_booking"),
  invoice: icon("ic_invoice"),
  calendar: icon("ic_calendar"),
  disabled: icon("ic_disabled"),
  external: icon("ic_external"),
  menuItem: icon("ic_menu_item"),
  ecommerce: icon("ic_ecommerce"),
  analytics: icon("ic_analytics"),
  dashboard: icon("ic_dashboard"),
};

const navConfig = [
  // DIGITALMENU MASTER
  // ----------------------------------------------------------------------
  {
    subheader: projectName,
    items: [
      {
        title: "dashboard",
        path: PATH_DASHBOARD.app,
        icon: ICONS.dashboard,
      },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: "menu",
    items: [
      // USER
      {
        title: "masters",
        isLink: false,
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [{ title: "users", path: PATH_DASHBOARD.user.user }],
      },

      // // COMPANY
      // {
      //   title: "Company",
      //   path: PATH_DASHBOARD.company.root,
      //   icon: ICONS.user,
      //   children: [
      //     { title: "Companies", path: PATH_DASHBOARD.company.companies },
      //     {
      //       title: "Company Employees",
      //       path: PATH_DASHBOARD.company.company_employees,
      //     },
      //   ],
      // },
      // COMPANY
      {
        title: "Client",
        // isLink: false,
        path: PATH_DASHBOARD.client.clients,
        icon: ICONS.user,
        // children: [{ title: "Clients", path: PATH_DASHBOARD.client.clients }],
      },
      // PRODUCT
      {
        title: "Product",
        isLink: false,
        path: PATH_DASHBOARD.product.root,
        icon: ICONS.user,
        children: [
          {
            title: "Product Attributes",
            path: PATH_DASHBOARD.product.attributes,
          },
          { title: "Products", path: PATH_DASHBOARD.product.products },
        ],
      },
      // TICKET
      {
        title: "Ticket",
        isLink: false,
        path: PATH_DASHBOARD.ticket.root,
        icon: ICONS.user,
        children: [
          { title: "tickets", path: PATH_DASHBOARD.ticket.tickets },
          { title: "Open Tickets", path: PATH_DASHBOARD.ticket.open_tickets },
        ],
      },
      // NOTIFICATION
      {
        title: "Settings",
        isLink: false,
        path: PATH_DASHBOARD.settings.root,
        icon: ICONS.user,
        children: [
          { title: "Notification", path: PATH_DASHBOARD.settings.notification },
        ],
      },
      // CONFIGURATION
      {
        title: "Configuration",
        isLink: false,
        path: PATH_DASHBOARD.configuration.root,
        icon: ICONS.user,
        children: [
          { title: "Email", path: PATH_DASHBOARD.configuration.email },
        ],
      },
    ],
  },
];

export default navConfig;
