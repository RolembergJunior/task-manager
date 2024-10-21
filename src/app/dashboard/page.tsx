"use client";

import { useFetch } from "@/hooks/useFetch";
import { ThemeProvider } from "next-themes";
import SideBar from "@/components/Sidebar";
import CountTaskStatus from "./components/CountTaskStatus";
import PercentLateTaskDash from "./components/PercentLateTasks";
import BarChartGeral from "./components/BarChartGeral";
import SelectCompetency from "@/components/SelectCompetency";
import SelectStatus from "@/components/SelectStatus";
import SelectPriority from "@/components/SelectPriority";
import SelectWorking from "@/components/SelectWorking";
import { Button } from "@/components/ui/button";
import { useEffect, useLayoutEffect } from "react";
import { Modals } from "../types/Types";
import { useUpdateAtomModal } from "../../app/atoms/actions";
import { useAtom } from "jotai";
import { filtersAtom } from "../atoms/Atoms";

export default function Dashboard() {
	const { data } = useFetch({ url: "http://localhost:3000/tarefas" });
	const { closeModal } = useUpdateAtomModal();
	const [filters, setFilters] = useAtom(filtersAtom);

	useEffect(() => {
		closeModal(Modals.LOADING);
	}, []);

	useLayoutEffect(() => {
		return () => {
			setFilters({
				search: "",
				priority: "Todos",
				status: "Todos",
				working: "Todos",
				folder: null,
				competency: null,
			});
		};
	}, []);

	if (!data?.length) return;

	return (
		<section>
			<ThemeProvider attribute="class">
				<div className="flex">
					<SideBar />
					<div className="flex flex-col bg-[#F5F6FA] dark:bg-black/70 w-[85%]">
						<div className="flex justify-between items-center bg-white dark:bg-[#1e293b] border-b w-full h-[81px] p-5 ">
							<h1 className="text-2xl font-semibold">Dashboard</h1>
							<div className="flex space-x-3 ite">
								<SelectCompetency />
								<SelectStatus />
								<SelectPriority />
								<SelectWorking />
							</div>
							<Button className="text-white dark:text-black p-2">
								Editar layout
							</Button>
						</div>
						<section className="grid grid-rows-3 grid-cols-3 w-full h-[90vh] p-5 gap-2">
							<CountTaskStatus />
							<PercentLateTaskDash />
							<BarChartGeral />
						</section>
					</div>
				</div>
			</ThemeProvider>
		</section>
	);
}
