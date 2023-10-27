import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import * as React from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { CustomeButton, SubmitButton } from "../button";
import { StepperContext } from "../stepper/stepperContext";

let highestIndex = 0;

const ScrollableTabs = ({
  tabs,
  formik,
  isLastStep,
  disabled,
  hideButton,
  isTraningClassCalenderPopUp,
}) => {
  const router = useRouter();
  const { id } = router.query;
  const { value, setValue, handleChange } = React.useContext(StepperContext);
  const checkError = () => {
    let selectTab = [];
    if (tabs) {
      tabs.map((element, index) => {
        if (element?.fields && formik?.errors) {
          const isEquipmentTranster = formik?.errors?.equipment_transfers;
          const errors = Object.keys(formik.errors);
          element.fields.map((item, i) => {
            if (errors.includes(item)) {
              // set default tab for error
              selectTab.push(index);
            } else if (isEquipmentTranster) {
              if (isEquipmentTranster[element.fields[i]]) {
                selectTab.push(index);
              }
            }
          });
        }
      });
    }

    if (selectTab && selectTab.length) {
      setValue(selectTab[0]);
      if (selectTab[0] >= highestIndex) {
        highestIndex = selectTab[0];
      }
    }
  };

  React.useEffect(() => {
    if (formik.isSubmitting) {
      checkError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik]);

  const _handleBack = () => {
    setValue(value - 1);
  };

  return (
    <>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          TabIndicatorProps={{
            sx: {
              backgroundColor: "#A1242E",
            },
          }}
        >
          {tabs &&
            tabs.map((tab, index) => (
              <Tab
                disabled={index > highestIndex && id === "new" ? true : false}
                sx={{
                  paddingLeft: "15px",
                  paddingRight: "15px",
                  backgroundColor:
                    Number(value) === index
                      ? "rgb(220, 163, 43)!important"
                      : "",
                  color:
                    Number(value) === index
                      ? "rgb(255, 255, 255) !important"
                      : "",
                }}
                key={`tab${index}`}
                label={tab.title}
                value={index}
              />
            ))}
        </TabList>
        <br />
        {tabs &&
          tabs.map((tab, index) => (
            <TabPanel key={`tab${index}`} value={index}>
              {tab.component}
            </TabPanel>
          ))}
      </TabContext>
      {!hideButton && (
        <>
          <Box
            sx={{ display: "flex", marginTop: "20px", justifyContent: "end" }}
          >
            {value !== 0 && (
              <Box sx={{ marginRight: "15px" }}>
                <CustomeButton
                  color="secondary"
                  onClick={() => _handleBack()}
                  variant="outlined"
                  title="Back"
                />
              </Box>
            )}

            <Box>
              <SubmitButton
                loading={formik.isSubmitting}
                disabled={formik.isSubmitting || disabled}
                variant="contained"
                title={
                  isLastStep
                    ? (id || isTraningClassCalenderPopUp) === "new"
                      ? "Submit"
                      : "Update"
                    : "Next"
                }
              />
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

ScrollableTabs.DefaultProps = {
  tabs: [],
};

ScrollableTabs.propTypes = {
  tabs: PropTypes.array,
  formik: PropTypes.object,
  isLastStep: PropTypes.any,
  hideButton: PropTypes.any,
  disabled: PropTypes.any,
  value: PropTypes.any,
};

export default ScrollableTabs;
