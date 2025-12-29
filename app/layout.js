import "./globals.css";
import { ThemeProvider } from "../contexts/ThemeContext";
import { AuthProvider } from "../contexts/AuthContext";

import RollbarWrapper from "../components/RollbarWrapper";

export const metadata = {
  title: "Gentle Space - Office Space Solutions",
  description: "Office space solutions tailored for businesses in Bengaluru. Fully furnished offices, co-working spaces, and enterprise solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RollbarWrapper>
          <AuthProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </AuthProvider>
        </RollbarWrapper>
      </body>
    </html>
  );
}