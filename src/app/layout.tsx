import type { Metadata } from "next";
import "./globals.css";
import AtomProvider from "@/components/Provider";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
	title: "Task Manager",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br">
			<AtomProvider>
				<ThemeProvider attribute="class">
					<body>{children}</body>
				</ThemeProvider>
			</AtomProvider>
		</html>
	);
}
