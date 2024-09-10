'use client'

import { 
    useAtom 
} from "jotai";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "../ui/select";
import { 
    filtersAtom 
} from "@/app/Atoms";
import { extractMonthFromDate } from "@/utils/extractMonthFromDate";
import { useFetch } from "@/hooks/useFetch";
import Loading from "../Loading";

export default function SelectCompetency(){
    const { data, isLoading, error } = useFetch({ url:'http://localhost:3000/tarefas' });
    const [ filters, setFilters ] = useAtom(filtersAtom);

    if(!data?.map( item => item.creationDate )){
        return;
    }
    const creationDates:string[] = data?.map( item => item.creationDate );
    
    const monthsTasks = extractMonthFromDate(creationDates);

    const arrayWhitoutDuplicates = monthsTasks?.filter( (item, index) => monthsTasks.indexOf(item) === index && item != undefined ) ;

    if(isLoading || error ) return <Loading/>
    if(!isLoading || !error) 
    return(
        <Select onValueChange={(value) => setFilters({...filters, competency: value})}>
            <SelectTrigger>
                <SelectValue placeholder="Competência" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={null}>
                    Todos
                </SelectItem>
                {arrayWhitoutDuplicates?.map( (date, index) => (
                    <SelectItem key={index} value={date?.toString().toLowerCase()}>
                        {date?.toString().toUpperCase()}
                    </SelectItem>
                ) )}
            </SelectContent>
        </Select>
    );
}