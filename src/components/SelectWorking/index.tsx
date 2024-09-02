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
import { getValueWorkingTask } from "@/utils/getValueworkingTask";

export default function SelectWorking(){
    const { data } = useFetch('http://localhost:3000/tarefas');
    const [ filters, setFilters ] = useAtom(filtersAtom);

    if(!data) return;

    const dateEndValues = data?.map( item =>  getValueWorkingTask(item.finalizationDate)!);
    
    function removeDuplicatesUsingIndexOf() {
        const uniqueArr = [];
        
        for (let i = 0; i < dateEndValues.length; i++) {
          if (uniqueArr.indexOf(dateEndValues[i]) === -1) {
            uniqueArr.push(dateEndValues[i]);
          }
        }
        
        return uniqueArr;
      }
      
      const result = removeDuplicatesUsingIndexOf();

    function getLabelWorkingTask(valueTask:number | undefined){
        if(valueTask === 1 ){
            return 'No prazo';
        } else if( valueTask === 0){
            return 'Último dia';
        } else if( valueTask === -1 ){
            return 'Atrasada';
        }
    }

    return(
        <Select onValueChange={(value) => setFilters({...filters, working: value})}>
            <SelectTrigger>
                <SelectValue placeholder="Andamento" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Todos">
                    Todos
                </SelectItem>
                {result?.map( item => (
                        <SelectItem value={item.toString()}>
                            {getLabelWorkingTask(item)}
                        </SelectItem>
                    )
                )}
            </SelectContent>
        </Select>
    );
}