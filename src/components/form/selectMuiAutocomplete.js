import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const SelectMuiAutocomplete = ({
  value,
  onChange,
  label,
  name,
  options = [],
  fullWidth,
  searchData = () => {},
  disabled,
}) => {
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    searchData(inputValue);
  }, [inputValue]);
  return (
    <>
      <Autocomplete
        fullWidth={fullWidth}
        name={name}
        value={value}
        onChange={(event, newValue) => {
          onChange(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={options}
        renderInput={(params) => <TextField {...params} label={label} />}
        disabled={disabled}
      />
    </>
  );
};

export default SelectMuiAutocomplete;
