import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { debounce } from "lodash";

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
}) => {
  const [inputValue, setInputValue] = React.useState("");

  const delayedQuery = React.useCallback(debounce(searchData, 1000), []);

  return (
    <>
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
          if (event?.type === "change") {
            setInputValue(newInputValue);
            delayedQuery(newInputValue);
          } else {
            setInputValue(newInputValue);
          }
        }}
        options={options}
        renderInput={(params) => (
          <TextField {...params} label={label} placeholder={placeholder} />
        )}
        disabled={disabled}
      />
    </>
  );
};

export default SelectMuiAutocomplete;
