"use client";

import { useRouter } from "next/navigation";
import { ReactElement } from "react";

interface NavLinkProps {
	icon: ReactElement;
	name: string;
	href: string;
}

export default function NavLink({ icon, name, href }: NavLinkProps) {
	const router = useRouter();

	return (
		<div
			onClick={() => router.push(href)}
			className="flex items-center gap-3 px-3 py-2 hover:cursor-pointer hover:bg-[#F6F6F6] hover:dark:bg-black hover:rounded-lg transition-all"
		>
			{icon}
			<a className="text-[#5C5E64] dark:text-white/80 font-semibold">{name}</a>
		</div>
	);
}
