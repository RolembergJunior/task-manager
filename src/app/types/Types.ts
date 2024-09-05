
export enum EndpointsApi{
    BASE_URL = '/tarefas',
    FOLDER = '/pastas'
};

export interface CheckListProps{
    name:string,
    isCheck: boolean
};

export interface tasksProps{
    // id: number | string | null,
    name: string,
    description: string ,
    responsible: string | null, 
    creationDate: string ,
    finalizationDate: string ,
    priority: string | number,
    status: string,
    folder: string | null,
    checklist: CheckListProps[]
};

export interface FolderProps{
    id: string,
    name: string
};

export enum Status{
    NOT_INICIATE = 'Não iniciado',
    TO_DO = 'Fazer',
    WORKING = 'Em andamento',
    CLOSED = 'Concluída'
};

export enum Prioritys{
    LOW_PRIORITY = 'BAIXA PRIORIDADE',
    MEDIUM_PRIORITY = 'MÉDIA PRIORIDADE',
    HIGH_PRORITY = 'ALTA PRIORIDADE'
};

export enum Working{
    ON_TIME = 'No prazo',
    LAST_DAY = 'Último dia',
    LATE = 'Atrasada'
};

