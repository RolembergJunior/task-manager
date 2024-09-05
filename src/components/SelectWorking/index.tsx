'use client'

import { useMemo } from "react";
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
import { getValueWorkingByDateTask } from "@/utils/getValueWorkingByDateTask";
import { Working } from "@/app/types/Types";

export default function SelectWorking(){
    const [ filters, setFilters ] = useAtom(filtersAtom);
    const { data } = useFetch('http://localhost:3000/tarefas');
    const dateEndValues = data?.map( item =>  getValueWorkingByDateTask(item.finalizationDate)!);
    const normalizedData = useMemo(removeDuplicatesUsingIndexOf, [dateEndValues] );

    if(!data?.length) return;

    
    function removeDuplicatesUsingIndexOf() {
        
        if(!dateEndValues?.length) return;
        
        const uniqueArr = [];
        
        for (let i = 0; i < dateEndValues.length; i++) {
          if (uniqueArr.indexOf(dateEndValues[i]) === -1) {
            uniqueArr.push(dateEndValues[i]);
          }
        }
        
        return uniqueArr;
      };

    function getLabelWorkingTask(valueTask:number | undefined){
        if(valueTask === 1 ){
            return Working.ON_TIME;
        } else if( valueTask === 0){
            return Working.LAST_DAY;
        } else if( valueTask === -1 ){
            return Working.LATE;
        }
    };

    return(
        <Select onValueChange={(value) => setFilters({...filters, working: value})}>
            <SelectTrigger>
                <SelectValue placeholder="Andamento" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Todos">
                    Todos
                </SelectItem>
                {normalizedData?.map( item => (
                        <SelectItem value={item?.toString()}>
                            {getLabelWorkingTask(item)}
                        </SelectItem>
                    )
                )}
            </SelectContent>
        </Select>
    );
}