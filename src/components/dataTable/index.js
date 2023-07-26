"use client";
import * as React from "react";
import DataGridTable from "./dataGrid";
import { TabComponent } from "./tab";
import { Card } from "@mui/material";
import axiosInstance from "@/utils/axios";
import { useSnackbar } from "notistack";
import { ConfirmDialogBox } from "./confirmDialog";

export const DataTable = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    columns,
    defaultSortModel,
    autoHeight = true,
    disableSelectionOnClick,
    checkboxSelection,
    defaultFilterModel,
    actionUrl,
    title = "One Way Taxi",
    Tabs = [
      {
        value: "all",
        label: "All",
      },
    ],
    params,
    isColumnButton,
    isFilterButton,
    isDensitySelector,
    isDate,
    isSearch,
    isClear,
  } = props;

  const [filterStatus, setFilterStatus] = React.useState("all");
  const [rows, setRowsData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [rowCount, setRowCount] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [sortModel, setSortModel] = React.useState(defaultSortModel);
  const [filterModel, setFilterModel] = React.useState(defaultFilterModel);
  const [filterSearch, setFilterSearch] = React.useState("");
  const [filterStartDate, setFilterStartDate] = React.useState(null);
  const [filterEndDate, setFilterEndDate] = React.useState(null);
  const [openConfirm, setOpenConfirm] = React.useState(false);

  const onFilterEndDate = (newValue) => {
    setFilterEndDate(newValue);
  };
  const onFilterStartDate = (newValue) => {
    setFilterStartDate(newValue);
  };
  const onFilterSearch = (e) => {
    setFilterSearch(e.target.value);
  };

  const onResetFilter = () => {
    setFilterSearch("");
    setFilterStartDate(null);
    setFilterEndDate(null);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const getRowData = async () => {
    setLoading(true);
    const filter = {
      page: page + 1,
      pageSize: pageSize,
      search: filterSearch,
      orderBy: sortModel[0]?.field,
      orderDirection: sortModel[0]?.sort,
      filterModel: JSON.stringify(filterModel),
      ...params,
    };
    await axiosInstance
      .get(actionUrl, { params: filter })
      .then((response) => {
        if (response.status === 200) {
          if (response?.data) {
            setRowsData(response?.data);
            if (response?.data?.data) {
              setRowsData(response?.data?.data);
            }
            if (response?.data?.total) {
              setRowCount(response?.data?.total);
            }
            setLoading(false);
          }
        }
      })
      .catch((error) => {
        setLoading(false);
        const { response } = error;
        if (response && response?.data && response?.data?.message) {
          enqueueSnackbar(response?.data?.message, {
            variant: "error",
          });
        }
      });
  };
  React.useEffect(() => {
    getRowData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filterModel,
    sortModel,
    page,
    pageSize,
    filterSearch,
    filterStartDate,
    filterEndDate,
    filterStatus,
  ]);

  const handleDeleteRows = async () => {
    await axiosInstance
      .delete(`${actionUrl}/${selectionModel.join(",")}`)
      .then((response) => {
        if (response.status === 200) {
          enqueueSnackbar(response?.data?.message, {
            variant: "success",
          });
          handleCloseConfirm();
          getRowData();
        }
      })
      .catch((error) => {
        handleCloseConfirm();
        const { response } = error;
        enqueueSnackbar(response?.data?.message, {
          variant: "error",
        });
      });
  };

  const handleFilterStatus = (event, newValue) => {
    setPage(0);
    setFilterStatus(newValue);
  };

  return (
    <React.Fragment>
      <Card>
        <TabComponent
          title={title}
          TAB_OPTIONS={Tabs}
          filterStatus={filterStatus}
          handleFilterStatus={handleFilterStatus}
        />
        <DataGridTable
          columns={columns}
          rows={rows}
          loading={loading}
          setSelectionModel={setSelectionModel}
          setSortModel={setSortModel}
          selectionModel={selectionModel}
          rowCount={rowCount}
          sortModel={sortModel}
          pageSize={pageSize}
          page={page}
          setPage={setPage}
          setFilterModel={setFilterModel}
          setPageSize={setPageSize}
          filterModel={filterModel}
          checkboxSelection={checkboxSelection}
          disableSelectionOnClick={disableSelectionOnClick}
          autoHeight={autoHeight}
          isColumnButton={isColumnButton}
          isFilterButton={isFilterButton}
          isDensitySelector={isDensitySelector}
          isDate={isDate}
          isSearch={isSearch}
          isClear={isClear}
          filterEndDate={filterEndDate}
          filterStartDate={filterStartDate}
          onFilterEndDate={onFilterEndDate}
          onFilterStartDate={onFilterStartDate}
          filterSearch={filterSearch}
          onFilterSearch={onFilterSearch}
          onResetFilter={onResetFilter}
          handleOpenConfirm={handleOpenConfirm}
        />
      </Card>

      <ConfirmDialogBox
        selected={selectionModel}
        handleCloseConfirm={handleCloseConfirm}
        handleDeleteRows={handleDeleteRows}
        openConfirm={openConfirm}
      />
    </React.Fragment>
  );
};
