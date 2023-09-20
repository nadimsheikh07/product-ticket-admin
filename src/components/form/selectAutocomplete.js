import { Autocomplete, FormHelperText, TextField } from "@mui/material";
import React from "react";
import FormControl from "./formControl";
import { find } from "lodash";

const SelectAutocomplete = ({
  name,
  value,
  onChange,
  onInputChange,
  // inputValue,
  getOptionLabel,
  getOptionValue,
  options = [],
  label,
  helperText,
  fullWidth,
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
        });
      });
      setData(newOptions);
    }
  }, [options, value, search]);

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
    onInputChange(value);
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

  return (
    <React.Fragment>
      <FormControl
        key={`key${name}`}
        error={helperText ? true : false}
        fullWidth={fullWidth}
      >
        <Autocomplete
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
