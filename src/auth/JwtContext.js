"use client";
import PropTypes from "prop-types";
import {
  createContext,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
} from "react";
// utils
import localStorageAvailable from "@/utils/localStorageAvailable";
//
import { isValidToken, setSession } from "@/auth/utils";
import axiosInstance from "@/utils/axios";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import useCompany from "@/hooks/useCompany";
import { isEmpty } from "lodash";
// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state, action) => {
  if (action.type === "INITIAL") {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === "LOGIN") {
    return {
      ...state,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === "REGISTER") {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === "LOGOUT") {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }

  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext(null);

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function AuthProvider({ children }) {
  const { pathname } = useRouter();
  const { setCompany, setCompanyDetail, removeCompany } = useCompany();
  const [state, dispatch] = useReducer(reducer, initialState);
  const storageAvailable = localStorageAvailable();
  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable
        ? localStorage.getItem("accessProductAdminToken")
        : "";

      let companyId = localStorage.getItem("companyId") || null;
      axiosInstance.defaults.headers.common.company_id = companyId;

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const response = await axiosInstance.get("admin/auth/profile");
        const { user } = response.data;
        if (user?.company_id) {
          setCompany(user?.company_id);
          if (!isEmpty(user?.company)) {
            let companyDetail = {
              value: user?.company_id,
              label: user?.company?.name,
              ...user?.company,
            };
            setCompanyDetail(JSON.stringify(companyDetail));
          }
        }

        dispatch({
          type: "INITIAL",
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: "INITIAL",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: "INITIAL",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable, pathname]);

  useEffect(() => {
    initialize();
  }, [initialize, pathname]);

  // LOGIN
  const login = useCallback(async (values) => {
    const response = await axiosInstance.post("admin/auth/signin", {
      ...values,
    });
    const { accessToken, user } = response.data;
    if (user?.company_id) {
      setCompany(user?.company_id);
      if (!isEmpty(user?.company)) {
        let companyDetail = {
          value: user?.company_id,
          label: user?.company?.name,
          ...user?.company,
        };
        setCompanyDetail(JSON.stringify(companyDetail));
      }
    }

    setSession(accessToken);

    dispatch({
      type: "LOGIN",
      payload: {
        isAuthenticated: true,
        user,
      },
    });

    return response;
  }, []);

  // REGISTER
  const register = useCallback(async (email, password, firstName, lastName) => {
    const response = await axiosInstance.post("admin/auth/signup", {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    localStorage.setItem("accessProductAdminToken", accessToken);

    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    localStorage.removeItem("companyId", null);
    localStorage.removeItem("companyDetail", null);
    setSession(null);
    dispatch({
      type: "LOGOUT",
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: "jwt",
      login,
      register,
      logout,
    }),
    [
      state.isAuthenticated,
      state.isInitialized,
      state.user,
      login,
      logout,
      register,
    ]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
