"use client";

import { useAtom } from "jotai";
import type { tasksProps } from "@/app/types/Types";
import { filtersAtom } from "@/app/atoms/Atoms";
import { getValueWorkingByDateTask } from "./getValueWorkingByDateTask";
import { format } from "date-fns";
import { formatDateToUs } from "./formatDateToUS";
import { ptBR } from "date-fns/locale";

export function useFilterTask() {
	const [filters] = useAtom(filtersAtom);

	function search(task: tasksProps) {
		const scearchTerm = filters.search?.toLowerCase();

		return !scearchTerm || task.name.toLowerCase().includes(scearchTerm);
	}

	function priority(task: tasksProps) {
		return filters.priority === "Todos" || task.priority === filters.priority;
	}

	function status(task: tasksProps) {
		return filters.status === "Todos" || task.status === filters.status;
	}

	function working(task: tasksProps) {
		return (
			filters.working === "Todos" ||
			getValueWorkingByDateTask(task.finalizationDate)?.toString() ===
				filters.working
		);
	}

	function competency(task: tasksProps) {
		const taskCompetency = format(
			new Date(formatDateToUs(task.creationDate)),
			"MMMM/yy",
			{ locale: ptBR },
		).toLowerCase();

		return !filters.competency || taskCompetency === filters.competency;
	}

	function folder(task: tasksProps) {
		return !filters.folder || task.folder === filters.folder;
	}

	return {
		search,
		priority,
		status,
		working,
		competency,
		folder,
	};
}
