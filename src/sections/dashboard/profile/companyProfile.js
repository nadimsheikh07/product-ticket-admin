import { Grid, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const CompanyProfile = ({
  formik,
  handleClose,
  handleClickOpen,
  open,
  setOpen,
}) => {
    
  return (
    <>
      <Box>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Stack direction="row" spacing={20}>
                  <Box>
                    <Typography sx={{ fontSize: 14 }} variant="h6" gutterBottom>
                    Company  Profile Information
                    </Typography>
                  </Box>
                  {/* <Box>
                    <Button onClick={handleClickOpen}>
                      <EditIcon />
                    </Button>
                  </Box> */}
                </Stack>
                <Typography variant="body2" mt={5}>
                  Code: 
                  {formik?.values?.company?.code}
                </Typography>
                <Typography variant="body2" mt={5}>
                  Name: 
                  {formik?.values?.company?.name}
                </Typography>               
                <Typography variant="body2" mt={2}>
                  Email:
                   {formik.values.company?.email}
                </Typography>
                <Typography variant="body2" mt={2}>
                  Mobile: 
                  {formik.values.company?.phone_number}
                </Typography>
                {/* <Typography sx={{ mb: 1.5 }} color="text.secondary" mt={3}>
                  {formik.values.address}
                </Typography> */}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};


export default CompanyProfile;
