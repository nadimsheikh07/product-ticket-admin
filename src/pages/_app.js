// import '@/styles/globals.css'
import { AuthProvider } from "@/auth/JwtContext";
import { CollapseDrawerProvider } from "@/contexts/CollapseDrawerContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { SettingsProvider, ThemeSettings } from "@/components/settings";
import { MotionLazyContainer } from "@/components/animate";
import ThemeProvider from "@/theme";
import SnackbarProvider from "@/components/snackbar/SnackbarProvider";
import "simplebar-react/dist/simplebar.min.css";
import "react-chat-elements/dist/main.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StepperProvider } from "@/components/stepper/stepperContext";
import { CompanyProvider } from "@/contexts/CompanyContext";
import PermissionGuard from "@/auth/permissionGuard";
export default function App(props) {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <CompanyProvider>
      <AuthProvider>
        <ThemeProvider>
          <PermissionGuard>
            <CollapseDrawerProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <SettingsProvider>
                  <MotionLazyContainer>
                    <ThemeSettings>
                      <SnackbarProvider>
                        <StepperProvider>
                          {getLayout(<Component {...pageProps} />)}
                        </StepperProvider>
                      </SnackbarProvider>
                    </ThemeSettings>
                  </MotionLazyContainer>
                </SettingsProvider>
              </LocalizationProvider>
            </CollapseDrawerProvider>
          </PermissionGuard>
        </ThemeProvider>
      </AuthProvider>
    </CompanyProvider>
  );
}
