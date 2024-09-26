import type { Metadata } from "next";
import "./globals.css";
import AtomProvider from "@/components/Provider";
import { ThemeProvider } from "next-themes";
import ModalLoading from "@/components/Modal/ModaLoading";

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
					<body>
						{children}
						<div id="modal-root"></div> 
						<ModalLoading/>
					</body>
				</ThemeProvider>
			</AtomProvider>
		</html>
	);
}
