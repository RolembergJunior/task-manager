export enum EndpointsApi {
	BASE_URL = "/tarefas",
	FOLDER = "/pastas",
}

export interface CheckListProps {
	name: string;
	isCheck: boolean;
}

export interface tasksProps {
	// id: number | string | null,
	name: string;
	description: ValueProps[];
	responsible: string | null;
	creationDate: string;
	finalizationDate: string;
	priority: string | number;
	status: string;
	folder: string | null;
	checklist: CheckListProps[];
}

export interface ValueProps {
	type: string;
	children: { text: string; [x: string]: string }[];
}

export interface FolderProps {
	id: string;
	name: string;
}

export enum Status {
	NOT_INICIATE = "Não iniciado",
	TO_DO = "Fazer",
	WORKING = "Em andamento",
	CLOSED = "Concluída",
}

export enum Prioritys {
	LOW_PRIORITY = "BAIXA PRIORIDADE",
	MEDIUM_PRIORITY = "MÉDIA PRIORIDADE",
	HIGH_PRORITY = "ALTA PRIORIDADE",
}

export enum Working {
	ON_TIME = "No prazo",
	LAST_DAY = "Último dia",
	LATE = "Atrasada",
}

export interface FiltersProps {
	search: string;
	priority: string | null;
	status: string | null;
	working: number | string;
	folder: string | null;
	competency: string | null;
}

export interface ModalProps<T>{
	[x: string]:{
		isOpen: boolean,
		text: string | null
		params?: T
	}
}


export enum Modals {
	LOADING = "modalLoading",
	MODAL_TASK = "ModalTask"
}
