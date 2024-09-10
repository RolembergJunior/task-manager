'use client'

import { useAtom } from "jotai";
import { filtersAtom } from "@/app/Atoms";
import { Status, tasksProps } from "@/app/types/Types";
import { useFetch } from "@/hooks/useFetch";
import { formatNumbertoPercent } from "@/utils/formatNumbertoPercent";
import { getValueWorkingByDateTask } from "@/utils/getValueWorkingByDateTask";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatDateToUs } from "@/utils/formatDateToUS";
import { useMemo } from "react";

type StatusProps = {
    [status: string]: tasksProps[];
};

export default function CountTaskStatus(){
    const { data } = useFetch({ url:'http://localhost:3000/tarefas' });
    const [ filters ] = useAtom(filtersAtom);
    const statusTasks = useMemo(separeStatusInArrays, [data, filters]);

    if(!data) return; 

    let totalItens = data.length;

    function filteredArray() { 

        if(!data) return;

        const normalizeToLowerCase = filters.search.toLowerCase();
        const sensitiveDataBySearch = data.filter( task => task.name?.toLowerCase().includes( normalizeToLowerCase ) );
        const sensitiveDataByPriority = filters.priority != 'Todos' ? sensitiveDataBySearch.filter( taskFiltered => taskFiltered.priority === filters.priority ) : sensitiveDataBySearch;
        const sensitiveDataByStatus = filters.status != 'Todos' ? sensitiveDataByPriority.filter( taskFiltered => taskFiltered.status === filters.status ) : sensitiveDataByPriority;
        const sensitiveDataWorking = filters.working != 'Todos' ? sensitiveDataByStatus.filter( taskFiltered => getValueWorkingByDateTask(taskFiltered.finalizationDate)?.toString() === filters.working ) : sensitiveDataByStatus;
        const sensitiveDataCompetency = filters.competency != null ? sensitiveDataWorking.filter( taskFiltered => format(new Date(formatDateToUs( taskFiltered.creationDate )), 'MMMM/yy',{ locale: ptBR }).toLowerCase() === filters.competency ) : sensitiveDataWorking;
        const sensitiveDataByFolders = filters.folder != null ? sensitiveDataWorking.filter( taskFiltered => taskFiltered.folder === filters.folder ) : sensitiveDataCompetency;
    
        return [...sensitiveDataByFolders];
    };


    function separeStatusInArrays(){
        const statusArray: StatusProps = {};

        filteredArray()?.forEach( item => {
            const status:string = item.status;

            if( status in statusArray ) {
                statusArray[status].push(item);
            } else {
                statusArray[status] = [item]
            }
        });

        return statusArray;
    };

    return(
        <div className="flex flex-col justify-around row-start-1 row-end-2 col-start-1 col-end-2 bg-white dark:bg-[#1e293b] p-4">
            <h1 className="text-center text-xl font-semibold">Contador Geral</h1>
            <div className="flex items-center w-full">
                <div 
                    style={{
                        width: formatNumbertoPercent(((statusTasks[Status.NOT_INICIATE]?.length ? statusTasks[Status.NOT_INICIATE]?.length : 0) / totalItens), 2)
                    }}    
                    className="transition-all duration-100 bg-gray-500 h-10" 
                />
                <div 
                    style={{
                        width: formatNumbertoPercent(((statusTasks[Status.TO_DO]?.length ? statusTasks[Status.TO_DO]?.length : 0) / totalItens), 2)
                    }}   
                    className="transition-all duration-100 bg-blue-500 h-10 w-full" 
                />
                <div 
                    style={{
                        width: formatNumbertoPercent(((statusTasks[Status.WORKING]?.length ? statusTasks[Status.WORKING]?.length : 0) / totalItens), 2)
                    }}   
                    className="transition-all duration-100 bg-yellow-500 h-10 w-full" 
                />
                <div 
                    style={{
                        width: formatNumbertoPercent(((statusTasks[Status.CLOSED]?.length ? statusTasks[Status.CLOSED]?.length : 0) / totalItens), 2)
                    }}   
                    className="transition-all duration-100 bg-green-600 h-10 w-full" 
                />
            </div>
            <div className="flex justify-around ">
                <div className="text-center">
                    <p className="text-xl">{formatNumbertoPercent(((statusTasks[Status.NOT_INICIATE]?.length ? statusTasks[Status.NOT_INICIATE]?.length : 0) / totalItens), 2)}</p>
                    <span className="text-gray-500 font-semibold">Não iniciado</span>
                </div>
                <div className="text-center">
                    <p className="text-xl">{formatNumbertoPercent(((statusTasks[Status.TO_DO]?.length ? statusTasks[Status.TO_DO]?.length : 0) / totalItens), 2)}</p>
                    <span className="text-blue-500 font-semibold">Fazer</span>
                </div>
                <div className="text-center">
                    <p className="text-xl">{formatNumbertoPercent(((statusTasks[Status.WORKING]?.length ? statusTasks[Status.WORKING]?.length : 0) / totalItens), 2)}</p>
                    <span className="text-yellow-500 font-semibold">Em andamento</span>
                </div>
                <div className="text-center">
                    <p className="text-xl">{formatNumbertoPercent(((statusTasks[Status.CLOSED]?.length ? statusTasks[Status.CLOSED]?.length : 0) / totalItens), 2)}</p>
                    <span className="text-green-600 font-semibold">Concluídas</span>
                </div>
            </div>
        </div>
    );
}