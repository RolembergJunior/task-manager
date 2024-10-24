"use client";

import NavLink from "./components/NavLink";
import { GiNetworkBars } from "react-icons/gi";
import { TbReportSearch } from "react-icons/tb";
import { IoMdHome } from "react-icons/io";
import { FaInbox, FaPowerOff } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";
import { IoMoonOutline, IoSettingsOutline } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import FolderList from "./components/FolderList";

export default function SideBar() {
	const { theme, setTheme } = useTheme();

	return (
		<section className="flex flex-col justify-between bg-[#ffff] dark:bg-[#1e293b] w-[15%] h-screen space-y-4 shadow-lg transition-all">
			<div>
				<header className=" flex items-center justify-between bg-white dark:bg-[#1e293b] dark:border-white/20 border-b p-5">
					<div className="flex items-center gap-1">
						<img
							src="/logo.png"
							alt="Logo da empresa"
							className="mx-auto rounded-full"
							width={40}
						/>
						<h1 className="dark:text-white text-lg font-bold text-center">
							Rolemberg
						</h1>
					</div>
					<FaEllipsisVertical size={18} color="gray" />
				</header>
				<nav className="border-black/10 space-y-2 p-3">
					<NavLink href="/" name="Início" icon={<IoMdHome color="gray" />} />
					<NavLink href="/Inbox" name="Sobre" icon={<FaInbox color="gray" />} />
					<NavLink
						href="/dashboard"
						name="Dashboard"
						icon={<GiNetworkBars color="gray" />}
					/>
					<NavLink
						href="/reports"
						name="Relatórios"
						icon={<TbReportSearch color="gray" />}
					/>
					<FolderList />
					<hr className="w-[80%] mx-auto mb-2 dark:border-white/20" />
					<NavLink
						href="/Inbox"
						name="Configurações"
						icon={<IoSettingsOutline color="gray" />}
					/>
					<Button
						variant={"destructive"}
						className="hover:bg-red-800 w-full h-14 transition-all"
					>
						<div className="flex items-center justify-between gap-5">
							<span>DESCONECTAR</span>
							<FaPowerOff />
						</div>
					</Button>
				</nav>
			</div>
			<div className="bg-white dark:bg-[#1e293b] border-t dark:border-t-white/20 p-3">
				<div className="flex justify-between bg-[#D9D9D9] dark:bg-white/20 w-[85%] h-10 mx-auto gap-1 p-1 rounded-md transition-all">
					<div
						onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
						className="bg-white dark:bg-transparent flex items-center gap-2 p-4 rounded-md hover:cursor-pointer"
					>
						<LuSun />
						<p>Claro</p>
					</div>
					<div
						onClick={() => setTheme(theme === "light" ? "dark" : "light")}
						className="bg-transparent dark:bg-black flex items-center gap-2 p-4 rounded-md hover:cursor-pointer"
					>
						<IoMoonOutline />
						<p className=" dark:text-white">Escuro</p>
					</div>
				</div>
			</div>
		</section>
	);
}
