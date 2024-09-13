"use client";

import { useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { useFetch } from "@/hooks/useFetch";
import type { tasksProps } from "./types/Types";
import { DataTable } from "./tasks/data-table";
import { columns } from "./tasks/columns";
import { Input } from "@/components/ui/input";
import { CiCalendarDate, CiSearch } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import SideBar from "@/components/Sidebar";
import AddTaskModal from "@/components/AddTaskModal";
import Loading from "@/components/Loading";
import { mutate } from "swr";
import { filtersAtom } from "./Atoms";
import AddNewFolder from "@/components/AddNewFolder";
import SelectWorking from "@/components/SelectWorking";
import { getValueWorkingByDateTask } from "@/utils/getValueWorkingByDateTask";
import SelectStatus from "@/components/SelectStatus";
import SelectPrority from "@/components/SelectPriority";
import SelectCompetency from "@/components/SelectCompetency";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatDateToUs } from "@/utils/formatDateToUS";
import { isServer } from "@/lib/isServer";

export default function Home() {
	const [allData, setAllData] = useState<tasksProps[]>([]);
	const [filters, setFilters] = useAtom(filtersAtom);

	const { data, error, isLoading } = useFetch({
		url: "http://localhost:3000/tarefas",
	});

	const sensitiveDataByFilters = useMemo(dynamicFilterFunction, [allData, filters]);

	if (!isServer()) return;

	useEffect(() => {
		if (data?.length) {
			setAllData(data);
		}
	}, [data]);

	function dynamicFilterFunction() {
		const scearchTerm = filters.search?.toLowerCase();

		const filterMap = {
			search: (task: tasksProps) =>
				!scearchTerm || task.name.toLowerCase().includes(scearchTerm),
			priority: (task: tasksProps) =>
				filters.priority === "Todos" || task.priority === filters.priority,
			status: (task: tasksProps) =>
				filters.status === "Todos" || task.status === filters.status,
			working: (task: tasksProps) =>
				filters.working === "Todos" ||
				getValueWorkingByDateTask(task.finalizationDate)?.toString() ===
					filters.working,
			competency: (task: tasksProps) => {
				const taskCompetency = format(
					new Date(formatDateToUs(task.creationDate)),
					"MMMM/yy",
					{ locale: ptBR },
				).toLowerCase();

				return !filters.competency || taskCompetency === filters.competency;
			},
			folder: (task) => !filters.folder || task.folder === filters.folder,
		};
    
		return allData.filter((task) =>
			Object.values(filterMap).every((filterFunc) => filterFunc(task)),
		);
	}

	if (isLoading) return <Loading />;
	if (!isLoading && !error)
		return (
			<div className="flex bg-[#F5F6FA] dark:bg-black/20 transition-colors durantion-100">
				<SideBar />
				<div className="w-[85%]">
					<div className="flex items-center justify-between bg-white dark:bg-[#1e293b] border border-black/10 w-full h-20 p-4">
						<div className="flex items-center gap-3">
							<h1 className="text-xl w-40 font-semibold">
								{filters.folder === null
									? "Todas as tarefas"
									: filters.folder.toString()}
							</h1>
							<div className="relative flex items-center">
								<CiSearch className="absolute focus:hidden m-2" />
								<Input
									type="text"
									className="h-8 focus:border-0 overflow-hidden"
									onChange={(e) =>
										setFilters({ ...filters, search: e.target.value })
									}
								/>
							</div>
						</div>
						<div className="flex gap-3">
							<div className="flex gap-3">
								<div>
									<SelectPrority />
								</div>
								<div>
									<SelectStatus />
								</div>
								<div>
									<SelectWorking />
								</div>
								<div>
									<SelectCompetency />
								</div>
								<div>
									<Button variant="outline">
										<CiCalendarDate />
									</Button>
								</div>
							</div>
							<AddNewFolder />
							<AddTaskModal />
						</div>
					</div>
					<DataTable columns={columns} data={sensitiveDataByFilters} />
				</div>
			</div>
		);
}
