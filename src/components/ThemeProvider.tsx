"use client";

import { ThemeProvider } from "next-themes";

interface ChildrenType {
	children: React.ReactNode;
}

export default function ProviderTheme({ children }: ChildrenType) {
	return <ThemeProvider>{children}</ThemeProvider>;
}
