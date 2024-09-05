'use client'

import { useAtom } from "jotai";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "../ui/select";
import { filtersAtom } from "@/app/Atoms";
import { useFetch } from "@/hooks/useFetch";
import Loading from "../Loading";


export default function SelectPrority(){
    const { data } = useFetch('http://localhost:3000/tarefas');
    const [ filters, setFilters ] = useAtom(filtersAtom);

    if(!data?.length) return;

    const priorityTasks:( string | number )[] = data.map( item => item.priority );

    const arrayWhitoutDuplicates = priorityTasks?.filter( (item, index) => priorityTasks.indexOf(item) === index && item != undefined ) ;

    return(
        <Select onValueChange={(value) => setFilters({...filters, priority: value})}>
            <SelectTrigger>
                <SelectValue placeholder="Prioridade" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="Todos">
                    Todos
                </SelectItem>
                {arrayWhitoutDuplicates?.map((priority, index) => (
                    <SelectItem key={index} value={priority}>
                        {priority}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}