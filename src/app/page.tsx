"use client"

import { useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import SideBar from "@/components/Sidebar";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { DataTable } from "./tasks/data-table";
import { columns } from "./tasks/columns";
import AddTaskModal from "@/components/AddTaskModal";
import Loading from "@/components/Loading";
import { tasksProps } from "./types/Types";

export default function Home() {
  const { data, error, isLoading } = useFetch('http://localhost:3000/tarefas');
  const [ allData, setAllData ] = useState<tasksProps[]>([]);

  useEffect(() => {
    if(data != undefined){
      setAllData(data);
    }
  },[data])

  function getNewDataAndSave(newData:tasksProps){   
      setAllData([...allData, newData]);
  }
  
  if(isLoading) return <Loading/>
  if(!isLoading && !error)
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
              <AddTaskModal getNewDataAndSave={getNewDataAndSave}/>
            </div>
          </div>
          <DataTable columns={columns} data={allData} />
        </div>
      </div>
  );
}
