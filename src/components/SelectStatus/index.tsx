'use client'

import { useAtom } from "jotai";
import { useFetch } from "@/hooks/useFetch";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "../ui/select";
import { filtersAtom } from "@/app/Atoms";
import Loading from "../Loading";

export default function SelectStatus(){
    const { data, isLoading, error } = useFetch('http://localhost:3000/tarefas');
    const [ filters, setFilters ] = useAtom(filtersAtom);

    if(!data?.map( item => item.status )){
        return;
    }
    const statusTasks:string[] = data?.map( item => item.status );

    const arrayWhitoutDuplicates = statusTasks?.filter( (item, index) => statusTasks.indexOf(item) === index && item != undefined ) ;

    if(isLoading || error ) return <Loading/>
    if(!isLoading || !error) 
    return(
        <Select onValueChange={(value) => setFilters({...filters, status: value})}>
            <SelectTrigger>
                <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="Todos">
                    Todos
                </SelectItem>
                {arrayWhitoutDuplicates?.map((status, index) => (
                    <SelectItem key={index} value={status}>
                        {status}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}