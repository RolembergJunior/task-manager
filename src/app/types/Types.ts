

export interface tasksProps{
    // id: number | string | null,
    name: string,
    description: string | null,
    responsible: string | null, 
    creationDate: string | null,
    finalizationDate: string | null,
    category:string | null,
    status: string,
    folder: string | null
}