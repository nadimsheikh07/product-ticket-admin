import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import axiosInstance from '@utils/axios';
import React from "react";
import PropTypes from "prop-types";
import axiosInstance from "@/utils/axios";
import Iconify from "@/components/iconify/Iconify";

const ActionMenu = ({ row, field }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openUrl = async (url) => {
    await axiosInstance.get(url).then((response) => {
      if (response.status == 200) {
        window.open(response.data.url, "_blank");
      }
    });

    handleClose();
  };

  const viewUrl = (url) => {
    window.open(url, "_blank");
  };

  if (row[field]) {
    return (
      <div style={{ cursor: "pointer" }}>
        <Iconify
          icon={"ion:qr-code"}
          color="#1877F2"
          width={20}
          height={20}
          onClick={handleClick}
        />

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          {row[field].download && (
            <MenuItem onClick={() => openUrl(`${row[field].download}`)}>
              Download Qr Code
            </MenuItem>
          )}
          {row[field].url && (
            <MenuItem onClick={() => openUrl(`${row[field].url}`)}>
              Open Qr Code
            </MenuItem>
          )}
          {row[field].view_url && (
            <MenuItem onClick={() => viewUrl(`${row[field].view_url}`)}>
              View Url
            </MenuItem>
          )}
        </Menu>
      </div>
    );
  } else {
    return <div>N/A</div>;
  }
};

ActionMenu.propTypes = {
  row: PropTypes.any,
  field: PropTypes.string,
};

export const QrActionColumn = (field = "product_qr", headerName = "QR") => ({
  field: field,
  headerName: headerName,
  width: 200,
  sortable: false,
  filterable: false,
  renderCell: ({ row }) => <ActionMenu row={row} field={field} />,
});
