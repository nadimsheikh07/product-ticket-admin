import TextField from "@mui/material/TextField";
import moment from "moment";
import PropTypes from "prop-types";
import FormControl from "./formControl";
import { DatePicker } from "@mui/x-date-pickers";

const DatePickerBox = (props) => {
  const {
    formik,
    name,
    label,
    fullWidth,
    isRequired,
    disablePast = false,
  } = props;

  let error = formik.touched[name] && formik.errors[name];

  let helperText = formik.touched[name] && formik.errors[name];

  return (
    <FormControl key={`key${name}`} fullWidth={fullWidth} error={error}>
      <DatePicker
        disablePast={disablePast}
        minDateMessage=" "
        inputFormat={"dd/MM/yyyy"}
        label={label}
        error={error}
        value={formik.values[name]}
        onChange={(newValue) => {
          let datetimeFormat = "YYYY-MM-DD";
          formik.setFieldValue(name, moment(newValue).format(datetimeFormat));
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            error={error}
            helperText={helperText}
            required={isRequired}
            inputProps={{
              ...params.inputProps,
              placeholder: "dd/mm/yyyy",
            }}
          />
        )}
      />
    </FormControl>
  );
};

DatePickerBox.defaultProps = {
  formik: [],
  name: "datetime",
  label: "Datetime",
  fullWidth: false,
};

DatePickerBox.propTypes = {
  formik: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
};
export default DatePickerBox;
