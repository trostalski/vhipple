import "./globals.css";
import type { Metadata } from "next";
import LeftSidebar from "./components/LeftSidebar";

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
      <body className="h-full w-full">
        <div className="h-full w-full flex flex-row">
          <LeftSidebar />
          <main className="bg-sky-50 h-full w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
