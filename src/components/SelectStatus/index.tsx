"use client";

import { useAtom } from "jotai";
import { useFetch } from "@/hooks/useFetch";
import type { tasksProps } from "@/app/types/Types";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { filtersAtom } from "@/app/atoms/Atoms";

export default function SelectStatus() {
	const { data } = useFetch({ url: "http://localhost:3000/tarefas" });
	const [filters, setFilters] = useAtom(filtersAtom);

	if (!data?.length) return;

	const statusTasks: string[] = data?.map((item: tasksProps) => item.status);

	const arrayWhitoutDuplicates: string[] = statusTasks?.filter(
		(item, index) => statusTasks.indexOf(item) === index && item !== undefined,
	);

	return (
		<Select
			onValueChange={(value) => setFilters({ ...filters, status: value })}
		>
			<SelectTrigger>
				<SelectValue placeholder="Status" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="Todos">Todos</SelectItem>
				{arrayWhitoutDuplicates?.map((status, index) => (
					<SelectItem key={`${index}-${status}`} value={status}>
						{status}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
