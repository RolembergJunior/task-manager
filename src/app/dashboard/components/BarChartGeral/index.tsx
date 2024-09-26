"use client";

import { useAtom } from "jotai";
import { useMemo } from "react";
import { useFetch } from "@/hooks/useFetch";
import { useFilterTask } from "@/utils/dynamicFilterFunction";
import { filtersAtom } from "@/app/Atoms";
import { formatDateToUs } from "@/utils/formatDateToUS";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import type { tasksProps } from "@/app/types/Types";

type taskPerMonth = {
	[month: string]: number;
};

export default function BarChartGeral() {
	const [filters] = useAtom(filtersAtom);
	const { data } = useFetch({ url: "http://localhost:3000/tarefas" });
	const { search, priority, status, working, competency, folder } =
		useFilterTask();

	const dataChart = useMemo(separeMonthsInArrays, [data, filters]);

	if (!data?.length) return;

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

	function separeMonthsInArrays() {
		const monthsTasks: taskPerMonth = {};
		const dataFiltered = dynamicFilterFunction();

		dataFiltered?.forEach((item) => {
			const normalizedDate = format(
				new Date(formatDateToUs(item.creationDate)),
				"MMMM/yy",
				{ locale: ptBR },
			);

			if (normalizedDate in monthsTasks) {
				monthsTasks[normalizedDate]++;
			} else {
				monthsTasks[normalizedDate] = 1;
			}
		});

		return Object.entries(monthsTasks).map(([name, value]) => ({
			name,
			value,
		}));
	}

	return (
		<div className="bg-white dark:bg-[#1e293b] row-start-1 row-end-4 col-start-2 col-end-4 p-5">
			<h1 className="text-xl text-center font-semibold">Quadro Geral</h1>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					width={500}
					height={400}
					data={dataChart}
					margin={{
						top: 20,
						right: 20,
						bottom: 20,
						left: 20,
					}}
				>
					<CartesianGrid stroke="#ffffff00" />
					<XAxis type="category" dataKey="name" />
					<YAxis type="number" />
					<Tooltip />
					<Legend />
					<Bar dataKey="value" fill="#2449ee" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
