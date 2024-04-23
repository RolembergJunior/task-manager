"use client"

import { useEffect, useState } from "react";
import { getTasks } from "../services/api"
import SideBar from "@/components/Sidebar";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { DataTable } from "./tasks/data-table";
import { columns } from "./tasks/columns";
import AddTaskModal from "@/components/AddTaskModal";
import { tasksProps } from "./types/Types";

export default function Home() {
  const [tasks, setTasks] = useState<tasksProps[]>([]);

  useEffect(() => {
    try {
      getTasks().then( data => {
        setTasks(data);
      });
    } catch (error) {
      console.log('Erro ao fazer a requisição')
    }
  },[]);

  if(tasks.length > 0)
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
