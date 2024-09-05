'use client'

import { useAtom } from "jotai";
import { filtersAtom } from "@/app/Atoms";
import { useFetch } from "@/hooks/useFetch";
import { formatDateToUs } from "@/utils/formatDateToUS";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Legend, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis } from "recharts";
import { getValueWorkingByDateTask } from "@/utils/getValueWorkingByDateTask";
import { useMemo } from "react";

type taskPerMonth = {
  [month: string]: number;
};

export default function BarChartGeral(){
  const { data } = useFetch('http://localhost:3000/tarefas');
  const [ filters ] = useAtom(filtersAtom);
  const dataChart = useMemo( separeMonthsInArrays, [data, filters] );

  if(!data?.length) return;

  function filteredArray() { 

    if(!data?.length) return;

    const normalizeToLowerCase = filters.search.toLowerCase();
    const sensitiveDataBySearch = data.filter( task => task.name?.toLowerCase().includes( normalizeToLowerCase ) );
    const sensitiveDataByPriority = filters.priority != 'Todos' ? sensitiveDataBySearch.filter( taskFiltered => taskFiltered.priority === filters.priority ) : sensitiveDataBySearch;
    const sensitiveDataByStatus = filters.status != 'Todos' ? sensitiveDataByPriority.filter( taskFiltered => taskFiltered.status === filters.status ) : sensitiveDataByPriority;
    const sensitiveDataWorking = filters.working != 'Todos' ? sensitiveDataByStatus.filter( taskFiltered => getValueWorkingByDateTask(taskFiltered.finalizationDate)?.toString() === filters.working ) : sensitiveDataByStatus;
    const sensitiveDataCompetency = filters.competency != null ? sensitiveDataWorking.filter( taskFiltered => format(new Date(formatDateToUs( taskFiltered.creationDate )), 'MMMM/yy', {locale: ptBR}).toLowerCase() === filters.competency ) : sensitiveDataWorking;
    const sensitiveDataByFolders = filters.folder != null ? sensitiveDataWorking.filter( taskFiltered => taskFiltered.folder === filters.folder ) : sensitiveDataCompetency;

    return [...sensitiveDataByFolders];
  }

function separeMonthsInArrays(){
    const monthsTasks: taskPerMonth = {};

    filteredArray()?.forEach( item => {
      const normalizedDate = format(new Date(formatDateToUs( item.creationDate ) ), 'MMMM/yy', {locale: ptBR});

        if( normalizedDate in monthsTasks ) {
          monthsTasks[normalizedDate]++;
        } else {
          monthsTasks[normalizedDate] = 1
        }
    });
    
    const normalizedDataChart = Object.entries( monthsTasks ).map( ([ name, value ]) => ({ name, value })  );

    return normalizedDataChart;
};

// MELHORIA PRO PRÓXIMO DESAFIO
//   function createArrayTaskPerMonth(){

//     transformToArray.map( item => {
//       return item.value.reduce( ( array, task ) => {

//         const normalizedDate = format(new Date(formatDateToUs( task.creationDate ) ), 'MMMM/yy');
//         const existMonthInArray = array.find( month => month.name === normalizedDate );

//         if( !existMonthInArray ){
//           array.push({
//             name: normalizedDate,
//             value: 1
//           })
//         } else{
//           array[normalizedDate].value = +1
//         }

//           console.log( array )

//         return array

//       },[]);
//     } )
// };

// const result = createArrayTaskPerMonth();

  return(
    <div className="dark:bg-[#1e293b] row-start-1 row-end-4 col-start-2 col-end-4 p-5">
      <h1 className="text-xl text-center font-semibold">
        Quadro Geral
      </h1>
      <ResponsiveContainer 
          width="100%" 
          height="100%"
      >
          <BarChart
              width={500}
              height={400}
              data={dataChart}
              margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
              }}
          >
              <CartesianGrid stroke="#ffffff00" />
              <XAxis type="category" dataKey="name" />
              <YAxis type="number"  />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#2449ee" />
          </BarChart>
      </ResponsiveContainer>
    </div>
  );
}