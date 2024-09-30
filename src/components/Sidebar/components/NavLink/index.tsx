"use client";

import { Modals } from "@/app/types/Types";
import { openModal } from "@/utils/openModal";
import { useRouter } from "next/navigation";
import type { ReactElement } from "react";

interface NavLinkProps {
	icon: ReactElement;
	name: string;
	href: string;
}

export default function NavLink({ icon, name, href }: NavLinkProps) {
	const route = useRouter();

	function onClickNewRote(modalName: string) {
		openModal(modalName, "CARREGANDO");

		route.push(`http://localhost:3001${href}`);
	}

	return (
		<div
			onClick={() => onClickNewRote(Modals.LOADING)}
			className="flex items-center gap-3 px-3 py-2 hover:cursor-pointer hover:bg-[#F6F6F6] hover:dark:bg-black hover:rounded-lg transition-all"
		>
			{icon}
			<p className="text-[#5C5E64] dark:text-white/80 font-semibold">{name}</p>
		</div>
	);
}
