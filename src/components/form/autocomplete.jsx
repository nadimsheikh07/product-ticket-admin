/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { FormControl } from "./index";
import { find, debounce } from "lodash";
import { CircularProgress, FormHelperText } from "@mui/material";
import axiosInstance from "src/utils/axios";
import PropTypes from "prop-types";

const MuiAutocompleteBox = (props) => {
  const {
    name,
    label,
    forceLoading,
    value,
    url,
    required,
    fullWidth,
    helperText,
    disabled,
    getOptionLabel,
    getOptionValue,
    filter,
    variant,
    starReq,
    isFilterData = false,
    paramsID = {},
  } = props;
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    getData();
  }, [value]);

  React.useEffect(() => {
    if (value) {
      const defaultValue = find(options, { value: Number(value) });
      if (defaultValue) {
        setSearch(defaultValue.label);
      }
    }
  }, [value, options]);

  const getLabel = (element) => {
    if (element && element[getOptionLabel]) {
      return element[getOptionLabel];
    } else {
      return "";
    }
  };

  const getValue = (element) => Number(element[getOptionValue]);

  const getData = async (search = null) => {
    setLoading(true);

    const params = {
      search: search,
      page: 1,
      pageSize: 10,
      defaultValue: value,
      isActive: true,
      ...paramsID,
    };

    if (filter) {
      filter.forEach((element) => {
        params[element.field] = element.value;
      });
    }

    let options = [];

    await axiosInstance
      .get(`/admin/${url}`, { params })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.data) {
            response.data.data.forEach((element) => {
              if (isFilterData) {
                options.push({
                  label: element?.to_city?.name,
                  value: element?.to_city?.id,
                });
              } else if (!isFilterData) {
                options.push({
                  label: getLabel(element),
                  value: getValue(element),
                });
              }
            });
            setOptions(options);
          }
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    if (forceLoading === true) {
      getData();
    }
  }, [forceLoading]);

  React.useEffect(() => {
    if (filter) {
      getData();
      setSearch("");
    }
  }, [filter]);

  React.useEffect(() => {
    if (paramsID && paramsID?.from_city_id) {
      getData();
    }
  }, [paramsID, paramsID?.from_city_id]);

  const delayedQuery = React.useCallback(debounce(getData, 1000), []);

  const handleOnChange = (value) => {
    console.log("valuevalue", value);
    if (!value) {
      props.onChange("");
    }
    setSearch(value);
    delayedQuery(value);
  };

  const setValue = (option) => {
    if (option) {
      props.onChange(option.value);
    } else {
      props.onChange(null);
    }
  };

  const defaultValue = find(options, { value: Number(value) });
  return (
    <FormControl
      key={`key${name}`}
      error={helperText ? true : false}
      fullWidth={fullWidth}
      required={required}
    >
      <Autocomplete
        disabled={disabled}
        options={options}
        defaultValue={defaultValue}
        autoHighlight
        loading={loading}
        variant={variant}
        inputValue={search}
        onInputChange={(event, newInputValue) => {
          if (event?.type === "change") {
            handleOnChange(newInputValue);
          }
        }}
        onChange={(event, newValue) => {
          if (event?.type === "click") {
            setValue(newValue);
            if (newValue == null) {
              setSearch("");
            }
          }
        }}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            {option.label}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            error={helperText ? true : false}
            {...params}
            label={label}
            variant={variant}
            required={starReq}
            inputProps={{
              ...params.inputProps,
              autoComplete: "off", // disable autocomplete and autofill
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

MuiAutocompleteBox.defaultProps = {
  variant: "outlined",
  fullWidth: true,
  required: false,
  disabled: false,
  helperText: null,
  forceLoading: false,
  getOptionLabel: "label",
  getOptionValue: "value",
  filter: null,
  onChange: () => {},
};

MuiAutocompleteBox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  url: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  forceLoading: PropTypes.bool,
  getOptionLabel: PropTypes.string,
  getOptionValue: PropTypes.string,
  filter: PropTypes.array,
  variant: PropTypes.string,
  onChange: PropTypes.func,
  starReq: PropTypes.string,
};

export default MuiAutocompleteBox;
