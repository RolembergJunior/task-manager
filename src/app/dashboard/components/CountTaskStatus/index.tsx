'use client'

import { tasksProps } from "@/app/types/Types";
import { useFetch } from "@/hooks/useFetch";
import { formatNumbertoPercent } from "@/utils/formatNumbertoPercent";

export default function CountTaskStatus(){
    const { data } = useFetch('http://localhost:3000/tarefas');

    if(!data) return; 

    let totalItens = data.length;

    type StatusETarefas = {
        [status: string]: tasksProps[];
    };

    function separeStatusInArrays(){
        const statusTarefas: StatusETarefas = {};

        data?.forEach( item => {
            const status:string = item.status;

            if( status in statusTarefas ) {
                statusTarefas[status].push(item);
            } else {
                statusTarefas[status] = [item]
            }
        });

        return statusTarefas;
    }

    const statusTasks = separeStatusInArrays();

    return(
        <div className="flex flex-col justify-around row-start-1 row-end-2 col-start-1 col-end-2 bg-white dark:bg-[#1e293b] p-4">
            <h1 className="text-center text-xl font-semibold">Contador Geral</h1>
            <div className="flex items-center w-full">
                <div 
                    style={{
                        width: formatNumbertoPercent(((statusTasks['Não iniciado']?.length ? statusTasks['Não iniciado']?.length : 0) / totalItens), 2)
                    }}    
                    className="bg-gray-500 h-10" 
                />
                <div 
                    style={{
                        width: formatNumbertoPercent(((statusTasks['Fazer']?.length ? statusTasks['Fazer']?.length : 0) / totalItens), 2)
                    }}   
                    className="bg-blue-500 h-10 w-full" 
                />
                <div 
                    style={{
                        width: formatNumbertoPercent(((statusTasks['Em andamento']?.length ? statusTasks['Em andamento']?.length : 0) / totalItens), 2)
                    }}   
                    className="bg-yellow-500 h-10 w-full" 
                />
                <div 
                    style={{
                        width: formatNumbertoPercent(((statusTasks['Concluída']?.length ? statusTasks['Concluída']?.length : 0) / totalItens), 2)
                    }}   
                    className="bg-green-600 h-10 w-full" 
                />
            </div>
            <div className="flex justify-around ">
                <div className="text-center">
                    <p className="text-xl">{formatNumbertoPercent(((statusTasks['Não iniciado']?.length ? statusTasks['Não iniciado']?.length : 0) / totalItens), 2)}</p>
                    <span className="text-gray-500 font-semibold">Não iniciado</span>
                </div>
                <div className="text-center">
                    <p className="text-xl">{formatNumbertoPercent(((statusTasks['Fazer']?.length ? statusTasks['Fazer']?.length : 0) / totalItens), 2)}</p>
                    <span className="text-blue-500 font-semibold">Fazer</span>
                </div>
                <div className="text-center">
                    <p className="text-xl">{formatNumbertoPercent(((statusTasks['Em andamento']?.length ? statusTasks['Em andamento']?.length : 0) / totalItens), 2)}</p>
                    <span className="text-yellow-500 font-semibold">Em andamento</span>
                </div>
                <div className="text-center">
                    <p className="text-xl">{formatNumbertoPercent(((statusTasks['Concluída']?.length ? statusTasks['Concluída']?.length : 0) / totalItens), 2)}</p>
                    <span className="text-green-600 font-semibold">Concluídas</span>
                </div>
            </div>
        </div>
    );
}