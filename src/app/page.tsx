"use client";

import { useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { useFetch } from "@/hooks/useFetch";
import { Modals, type tasksProps } from "./types/Types";
import SideBar from "@/components/Sidebar";
import { filtersAtom } from "./atoms/Atoms";
import { DataTable } from "./tasks/data-table";
import { columns } from "./tasks/columns";
import { useFilterTask } from "@/utils/dynamicFilterFunction";
import { ThemeProvider } from "next-themes";
import { useUpdateAtomModal } from "./atoms/actions";
import Header from "@/components/Header";

export default function Home() {
	const [allData, setAllData] = useState<tasksProps[]>([]);
	const [filters] = useAtom(filtersAtom);
	const { closeModal } = useUpdateAtomModal();
	const { search, priority, status, working, competency, folder } =
		useFilterTask();

	const { data, error, isLoading } = useFetch({
		url: "http://localhost:3000/tarefas",
	});

	const sensitiveDataByFilters = useMemo(dynamicFilterFunction, [
		allData,
		filters,
	]);

	useEffect(() => {
		if (data?.length) {
			setAllData(data);
		}
	}, [data]);

	useEffect(() => {
		closeModal(Modals.LOADING);
	}, []);

	function dynamicFilterFunction() {
		const filterMap = {
			search,
			priority,
			status,
			working,
			competency,
			folder,
		};

		return allData.filter((task: tasksProps) =>
			Object.values(filterMap).every((filterFunc) => filterFunc(task)),
		);
	}

	if (!isLoading && !error)
		return (
			<ThemeProvider attribute="class">
				<div className="flex bg-[#F5F6FA] dark:bg-black/20 transition-colors durantion-100">
					<SideBar />
					<main className="w-[85%]">
						<header className="flex items-center justify-between bg-white dark:bg-[#1e293b] border border-black/10 w-full h-20 p-4">
							<Header
								title={
									filters.folder === null
										? "Todas as tarefas"
										: filters.folder.toString()
								}
								hasAddTaskButton
								hasFolderButton
								hasSearchFilter
								onClickButton={() => null}
							/>
						</header>
						<DataTable columns={columns} data={sensitiveDataByFilters} />
					</main>
				</div>
			</ThemeProvider>
		);
}
