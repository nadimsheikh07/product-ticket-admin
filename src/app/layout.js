"use client";
import { AuthProvider } from "@/auth/JwtContext";
import "./globals.css";
import { CollapseDrawerProvider } from "@/contexts/CollapseDrawerContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { SettingsProvider, ThemeSettings } from "@/components/settings";
import { MotionLazyContainer } from "@/components/animate";
import ThemeProvider from "@/theme";
import SnackbarProvider from "@/components/snackbar/SnackbarProvider";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import "simplebar-react/dist/simplebar.min.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>
      <body>
        <AuthProvider>
          <ThemeProvider>
            <CollapseDrawerProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <SettingsProvider>
                  <MotionLazyContainer>
                    <ThemeSettings>
                      <SnackbarProvider>
                        <DashboardLayout>{children}</DashboardLayout>
                      </SnackbarProvider>
                    </ThemeSettings>
                  </MotionLazyContainer>
                </SettingsProvider>
              </LocalizationProvider>
            </CollapseDrawerProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
