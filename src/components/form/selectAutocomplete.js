import {
  Autocomplete,
  Box,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import FormControl from "./formControl";
import { find } from "lodash";

const renderTicketAssignContent = (option) => {
  return (
    <>
      <Typography sx={{ marginLeft: "10px" }}>
        <Typography component="span" fontWeight={700}>
          Product Name
        </Typography>
        :{" "}
        <Typography component="span" mr={2}>
          {option?.label || "N/A"}
        </Typography>
        <Typography component="span" fontWeight={700}>
          User
        </Typography>
        :{" "}
        <Typography component="span" mr={2}>
          {option?.user_name || "N/A"}
        </Typography>
      </Typography>
    </>
  );
};

const SelectAutocomplete = ({
  name,
  value,
  onChange,
  onInputChange,
  disabled,
  // inputValue,
  getOptionLabel,
  getOptionValue,
  options = [],
  label,
  helperText,
  fullWidth,
  isAssignUser,
  loading,
}) => {
  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState([]);

  const getLabel = (element) => {
    if (element && element[getOptionLabel]) {
      return element[getOptionLabel];
    } else {
      return "";
    }
  };

  const getValue = (element) => Number(element[getOptionValue]);

  React.useEffect(() => {

    if (options && options?.length > 0) {
      let newOptions = [];
      options.forEach((element) => {
        newOptions.push({
          label: getLabel(element),
          value: getValue(element),

          //Assign User
          ...(isAssignUser && {
            user_name: element?.user_name,
          }),
        });
      });
      setData(newOptions);
    } 
  }, [options, value, search]);

  console.log("defaultValue",data)


  React.useEffect(() => {
    if (value) {
      const defaultValue = find(data, { value: Number(value) });
      if (defaultValue) {
        setSearch(defaultValue.label);
      } else {
        setSearch("");
      }
    }
  }, [value, options, search]);

  const renderDropdownContent = (option) => {
    if (isAssignUser) {
      return renderTicketAssignContent(option);
    } else {
      return option.label;
    }
  };

  React.useEffect(() => {
    if (!value) {
      setSearch("");
    }
  }, [value]);

  const handleOnChange = (value) => {
    if (!value) {
      onChange("");
      setSearch("");
    }
    setSearch(value);
  };

  const setValue = (option) => {
    if (option) {
      onChange(option.value);
    } else {
      onChange(null);
    }
  };

  const defaultValue = find(data, { value: Number(value) });
  console.log("datadata", defaultValue,data);
  return (
    <React.Fragment>
      <FormControl
        key={`key${name}`}
        error={helperText ? true : false}
        fullWidth={fullWidth}
      >
        <Autocomplete
          disabled={disabled}
          value={defaultValue}
          defaultValue={defaultValue}
          inputValue={search}
          name={name}
          onInputChange={(event, newInputValue) => {
            if (event?.type === "change") {
              handleOnChange(newInputValue);
            }
          }}
          onChange={(event, newValue) => {
            if (event?.type === "click") {
              setValue(newValue);
              if (!newValue) {
                setSearch("");
              }
            }
          }}
          loading={loading}
          options={data}
          renderOption={(props, option) => (
            <Box
              key={`${name}-option-${option.value}`}
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              {renderDropdownContent(option)}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              error={helperText ? true : false}
              {...params}
              label={label}
            />
          )}
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </React.Fragment>
  );
};

export default SelectAutocomplete;
