import TextField from "@mui/material/TextField";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import moment from "moment";
import PropTypes from "prop-types";
import FormControl from "./formControl";

const DateTimePickerBox = (props) => {
  const {
    formik,
    name,
    label,
    fullWidth,
    isRequired,
    disablePast = true,
  } = props;

  let error = formik.touched[name] && formik.errors[name];

  let helperText = formik.touched[name] && formik.errors[name];

  return (
    <FormControl key={`key${name}`} fullWidth={fullWidth} error={error}>
      <MobileDateTimePicker
        disablePast={disablePast}
        minDateMessage=" "
        inputFormat={"dd/MMM/yyyy hh:mm a"}
        label={label}
        error={error}
        value={formik.values[name]}
        onChange={(newValue) => {
          let datetimeFormat = "YYYY-MM-DD hh:mm:ss a";
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
              placeholder: "dd/mm/yyyy hh:mm:ss",
            }}
          />
        )}
      />
    </FormControl>
  );
};

DateTimePickerBox.defaultProps = {
  formik: [],
  name: "datetime",
  label: "Datetime",
  fullWidth: false,
};

DateTimePickerBox.propTypes = {
  formik: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
};
export default DateTimePickerBox;
