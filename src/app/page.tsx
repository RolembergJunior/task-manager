"use client"

import SideBar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { DataTable } from "./tasks/data-table";
import { columns } from "./tasks/columns";
import AddTaskModal from "@/components/AddTaskModal";


interface tasksProps{
  id: number,
  name: string,
  responsible: number, 
  creationDate: string,
  finalizationDate: string,
  category:string,
  status: string
}

export default function Home() {
  const [tasks, setTasks] = useState<tasksProps[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/tarefas')
    .then( response => response.json() )
    .then( data => setTasks(data) )
  },[])

  return (
      <div className="flex">
        <SideBar/>
          <div className="w-full">
          <div className="fxed flex items-center justify-between border border-black/10 w-full h-20 p-4">
            <h1 className="text-xl font-semibold">Todas as Tarefas</h1>
            <div className="flex gap-3">
              <div className="flex items-center gap-2 p-2 hover:cursor-pointer hover:bg-gray-400 rounded-xl transition-all">
                <HiMagnifyingGlass />
                <span>Search</span>
              </div>
              <AddTaskModal/>
            </div>
          </div>
          <DataTable columns={columns} data={tasks} />
        </div>
      </div>
  );
}
