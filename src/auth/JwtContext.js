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
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { enqueueSnackbar } = useSnackbar();
  const storageAvailable = localStorageAvailable();
  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable
        ? localStorage.getItem("accessToken")
        : "";
      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const response = await axiosInstance.get("admin/auth/profile");

        const { user } = response.data;

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
  const login = useCallback(async (email, password) => {
    const response = await axiosInstance.post("admin/auth/signin", {
      email,
      password,
    });
    const { accessToken, user } = response.data;

    enqueueSnackbar("Success", {
      variant: "success",
    });

    setSession(accessToken);

    dispatch({
      type: "LOGIN",
      payload: {
        isAuthenticated: true,
        user,
      },
    });
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

    localStorage.setItem("accessToken", accessToken);

    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
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
