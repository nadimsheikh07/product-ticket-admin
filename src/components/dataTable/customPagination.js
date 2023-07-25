import { Box, FormControl, MenuItem, Select } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import {
  gridPageCountSelector,
  gridPageSizeSelector,
  gridPaginationModelSelector,
  useGridApiContext,
  useGridSelector,
  useGridState,
} from "@mui/x-data-grid";
import React from "react";

const CustomPagination = () => {
  const apiRef = useGridApiContext();
  const paginationModel = useGridSelector(apiRef, gridPaginationModelSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);

  const handleSizeChange = React.useCallback((event) => {
    apiRef.current.setPageSize(Number(event.target.value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = React.useCallback((value) => {
    apiRef.current.setPage(value - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box display="flex" justifyContent="flex-start">
      <Box>
        <FormControl variant="standard">
          <Select value={pageSize} onChange={handleSizeChange}>
            <MenuItem value={10}>{Number(10).toLocaleString()}</MenuItem>
            <MenuItem value={20}>{Number(20).toLocaleString()}</MenuItem>
            <MenuItem value={50}>{Number(40).toLocaleString()}</MenuItem>
            <MenuItem value={100}>{Number(100).toLocaleString()}</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box flexGrow={1} />
      <Box>
        <Pagination
          color="primary"
          variant="outlined"
          shape="rounded"
          count={pageCount}
          page={paginationModel.page + 1}
          defaultPage={10}
          siblingCount={0}
          boundaryCount={1}
          onChange={(event, value) => handlePageChange(value)}
        />
      </Box>
    </Box>
  );
};

export default CustomPagination;
