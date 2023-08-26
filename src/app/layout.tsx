import "./globals.css";
import type { Metadata } from "next";
import ToastProvider from "./lib/toast.provider";
import "react-tooltip/dist/react-tooltip.css";
import FeedbackButton from "./components/FeedbackButton";

export const metadata: Metadata = {
  title: "Vhipple",
  description: "Analyze your FHIR data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full w-full">
      <body className="h-full w-full" suppressHydrationWarning>
        <ToastProvider>{children}</ToastProvider>
        <FeedbackButton />
      </body>
    </html>
  );
}
