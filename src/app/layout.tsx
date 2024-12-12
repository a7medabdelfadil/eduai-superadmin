import React, { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import NavBar from "./../components/navBar";
import { Providers } from "./GlobalRedux/provider";
import Notification from "../components/Notifications";
import "react-toastify/dist/ReactToastify.css";
import ThemeMode from "../components/ThemeMode";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Education Platform",
  description: "Education Platform",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body className={`${inter.className} duration-300 transition-all `}>
        <Providers>
          <ThemeMode>
            <NavBar />
            <Notification />
            {children}
          </ThemeMode>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
