import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { debounce } from "lodash";
import { FormHelperText } from "@mui/material";
import FormControl from "./formControl";

const SelectMuiAutocomplete = ({
  value,
  onChange,
  label,
  name,
  options = [],
  fullWidth,
  searchData = () => {},
  disabled,
  placeholder,
  helperText,
  required,
  params = null,
}) => {
  const [inputValue, setInputValue] = React.useState("");

  const delayedQuery = React.useCallback(debounce(searchData, 1000), []);

  return (
    <>
      <FormControl
        key={`key${name}`}
        error={helperText ? true : false}
        fullWidth={fullWidth}
        disabled={disabled}
      >
        <Autocomplete
          fullWidth={fullWidth}
          error={helperText ? true : false}
          required={required}
          name={name}
          value={value}
          onChange={(event, newValue) => {
            onChange(newValue);
            delayedQuery({ search: null, ...params });
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            let newValue = newInputValue ? newInputValue : "";
            setInputValue(newInputValue);
            delayedQuery({ search: newValue, ...params });
          }}
          options={options}
          renderInput={(params) => (
            <TextField
              {...params}
              error={helperText ? true : false}
              label={label}
              placeholder={placeholder}
              required={required}
            />
          )}
          disabled={disabled}
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </>
  );
};

export default SelectMuiAutocomplete;
