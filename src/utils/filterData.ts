import { filtersAtom } from "@/app/Atoms";
import { tasksProps } from "@/app/types/Types";
import { useAtom } from "jotai";
import { getValueWorkingTask } from "./getValueworkingTask";


export function filterData(data:tasksProps[]){
    const [ filters ] = useAtom(filtersAtom);

    const normalizeToLowerCase = filters.search.toLowerCase();
    const sensitiveDataBySearch = data.filter( task => task.name?.toLowerCase().includes( normalizeToLowerCase ) );
    const sensitiveDataByPriority = filters.priority != 'Todos' ? sensitiveDataBySearch.filter( taskFiltered => taskFiltered.priority === filters.priority ) : sensitiveDataBySearch;
    const sensitiveDataByStatus = filters.status != 'Todos' ? sensitiveDataByPriority.filter( taskFiltered => taskFiltered.status === filters.status ) : sensitiveDataByPriority;
    const sensitiveDataWorking = filters.working != 'Todos' ? sensitiveDataByStatus.filter( taskFiltered => getValueWorkingTask(taskFiltered.finalizationDate)?.toString() === filters.working ) : sensitiveDataByStatus;
    const sensitiveDataByFolders = filters.folder != null ? sensitiveDataWorking.filter( taskFiltered => taskFiltered.folder === filters.folder ) : sensitiveDataWorking;


    const dataFiltered = [...sensitiveDataByFolders];

    return dataFiltered;
    
}