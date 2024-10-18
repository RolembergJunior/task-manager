"use client";

import { Modals } from "@/app/types/Types";
import { useUpdateAtomModal } from "@/app/atoms/actions";
import { usePathname, useRouter } from "next/navigation";
import type { ReactElement } from "react";

interface NavLinkProps {
	icon: ReactElement;
	name: string;
	href: string;
}

export default function NavLink({ icon, name, href }: NavLinkProps) {
	const { openModal } = useUpdateAtomModal();
	const route = useRouter();
	const pathName = usePathname();

	function onClickNewRote() {
		if (pathName !== href) {
			openModal(Modals.LOADING, "CARREGANDO");

			route.push(`http://localhost:3001${href}`);
		}
	}

	return (
		<div
			onClick={() => onClickNewRote()}
			className="flex items-center gap-3 px-3 py-2 hover:cursor-pointer hover:bg-[#F6F6F6] hover:dark:bg-black hover:rounded-lg transition-all"
		>
			{icon}
			<p className="text-[#5C5E64] dark:text-white/80 font-semibold">{name}</p>
		</div>
	);
}
