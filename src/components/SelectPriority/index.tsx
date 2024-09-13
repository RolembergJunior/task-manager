"use client";

import { useAtom } from "jotai";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { filtersAtom } from "@/app/Atoms";
import { useFetch } from "@/hooks/useFetch";
import type { tasksProps } from "@/app/types/Types";

export default function SelectPrority() {
	const { data } = useFetch({ url: "http://localhost:3000/tarefas" });
	const [filters, setFilters] = useAtom(filtersAtom);

	if (!data?.length) return;

	const priorityTasks = data.map((item: tasksProps) => item.priority);

	const arrayWhitoutDuplicates: string[] = priorityTasks?.filter(
		(item: string, index: number) =>
			priorityTasks.indexOf(item) === index && item !== undefined,
	);

	return (
		<Select
			onValueChange={(value) => setFilters({ ...filters, priority: value })}
		>
			<SelectTrigger>
				<SelectValue placeholder="Prioridade" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="Todos">Todos</SelectItem>
				{arrayWhitoutDuplicates?.map((priority, index) => (
					<SelectItem key={index} value={priority.toString()}>
						{priority}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
