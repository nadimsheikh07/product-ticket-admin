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
}) => {
  const [inputValue, setInputValue] = React.useState("");

  const delayedQuery = React.useCallback(debounce(searchData, 1000), []);

  return (
    <>
      <FormControl
        key={`key${name}`}
        error={helperText ? true : false}
        fullWidth={fullWidth}
      >
        <Autocomplete
          fullWidth={fullWidth}
          name={name}
          value={value}
          onChange={(event, newValue) => {
            onChange(newValue);
            delayedQuery(null);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            let newValue = newInputValue ? newInputValue : "";
            setInputValue(newValue);
            delayedQuery(newValue);
          }}
          options={options}
          renderInput={(params) => (
            <TextField {...params} label={label} placeholder={placeholder} />
          )}
          disabled={disabled}
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </>
  );
};

export default SelectMuiAutocomplete;
