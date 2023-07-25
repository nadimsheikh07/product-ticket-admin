import PropTypes from "prop-types";
import { m } from "framer-motion";
// @mui
import { Container, Typography } from "@mui/material";
// components
import { MotionContainer, varBounce } from "@/components/animate";
// assets
//
// import { useAuthContext } from "";

// ----------------------------------------------------------------------

const RoleBasedGuard = ({ hasContent, roles, children }) => {
  // Logic here to get current user role
  // const { user } = useAuthContext();

  // const currentRole = 'user';
  // const currentRole = user?.role; // admin;

  return <> {children} </>;
};

RoleBasedGuard.propTypes = {
  children: PropTypes.node,
  hasContent: PropTypes.bool,
  roles: PropTypes.arrayOf(PropTypes.string),
};
export default RoleBasedGuard;
