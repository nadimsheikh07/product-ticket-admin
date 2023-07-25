// routes
import { PATH_PAGE } from "@/routes/paths";
// config
// components
import Iconify from "@/components/iconify/Iconify";

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: "Home",
    icon: <Iconify icon="eva:home-fill" />,
    path: PATH_PAGE.root,
  },
  {
    title: "About",
    icon: <Iconify icon="ic:round-grain" />,
    path: PATH_PAGE.root,
  },
  {
    title: "Contact us",
    icon: <Iconify icon="eva:file-fill" />,
    path: PATH_PAGE.root,
    // children: [
    //   {
    //     subheader: "Other",
    //     items: [
    //       { title: "About us", path: PATH_PAGE.about },
    //       { title: "Contact us", path: PATH_PAGE.contact },
    //       { title: "FAQs", path: PATH_PAGE.faqs },
    //       { title: "Pricing", path: PATH_PAGE.pricing },
    //       { title: "Payment", path: PATH_PAGE.payment },
    //       { title: "Maintenance", path: PATH_PAGE.maintenance },
    //       { title: "Coming Soon", path: PATH_PAGE.comingSoon },
    //     ],
    //   },
    //   {
    //     subheader: "Authentication",
    //     items: [
    //       { title: "Login", path: PATH_AUTH.loginUnprotected },
    //       { title: "Register", path: PATH_AUTH.registerUnprotected },
    //       { title: "Reset password", path: PATH_AUTH.resetPassword },
    //       { title: "Verify code", path: PATH_AUTH.verify },
    //     ],
    //   },
    //   {
    //     subheader: "Error",
    //     items: [
    //       { title: "Page 403", path: PATH_PAGE.page403 },
    //       { title: "Page 404", path: PATH_PAGE.page404 },
    //       { title: "Page 500", path: PATH_PAGE.page500 },
    //     ],
    //   },
    //   {
    //     subheader: "Dashboard",
    //     items: [{ title: "Dashboard", path: PATH_AFTER_LOGIN }],
    //   },
    // ],
  }
];

export default navConfig;
