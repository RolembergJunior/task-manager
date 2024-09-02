'use client'

import { useFetch } from "@/hooks/useFetch";
import SideBar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import CountTaskStatus from "./components/CountTaskStatus";
import PercentLateTaskDash from "./components/PercentLateTasks";
import BarChartGeral from "./components/BarChartGeral";
import SelectCompetency from "@/components/SelectCompetency";
import SelectStatus from "@/components/SelectStatus";
import SelectPriority from "@/components/SelectPriority";
import { useEffect } from "react";
import SelectWorking from "@/components/SelectWorking";

export default function Dashboard(){
    const { data } = useFetch('http://localhost:3000/tarefas');

    useEffect(() => {
        if(!data){
            return;
        }

    },[data]);

    return(
        <section>
            <div className="flex">
                <SideBar/>
                <div className="flex flex-col w-[85%]">
                    <div className="flex justify-between items-center dark:bg-[#1e293b] border-b w-full h-[81px] p-5 ">
                        <h1 className="text-2xl font-semibold">Dashboard</h1>
                        <div className="flex space-x-3 ite">
                            <SelectCompetency />
                            <SelectStatus/>
                            <SelectPriority/>
                            <SelectWorking/>
                        </div>
                        <Button className="text-black p-2">
                            Editar layout
                        </Button>
                    </div>
                    <section className="grid grid-rows-3 grid-cols-3 w-full h-[90vh] p-5 gap-2">
                        <CountTaskStatus data={data}/>
                        <PercentLateTaskDash/>
                        <BarChartGeral />
                    </section>
                </div>
            </div>
        </section>
    );
}