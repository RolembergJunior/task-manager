"use client";

import { useAtom } from "jotai";
import { useMemo } from "react";
import { useFetch } from "@/hooks/useFetch";
import { useFilterTask } from "@/utils/dynamicFilterFunction";
import { filtersAtom } from "@/app/atoms/Atoms";
import { Status, type tasksProps } from "@/app/types/Types";
import { formatNumbertoPercent } from "@/utils/formatNumbertoPercent";

type taksByStatusType = {
	[status: string]: tasksProps[];
};

export default function CountTaskStatus() {
	const { data } = useFetch({ url: "http://localhost:3000/tarefas" });
	const [filters] = useAtom(filtersAtom);
	const { search, priority, status, working, competency, folder } =
		useFilterTask();

	const statusTasks = useMemo(separeStatusInArrays, [data, filters]);

	if (!data) return;

	function dynamicFilterFunction() {
		const filterMap = {
			search,
			priority,
			status,
			working,
			competency,
			folder,
		};

		return data.filter((task: tasksProps) =>
			Object.values(filterMap).every((filterFunc) => filterFunc(task)),
		);
	}

	function separeStatusInArrays() {
		const tasksByStatus: taksByStatusType = {};
		const dataFiltered = dynamicFilterFunction();

		dataFiltered?.forEach((item) => {
			const status: string = item.status;

			if (status in tasksByStatus) {
				tasksByStatus[status].push(item);
			} else {
				tasksByStatus[status] = [item];
			}
		});

		return tasksByStatus;
	}

	const totalItens = dynamicFilterFunction().length;

	return (
		<div className="flex flex-col justify-around row-start-1 row-end-2 col-start-1 col-end-2 bg-white dark:bg-[#1e293b] p-4">
			<h1 className="text-center text-xl font-semibold">Contador Geral</h1>
			<div className="flex items-center w-full">
				<div
					style={{
						width: formatNumbertoPercent(
							statusTasks[Status.NOT_INICIATE]?.length / totalItens,
							2,
						),
					}}
					className="transition-all duration-100 bg-gray-500 h-10"
				/>
				<div
					style={{
						width: formatNumbertoPercent(
							statusTasks[Status.TO_DO]?.length / totalItens,
							2,
						),
					}}
					className="transition-all duration-100 bg-blue-500 h-10 w-full"
				/>
				<div
					style={{
						width: formatNumbertoPercent(
							statusTasks[Status.WORKING]?.length / totalItens,
							2,
						),
					}}
					className="transition-all duration-100 bg-yellow-500 h-10 w-full"
				/>
				<div
					style={{
						width: formatNumbertoPercent(
							statusTasks[Status.CLOSED]?.length / totalItens,
							2,
						),
					}}
					className="transition-all duration-100 bg-green-600 h-10 w-full"
				/>
			</div>
			<div className="flex justify-around ">
				<div className="text-center">
					<p className="text-xl">
						{formatNumbertoPercent(
							statusTasks[Status.NOT_INICIATE]?.length / totalItens,
							2,
						)}
					</p>
					<span className="text-gray-500 font-semibold">Não iniciado</span>
				</div>
				<div className="text-center">
					<p className="text-xl">
						{formatNumbertoPercent(
							statusTasks[Status.TO_DO]?.length / totalItens,
							2,
						)}
					</p>
					<span className="text-blue-500 font-semibold">Fazer</span>
				</div>
				<div className="text-center">
					<p className="text-xl">
						{formatNumbertoPercent(
							statusTasks[Status.WORKING]?.length / totalItens,
							2,
						)}
					</p>
					<span className="text-yellow-500 font-semibold">Em andamento</span>
				</div>
				<div className="text-center">
					<p className="text-xl">
						{formatNumbertoPercent(
							statusTasks[Status.CLOSED]?.length / totalItens,
							2,
						)}
					</p>
					<span className="text-green-600 font-semibold">Concluídas</span>
				</div>
			</div>
		</div>
	);
}
