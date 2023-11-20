import PropTypes from "prop-types";
import { useState, useEffect } from "react";
// next
import { useRouter } from "next/router";
// components
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
//
import { useAuthContext } from "./useAuthContext";
import useMenu from "@/hooks/useMenu";
import Page404 from "@/pages/404";
import { includes, some, startsWith } from "lodash";

// ----------------------------------------------------------------------

PermissionGuard.propTypes = {
  children: PropTypes.node,
};

export default function PermissionGuard({ children }) {
  const { isAuthenticated, user, isInitialized } = useAuthContext();
  const { permission } = useMenu();

  const { pathname } = useRouter();

  const [isPermission, setIsPermission] = useState(true);
  const [loader, setLoader] = useState(true);
  console.log("isAuthenticated", isAuthenticated);
  useEffect(() => {
    if (
      isAuthenticated &&
      isInitialized &&
      user &&
      permission?.length > 0 &&
      user?.user_type != "super_admin"
    ) {
      if (some(permission, (item) => startsWith(pathname, item))) {
        setLoader(false);
        console.log("this is authenticated");
        setIsPermission(false);
      } else {
        setLoader(false);
      }
    } else {
      setLoader(false);
    }
  }, [permission, pathname, isAuthenticated, user]);

  if (loader) {
    return <LoadingScreen />;
  }

  if (isAuthenticated && !isPermission) {
    return <Page404 />;
  }

  return <> {children} </>;
}
