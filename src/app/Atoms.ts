import { atom } from "jotai";
import { atomWithStorage } from 'jotai/utils'
import { tasksProps } from "./types/Types";

interface TaskState {
    task: tasksProps[],
    loading: boolean,
    error:any
}

interface FiltersProps{
    search: string,
    priority: string | null,
    status: string | null,
    working: number | string,
    folder: string | null,
    competency: string | null
}

export const taskAtom = atom<TaskState>({ 
    task: [],
    loading: true,
    error: null
});

export const filtersAtom = atom<FiltersProps>({
    search: '',
    priority: 'Todos',
    status: 'Todos',
    working: 'Todos',
    folder: null,
    competency: null
  });

export const darkModeAtom = atomWithStorage( 'dark', false )