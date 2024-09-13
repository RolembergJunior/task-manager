'use client'

import { filtersAtom } from "@/app/Atoms";
import { tasksProps, Working } from "@/app/types/Types";
import { useFetch } from "@/hooks/useFetch";
import { formatDateToUs } from "@/utils/formatDateToUS";
import { formatNumbertoPercent } from "@/utils/formatNumbertoPercent";
import { getColorbyLabelWorkingTask } from "@/utils/getColorWorkingByLabel";
import { getValueWorkingByDateTask } from "@/utils/getValueWorkingByDateTask";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAtom } from "jotai";
import { useMemo } from "react";
import { PieChart, Pie, Cell } from "recharts";


type workingTaskProps = {
    name: string,
    value: number,
    color: string | undefined
};

type WorkingType = {
    [working: string]: number,
};

export default function PercentLateTaskDash(){
    const [ filters ] = useAtom(filtersAtom); 
    const { data } = useFetch({ url:'http://localhost:3000/tarefas' });
    const workingTask:workingTaskProps[]  = useMemo(separeWorkingTaskInArray, [data,filters]);
    
    if( !data?.length ) return;

    function dynamicFilterFunction():tasksProps[] {
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

 
    function getLabelByValueWorkingTask(value:number):string{
        if(value === -1 ){
            return Working.LATE
        } else if( value === 0 ){
            return Working.LAST_DAY 
        } else if( value === 1 ){
            return Working.ON_TIME
        } else {
            return 'SEM STATUS'
        }

    };

    function getValueByLabelWorkingTask(labelWorking:string):number | undefined{

        if(labelWorking === Working.LATE ){
            return -1
        } else if( labelWorking === Working.LAST_DAY ){
            return 0
        } else if( labelWorking === Working.ON_TIME ){
            return 1
        }
    };

    function separeWorkingTaskInArray(){
        const workingTasks: WorkingType = {};

        dynamicFilterFunction()?.forEach( item => {
            const valueWorking:number = getValueWorkingByDateTask(item.finalizationDate);
            const labelWorking = getLabelByValueWorkingTask(valueWorking!);
            
            if( labelWorking in workingTasks ) {
                workingTasks[labelWorking]++;
            } else {
                workingTasks[labelWorking] = 1;
            }
        });

        const normalizedWorkingTask = Object.entries(workingTasks).map( ([name, value]) => ({name, value, color: getColorbyLabelWorkingTask(name), seq: getValueByLabelWorkingTask(name)}) );

        return normalizedWorkingTask.sort( (a, b) => a.seq! - b.seq! );
    };

    function sumLastdayAndOnTimevalues(array:workingTaskProps[]):number{
        const targetNames = [Working.ON_TIME, Working.LAST_DAY];

        return array.reduce(( accumulator, currentValues ) => {

            if (targetNames.find( nameTarget => nameTarget === currentValues.name)) {
              return accumulator + currentValues.value;
            }

            return accumulator;
        },0);
    };
    
    const RADIAN = Math.PI / 180;
    const cx =  140;
    const cy = 150;
    const iR = 50;
    const oR = 100;
    const value = sumLastdayAndOnTimevalues(workingTask);
    let total = 0;

    const needle = ( value:number, data:WorkingType[], cx:number, cy:number, iR:number, oR:number, color:string ) => {

        data.forEach( ( dataItem ) => {
            total += dataItem.value
        });

        const angle = 180.0 * ( 1 - value / total );
        const length = ( iR + 2 * oR ) - 150;
        const sin = Math.sin( -RADIAN * angle ) ;
        const cos = Math.cos( -RADIAN * angle );
        const r = 5;
        const x0 = cx + 5;
        const y0 = cy + 5;
        const xba = x0 + r * sin;
        const yba = y0 - r * cos;
        const xbb = x0 - r * sin;
        const ybb = y0 + r * cos;
        const xp = x0 + length * cos;
        const yp = y0 + length * sin;

        return [
            <circle cx={x0} cy={y0} r={r} fill={color} stroke="none"></circle>,
            <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
        ];
    };

    return(
        <div className="relative bg-white dark:bg-[#1e293b] row-start-2 row-end-4 col-start-1 col-end-2 h-full w-full p-5">
            <h1 className="text-xl text-center font-semibold">Índice de efetividade</h1>
            <PieChart 
                className="mx-auto mt-10"
                width={300} 
                height={250}>
                <Pie 
                    className="w-[300px] h-[200px]"
                    dataKey='value'
                    startAngle={180}
                    endAngle={0}
                    data={workingTask}
                    cx={cx}
                    cy={cy}
                    innerRadius={iR}
                    outerRadius={oR}
                    fill="#8884d8"
                    stroke="none"
                >
                    { workingTask.map(( entry, index ) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                { needle( value, workingTask, cx, cy, iR, oR, '#d0d000' ) }
            </PieChart>
            <h3 className="absolute top-[50%] right-[250px] text-black dark:text-red-600 font-medium">
                {formatNumbertoPercent((value/total),2)}
            </h3>
            <div className="flex flex-col items-center justify-center space-y-1">
                <h2 className="text-black dark:text-white font-semibold">
                    PERÍODO ANALISADO: {filters.competency?.toUpperCase() ? filters.competency?.toUpperCase() : 'Todos'}
                </h2>
            </div>
        </div>
    );
}