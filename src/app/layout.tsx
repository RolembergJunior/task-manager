import type { Metadata } from "next";
import "./globals.css";
import AtomProvider from "@/components/Provider";

export const metadata: Metadata = {
  title: "Task Manager"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AtomProvider>
        <body>
            {children}
        </body>
      </AtomProvider>
    </html>
  );
}
