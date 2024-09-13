"use client";

import { useAtom } from "jotai";
import { filtersAtom } from "@/app/Atoms";
import type { tasksProps } from "@/app/types/Types";
import { getValueWorkingByDateTask } from "./getValueWorkingByDateTask";
import { format } from "date-fns";
import { formatDateToUs } from "./formatDateToUS";
import { ptBR } from "date-fns/locale";

const [filters] = useAtom(filtersAtom);

export function search(task: tasksProps) {
	const scearchTerm = filters.search?.toLowerCase();

	!scearchTerm || task.name.toLowerCase().includes(scearchTerm);
}

export function priority(task: tasksProps) {
	filters.priority === "Todos" || task.priority === filters.priority;
}

export function status(task: tasksProps) {
	filters.status === "Todos" || task.status === filters.status;
}

export function working(task: tasksProps) {
	filters.working === "Todos" ||
		getValueWorkingByDateTask(task.finalizationDate)?.toString() ===
			filters.working;
}

export function competency(task: tasksProps) {
	const taskCompetency = format(
		new Date(formatDateToUs(task.creationDate)),
		"MMMM/yy",
		{ locale: ptBR },
	).toLowerCase();

	return !filters.competency || taskCompetency === filters.competency;
}

export function folder(task: tasksProps) {
	!filters.folder || task.folder === filters.folder;
}
