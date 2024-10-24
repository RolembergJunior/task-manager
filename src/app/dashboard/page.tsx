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
import Header from "@/components/Header";

export default function Dashboard() {
	const { data } = useFetch({ url: "http://localhost:3000/tarefas" });
	const { closeModal } = useUpdateAtomModal();
	const [_, setFilters] = useAtom(filtersAtom);

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
		<>
			<ThemeProvider attribute="class">
				<main className="flex">
					<SideBar />
					<header className="flex flex-col bg-[#F5F6FA] dark:bg-black/70 w-[85%]">
						<Header
							title="DashBoard"
							titleButton="Editar Layout"
							onClickButton={() => null}
						/>
						<section className="grid grid-rows-3 grid-cols-3 w-full h-[90vh] p-5 gap-2">
							<CountTaskStatus />
							<PercentLateTaskDash />
							<BarChartGeral />
						</section>
					</header>
				</main>
			</ThemeProvider>
		</>
	);
}
