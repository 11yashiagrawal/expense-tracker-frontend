"use client"
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "@/lib/theme";
import { AuthProvider } from "@/context/AuthContext";
import NavigationGuard from "@/components/auth/NavigationGuard";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Trackify",
//   description: "Expense Tracker and subscription manager",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CssBaseline />
            <AuthProvider>
              <NavigationGuard>
                {children}
              </NavigationGuard>
            </AuthProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
