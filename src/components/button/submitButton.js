import { LoadingButton } from "@mui/lab";
import PropTypes from "prop-types";

const SubmitButton = ({ title, loading, variant, disabled = false }) => (
  <LoadingButton
    loading={loading}
    disabled={disabled}
    variant={variant}
    type="submit"
  >
    {title}
  </LoadingButton>
);

SubmitButton.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  variant: PropTypes.string,
};

export default SubmitButton;
