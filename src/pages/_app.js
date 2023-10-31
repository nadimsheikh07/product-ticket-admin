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
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StepperProvider } from "@/components/stepper/stepperContext";
import { CompanyProvider } from "@/contexts/CompanyContext";
export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CollapseDrawerProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <SettingsProvider>
              <MotionLazyContainer>
                <ThemeSettings>
                  <SnackbarProvider>
                    <CompanyProvider>
                      <DashboardLayout>
                        <StepperProvider>
                          <Component {...pageProps} />
                        </StepperProvider>
                      </DashboardLayout>
                    </CompanyProvider>
                  </SnackbarProvider>
                </ThemeSettings>
              </MotionLazyContainer>
            </SettingsProvider>
          </LocalizationProvider>
        </CollapseDrawerProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
