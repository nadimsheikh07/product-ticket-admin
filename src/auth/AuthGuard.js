import PropTypes from "prop-types";
import { useState, useEffect } from "react";
// next
import { usePathname, useRouter } from "next/navigation";
// components
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
//
import Login from "@/sections/auth/Login";
import { useAuthContext } from "./useAuthContext";

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuthContext();

  const pathname = usePathname();

  const { push } = useRouter();

  const [requestedLocation, setRequestedLocation] = useState(null);

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      push(requestedLocation);
    }
    if (isAuthenticated) {
      setRequestedLocation(null);
    }
  }, [isAuthenticated, pathname, push, requestedLocation]);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  return <> {children} </>;
}
