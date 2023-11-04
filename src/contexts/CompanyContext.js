import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import axiosInstance from "@/utils/axios";

const initialState = {
  isInitialized: null,
  companyId: null,
  companyDetail: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { companyId } = action.payload;
    return {
      ...state,
      isInitialized: true,
      companyId,
    };
  },
  SET_COMPANY: (state, action) => {
    const { companyId } = action.payload;

    return {
      ...state,
      companyId,
    };
  },
  SET_COMPANY_DETAIL: (state, action) => {
    const { companyDetail } = action.payload;

    return {
      ...state,
      companyDetail,
    };
  },
  REMOVE_COMPANY: (state) => ({
    ...state,
    companyId: null,
    companyDetail: null,
  }),
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const CompanyContext = createContext({
  ...initialState,
  method: "jwt",
  setCompany: () => Promise.resolve(),
  removeCompany: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

CompanyProvider.propTypes = {
  children: PropTypes.node,
};

function CompanyProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const companyId = JSON.parse(window.localStorage.getItem("companyId"));
        const companyDetail = JSON.parse(
          window.localStorage.getItem("companyDetail")
        );

        if (companyDetail) {
          dispatch({
            type: "SET_COMPANY_DETAIL",
            payload: {
              companyDetail,
            },
          });
        } else {
          dispatch({
            type: "SET_COMPANY_DETAIL",
            payload: {
              companyDetail: null,
            },
          });
        }

        if (companyId) {
          dispatch({
            type: "INITIALIZE",
            payload: {
              companyId,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              companyId: null,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: "INITIALIZE",
          payload: {
            companyId: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const setCompany = (companyId) => {
    axiosInstance.defaults.headers.common.company_id = companyId;
    localStorage.setItem("companyId", companyId);
    dispatch({
      type: "SET_COMPANY",
      payload: {
        companyId,
      },
    });
  };

  const setCompanyDetail = (companyDetail) => {
    localStorage.setItem("companyDetail", companyDetail);
    dispatch({
      type: "SET_COMPANY_DETAIL",
      payload: {
        companyDetail: companyDetail ? JSON.parse(companyDetail) : null,
      },
    });
  };

  const removeCompany = async () => {
    dispatch({ type: "REMOVE_COMPANY" });
  };

  return (
    <CompanyContext.Provider
      value={{
        ...state,
        method: "jwt",
        setCompany,
        removeCompany,
        setCompanyDetail,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

export { CompanyContext, CompanyProvider };
