
export interface CheckListProps{
    name:string,
    isCheck: boolean
}

export interface tasksProps{
    // id: number | string | null,
    name: string,
    description: string ,
    responsible: string | null, 
    creationDate: string | null,
    finalizationDate: string ,
    priority: string | number,
    status: string,
    folder: string | null,
    checklist: CheckListProps[]
}