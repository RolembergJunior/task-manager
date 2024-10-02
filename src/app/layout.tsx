import type { Metadata } from "next";
import "./globals.css";
import AtomProvider from "@/components/Provider";
import ModalLoading from "@/components/Modal/ModaLoading";
import { Toaster } from "sonner";

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
				<body>
					{children}
					<div id="modal-root"></div>
					<ModalLoading />
					<Toaster richColors expand={false} position="top-center"  />
				</body>
			</AtomProvider>
		</html>
	);
}
