"use client"

import SideBar from "@/components/Sidebar";
import { ReactElement, useEffect, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { DataTable } from "./tasks/data-table";
import { columns } from "./tasks/columns";
import AddTaskModal from "@/components/AddTaskModal";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { DialogHeader } from "@/components/ui/dialog";


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

  type TaskModalComponent = React.ReactElement;

  function openTaskModal(id:number):TaskModalComponent{
    return(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  // if(tasks.length < 0) return <h1 className="text-black text-xl">Carregando...</h1>
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
