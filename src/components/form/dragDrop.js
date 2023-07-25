import { CardImageBox } from "../card";
import {
  CircularProgress,
  FormHelperText,
  TextField,
  styled,
} from "@mui/material";
import { green } from "@mui/material/colors";
import axiosInstance from "@/utils/axios";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import { FormControl } from "./index";
// const fileTypes = ["JPG", "PNG", "GIF", "JFIF", "JPEG"];

// eslint-disable-next-line arrow-body-style
const AddImage = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.33317 6.66667H22.6665V16H25.3332V6.66667C25.3332 5.196 24.1372 4 22.6665 4H5.33317C3.8625 4 2.6665 5.196 2.6665 6.66667V22.6667C2.6665 24.1373 3.8625 25.3333 5.33317 25.3333H15.9998V22.6667H5.33317V6.66667Z"
        fill="#0658C2"
      />
      <path
        d="M10.6665 14.6667L6.6665 20H21.3332L15.9998 12L11.9998 17.3333L10.6665 14.6667Z"
        fill="#0658C2"
      />
      <path
        d="M25.3332 18.6667H22.6665V22.6667H18.6665V25.3333H22.6665V29.3333H25.3332V25.3333H29.3332V22.6667H25.3332V18.6667Z"
        fill="#0658C2"
      />
    </svg>
  );
};

const RootStyle = styled("div")(() => ({
  maxWidth: "100% !important",
  border: "2px dashed #0658c2 !important",
  borderRadius: "5px",
  cursor: "pointer",
  height: "48px",
  display: "flex",
  alignItems: "center",
  padding: "8px 16px 8px 8px",
  marginBottom: "8px",
  "&:hover": {
    backgroundColor: "#d6f9f9 !important",
  },
}));

const FileUploaders = styled(FileUploader)(() => ({
  maxWidth: "100% !important",
  border: "2px dashed #0658c2 !important",
  borderRadius: "5px",
  cursor: "pointer",
  height: "48px",
  display: "flex",
  alignItems: "center",
  padding: "8px 16px 8px 8px",
  marginBottom: "8px",
  "&:hover": {
    backgroundColor: "#d6f9f9 !important",
  },
}));

const Label = styled("span")(() => ({
  fontSize: "12px",
  color: "#666",
}));

const DragDrop = (props) => {
  const {
    name,
    value,
    required,
    fullWidth,
    helperText,
    disabled,
    isDocument = false,
  } = props;
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");
  const [file, setFile] = React.useState("");
  const [loader, setLoader] = React.useState("");
  const [fileTypes, setFileTypes] = React.useState([]);

  useEffect(() => {
    if (value) {
      setFile(value);
    } else setFile("");
  }, [value]);

  useEffect(() => {
    if (isDocument) {
      setFileTypes([
        "jpeg",
        "png",
        "gif",
        "pdf",
        "docx",
        "xlsx",
        "ppt",
        "pptx",
        "zip",
        "doc",
        "jpg",
        "jfif",
        "JPEG",
        "JFIF",
      ]);
    } else setFileTypes(["JPG", "PNG", "GIF", "JFIF", "JPEG"]);
  }, [isDocument]);

  const fileUpload = async (file) => {
    setLoader(true);
    let newfile = file;
    const formData = new FormData();
    formData.append("file", newfile);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    await axiosInstance
      .post(`/${props.url}`, formData, config)
      .then((response) => {
        const { data } = response;
        if (response.status === 200) {
          setMessage(data.message);
          console.log("data.url", data);
          props.onChange(data.url);
          setLoader(false);
        } else {
          setError(data.message);
          setLoader(false);
        }
      })
      .catch((error) => {
        const { response } = error;
        setError(response?.data?.message);
        setLoader(false);
      });
  };

  return (
    <>
      {!file && (
        <FileUploaders handleChange={fileUpload} name={name} types={fileTypes}>
          <RootStyle>
            {file ? (
              <Label>{file}</Label>
            ) : error ? (
              error
            ) : (
              <>
                {" "}
                <AddImage /> <Label>
                  Upload or drop a file right here
                </Label>{" "}
              </>
            )}
            {loader && (
              <CircularProgress size="35px" sx={{ marginLeft: "40px" }} />
            )}
          </RootStyle>
        </FileUploaders>
      )}
      {file && (
        <>
          {" "}
          <CardImageBox
            isDocument={isDocument}
            sx={{
              border: "0px solid",
              width: "100px",
              marginTop: 2,
              marginBottom: 2,
            }}
            sxicon={{
              textAlign: "center",
              justifyContent: "center",
              paddingTop: 0,
              paddingBottom: 0,
            }}
            src={file}
            height={"48"}
            alt={"image"}
            icon="delete"
            fontSize={"small"}
            deleteSelected={() => props.onChange("")}
          />{" "}
        </>
      )}
      <div style={{ display: "none" }}>
        <FormControl
          key={`key${name}`}
          error={helperText ? true : false}
          fullWidth={fullWidth}
          required={required}
        >
          <TextField
            error={helperText || error ? true : false}
            success={error ? "false" : "true"}
            name={name}
            type="url"
            readOnly={disabled}
            required={required}
            disabled={disabled}
            value={value}
            onChange={(e) => props.onChange(e.target.value)}
          />
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
          {error && <FormHelperText>{error}</FormHelperText>}
          {message && (
            <FormHelperText style={{ color: green[500] }}>
              {message}
            </FormHelperText>
          )}
        </FormControl>
      </div>
    </>
  );
};

DragDrop.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  value: PropTypes.number,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  isDocument: PropTypes.bool,
};

export default DragDrop;
