"use client"

import { useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { mutate } from "swr";
import { tasksProps } from "./types/Types";
import { DataTable } from "./tasks/data-table";
import { columns } from "./tasks/columns";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import SideBar from "@/components/Sidebar";
import AddTaskModal from "@/components/AddTaskModal";
import Loading from "@/components/Loading";

export default function Home() {
  const { data, error, isLoading } = useFetch('http://localhost:3000/tarefas');
  const [ allData, setAllData ] = useState<tasksProps[]>([]);
  const [ search, setSearch ] = useState('');
  const [ isFiltering, setIsFiltering ] = useState(false);

  useEffect(() => {
    if(data != undefined){
      setAllData(data);
    }

    mutate( 'http://localhost:3000/tarefas' );

  },[data, allData])

  function getNewDataAndSave(newData:tasksProps){   
    setAllData([...allData, newData]);
  }

  const normalizeToLowerCase = search.toLowerCase();

  const filteredTasks = allData.filter( dataTaskName => dataTaskName.name.toLowerCase().includes( normalizeToLowerCase ) );

  if(isLoading) return <Loading/>
  if(!isLoading && !error)
    return (
      <div className="flex bg-[#F5F6FA]">
        <SideBar/>
          <div className="w-[90%]">
          <div className="flex items-center justify-between bg-white border border-black/10 w-full h-20 p-4">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold">Todas as Tarefas</h1>
              <div className="relative flex items-center">
                <CiSearch className="absolute focus:hidden m-2" />
                <Input 
                  type="text" 
                  className="h-8 focus:border-0 overflow-hidden" 
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <AddTaskModal getNewDataAndSave={getNewDataAndSave}/>
            </div>
          </div>
          <DataTable columns={columns} data={filteredTasks} />
        </div>
      </div>
  );
}
