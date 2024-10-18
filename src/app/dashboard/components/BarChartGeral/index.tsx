"use client";

import { useAtom } from "jotai";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { useFilterTask } from "@/utils/dynamicFilterFunction";
import { filtersAtom } from "@/app/atoms/Atoms";
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
import { Status, type tasksProps } from "@/app/types/Types";
import { useTheme } from "next-themes";

type tasksByMonthType = {
	[month: string]: tasksProps[];
};

type tasksByStatusType = {
	[month: string]: number;
};

interface DataChartProps {
	name: string;
	closed?: number;
	working?: number;
	toDo?: number;
	late?: number;
}

export default function BarChartGeral() {
	const [chartData, setChartData] = useState<DataChartProps[]>();
	const [filters] = useAtom(filtersAtom);
	const { data } = useFetch({ url: "http://localhost:3000/tarefas" });
	const { search, priority, status, working, competency, folder } =
		useFilterTask();
	const { theme } = useTheme();

	if (!data?.length) return;

	useEffect(() => {
		generateNormalizedChartData();
	}, [filters, data]);

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

	function generateNormalizedChartData() {
		const tasksByMonth: tasksByMonthType = {};
		const filteredTasks = dynamicFilterFunction();

		filteredTasks?.forEach((item) => {
			const normalizedDate = format(
				new Date(formatDateToUs(item.creationDate)),
				"MMMM/yy",
				{ locale: ptBR },
			);

			if (normalizedDate in tasksByMonth) {
				tasksByMonth[normalizedDate].push(item);
			} else {
				tasksByMonth[normalizedDate] = [item];
			}
		});

		const normalizedChartData = Object.entries(tasksByMonth).map(
			([name, value]) => ({
				name: name.toUpperCase(),
				...separeStatusInArrays(value),
			}),
		);

		setChartData(normalizedChartData);
	}

	function separeStatusInArrays(data: tasksProps[]): tasksByStatusType {
		const statusCount: tasksByStatusType = {};

		data?.forEach((item) => {
			const status: string = item.status;

			if (status in statusCount) {
				statusCount[status]++;
			} else {
				statusCount[status] = 1;
			}
		});

		return statusCount;
	}

	return (
		<div className="bg-white dark:bg-[#1e293b] row-start-1 row-end-4 col-start-2 col-end-4 p-5">
			<h1 className="text-xl text-center font-semibold">Quadro Geral</h1>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					width={500}
					height={400}
					data={chartData}
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
					<Tooltip
						labelStyle={{
							color: "#4f504f",
							fontWeight: "bolder",
						}}
						itemStyle={{
							fontWeight: "lighter",
						}}
						contentStyle={{
							background: "#ece6e6",
							borderRadius: "5px",
							border: "1px solid rgb(0,0,0,0.2)",
							padding: "1rem",
							width: "12rem"
						}}
					/>
					<Legend />
					<Bar dataKey={Status.NOT_INICIATE} fill="#6b7280" />
					<Bar dataKey={Status.TO_DO} fill="#2449ee" />
					<Bar dataKey={Status.WORKING} fill="#eab308" />
					<Bar dataKey={Status.CLOSED} fill="#16a34a" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
