'use client'

import { useAtom } from "jotai";
import { filtersAtom } from "@/app/Atoms";
import { Status, type tasksProps } from "@/app/types/Types";
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

    const totalItens = data.length;

    function dynamicFilterFunction() {
		const scearchTerm = filters.search?.toLowerCase();

		const filterMap = {
			search: (task: tasksProps) =>
				!scearchTerm || task.name.toLowerCase().includes(scearchTerm),
			priority: (task: tasksProps) =>
				filters.priority === "Todos" || task.priority === filters.priority,
			status: (task: tasksProps) =>
				filters.status === "Todos" || task.status === filters.status,
			working: (task: tasksProps) =>
				filters.working === "Todos" ||
				getValueWorkingByDateTask(task.finalizationDate)?.toString() ===
					filters.working,
			competency: (task: tasksProps) => {
				const taskCompetency = format(
					new Date(formatDateToUs(task.creationDate)),
					"MMMM/yy",
					{ locale: ptBR },
				).toLowerCase();

				return !filters.competency || taskCompetency === filters.competency;
			},
			folder: (task: tasksProps) => !filters.folder || task.folder === filters.folder,
		};
    
		return data.filter((task: tasksProps) =>
			Object.values(filterMap).every((filterFunc) => filterFunc(task)),
		);
	}


    function separeStatusInArrays(){
        const statusArray: StatusProps = {};
        const dataFiltered = dynamicFilterFunction();

        dataFiltered?.forEach( item => {
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