'use client'

import { tasksProps } from "@/app/types/Types";
import { useFetch } from "@/hooks/useFetch";
import { extractMonthFromDate } from "@/utils/extractMonthFromDate";
import { formatDateToUs } from "@/utils/formatDateToUS";
import { format } from "date-fns";
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Legend, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis } from "recharts";

export default function BarChartGeral(){
  const { data } = useFetch('http://localhost:3000/tarefas');

  if(!data) return;

  type taskPerMonth = {
    [month: string]: number;
};

function separeMonthsInArrays(){
    const monthsTasks: taskPerMonth = {};

    data?.forEach( item => {
      const normalizedDate = format(new Date(formatDateToUs( item.creationDate ) ), 'MMMM/yy');

        if( normalizedDate in monthsTasks ) {
          monthsTasks[normalizedDate]++;
        } else {
          monthsTasks[normalizedDate] = 1
        }
    });

    return monthsTasks;
}

const monthsTasks = separeMonthsInArrays();

const normalizedDataChart = Object.entries( monthsTasks ).map( ([ name, value ]) => ({ name, value })  );


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
              data={normalizedDataChart}
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