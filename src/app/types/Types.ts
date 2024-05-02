

export interface tasksProps{
    // id: number | string | null,
    name: string,
    description: string | null,
    responsible: string | null, 
    creationDate: string | null,
    finalizationDate: string,
    priority: string | number,
    status: string,
    folder: string | null
}