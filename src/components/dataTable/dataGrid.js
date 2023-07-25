"use client";
import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CustomPagination from "./customPagination";
import LinearProgress from "@mui/material/LinearProgress";
import { CustomToolbar } from "./customToolbar";
const DataGridTable = (props) => {
  const {
    rows,
    columns,
    setSelectionModel,
    setSortModel,
    sortModel,
    setPage,
    setFilterModel,
    filterModel,
    checkboxSelection,
    disableSelectionOnClick,
    autoHeight,
    loading,
    pageSize,
    selectionModel,
    rowCount,
    setPageSize,
    isColumnButton = true,
    isFilterButton = true,
    isDensitySelector = true,
    isDate = true,
    isSearch = true,
    isClear = true,
    filterEndDate,
    filterStartDate,
    onFilterEndDate,
    onFilterStartDate,
    filterSearch,
    onFilterSearch,
    onResetFilter,
    page,
    handleOpenConfirm,
  } = props;
  return (
    <DataGrid
      // INITIAL STATE START
      initialState={{
        pagination: { paginationModel: { pageSize: pageSize, page: page } },
      }}
      // INITIAL STATE END

      // CHECKBOXSELECTION START
      checkboxSelection={checkboxSelection}
      // CHECKBOXSELECTION END

      // disableSelectionOnClick START
      disableSelectionOnClick={disableSelectionOnClick}
      // disableSelectionOnClick END

      // ROW COLUMN START
      rows={rows}
      columns={columns}
      // ROW COLUMN START

      // AUTOHEIGHT START
      autoHeight={autoHeight}
      // AUTOHEIGHT START

      // PAGINATION START
      pagination
      paginationMode="server"
      onPaginationModelChange={(newPage) => {
        setPage(newPage.page);
        setPageSize(newPage.pageSize);
      }}
      // PAGINATION END

      // LOADING START
      loading={loading}
      // LOADING START

      // ROW OPTION START
      rowsPerPageOptions={[5, 10, 20, 50, 100]}
      rowCount={rowCount}
      // ROW OPTION START

      // SORTING START
      sortingMode="client"
      sortModel={sortModel}
      onSortModelChange={setSortModel}
      // SORTING END

      // SELECTION MODEL START
      selectionModel={selectionModel}
      onRowSelectionModelChange={(newSelectionModel) => {
        setSelectionModel(newSelectionModel);
      }}
      // SELECTION MODEL START

      // FILTER MODEL START
      filterMode="client"
      filterModel={filterModel}
      onFilterModelChange={(model) => setFilterModel(model)}
      // FILTER MODEL START

      // SLOT START
      slots={{
        loadingOverlay: LinearProgress,
        // pagination: CustomPagination,
        toolbar: CustomToolbar,
      }}
      slotProps={{
        toolbar: {
          printOptions: { disableToolbarButton: true },
          csvOptions: { disableToolbarButton: true },
          isColumnButton: isColumnButton,
          isFilterButton: isFilterButton,
          isDensitySelector: isDensitySelector,
          isDate: isDate,
          isSearch: isSearch,
          isClear: isClear,
          filterEndDate: filterEndDate,
          filterStartDate: filterStartDate,
          onFilterEndDate: onFilterEndDate,
          onFilterStartDate: onFilterStartDate,
          filterSearch: filterSearch,
          onFilterSearch: onFilterSearch,
          onResetFilter: onResetFilter,
          handleOpenConfirm: handleOpenConfirm,
          selectionModel: selectionModel,
        },
      }}
      // SLOT END
    />
  );
};

export default DataGridTable;
