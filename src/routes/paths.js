// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/dashboard";
const ROOTS_HOME = "/";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
  loginUnprotected: path(ROOTS_AUTH, "/login-unprotected"),
  registerUnprotected: path(ROOTS_AUTH, "/register-unprotected"),
  verify: path(ROOTS_AUTH, "/verify"),
  resetPassword: path(ROOTS_AUTH, "/forget-password"),
  newPassword: path(ROOTS_AUTH, "/reset-password"),
};

export const PATH_PAGE = {
  root: "/",
  comingSoon: "/coming-soon",
  maintenance: "/maintenance",
  pricing: "/pricing",
  payment: "/payment",
  about: "/about-us",
  contact: "/contact-us",
  login: "/auth/login",
  faqs: "/faqs",
  page403: "/403",
  page404: "/404",
  page500: "/500",
  components: "/components",
  auth: "/auth/login",
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  app: path(ROOTS_DASHBOARD, "/app"),
  admin: {
    root: path(ROOTS_DASHBOARD, "/admin"),
    admin: path(ROOTS_DASHBOARD, "/admin/admin"),
    super_admin: path(ROOTS_DASHBOARD, "/admin/super_admin"),
  },
  company: {
    root: path(ROOTS_DASHBOARD, "/company"),
    companies: path(ROOTS_DASHBOARD, "/company/companies"),
    company_employees: path(ROOTS_DASHBOARD, "/company/company_employees"),
  },
  client: {
    root: path(ROOTS_DASHBOARD, "/client"),
    clients: path(ROOTS_DASHBOARD, "/client/clients"),
  },
  product: {
    root: path(ROOTS_DASHBOARD, "/product"),
    products: path(ROOTS_DASHBOARD, "/product/products"),
    attributes: path(ROOTS_DASHBOARD, "/product/attributes"),
  },
  ticket: {
    root: path(ROOTS_DASHBOARD, "/ticket"),
    tickets: path(ROOTS_DASHBOARD, "/ticket/tickets"),
    open_tickets: path(ROOTS_DASHBOARD, "/ticket/open_tickets"),
  },
  settings: {
    root: path(ROOTS_DASHBOARD, "/settings"),
    notification: path(ROOTS_DASHBOARD, "/settings/notification"),
  },
  configuration: {
    root: path(ROOTS_DASHBOARD, "/configuration"),
    email: path(ROOTS_DASHBOARD, "/configuration/email"),
  },
};
