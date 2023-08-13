import "./globals.css";
import type { Metadata } from "next";
import LeftSidebar from "./components/Sidebar/LeftSidebar";
import ToastProvider from "./lib/toast.provider";
import "react-tooltip/dist/react-tooltip.css";

export const metadata: Metadata = {
  title: "Whipple",
  description: "Analyze your FHIR data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full w-full">
      <body className="h-full w-full bg-main-bg" suppressHydrationWarning>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
