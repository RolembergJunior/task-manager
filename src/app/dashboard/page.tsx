'use client'

import SideBar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import CountTaskStatus from "./components/CountTaskStatus";
import PercentLateTaskDash from "./components/PercentLateTasks";

export default function Dashboard(){
    return(
        <section>
            <div className="flex">
                <SideBar/>
                <div className="flex flex-col w-[85%]">
                    <div className="flex justify-between items-center dark:bg-[#1e293b] border-b w-full h-[81px] p-5 ">
                        <h1 className="text-2xl font-semibold">Dashboard</h1>
                        <Button className="text-black p-2">
                            Editar layout
                        </Button>
                    </div>
                    <div className="grid grid-rows-3 grid-cols-3 w-full h-full p-5">
                        <CountTaskStatus/>
                        <PercentLateTaskDash/>
                    </div>
                </div>
            </div>
        </section>
    );
}