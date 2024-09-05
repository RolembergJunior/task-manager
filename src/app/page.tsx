"use client"

import { useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { useFetch } from "@/hooks/useFetch";
import { tasksProps } from "./types/Types";
import { DataTable } from "./tasks/data-table";
import { columns } from "./tasks/columns";
import { Input } from "@/components/ui/input";
import { CiCalendarDate, CiSearch } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import SideBar from "@/components/Sidebar";
import AddTaskModal from "@/components/AddTaskModal";
import Loading from "@/components/Loading";
import { mutate } from "swr";
import { useTheme } from "next-themes";
import { filtersAtom } from "./Atoms";
import AddNewFolder from "@/components/AddNewFolder";
import SelectWorking from "@/components/SelectWorking";
import { getValueWorkingByDateTask } from "@/utils/getValueWorkingByDateTask";
import SelectStatus from "@/components/SelectStatus";
import SelectPrority from "@/components/SelectPriority";


export default function Home() {
  const { data, error, isLoading } = useFetch('http://localhost:3000/tarefas');
  const [ allData, setAllData ] = useState<tasksProps[]>([]);
  const [ filters, setFilters ] = useAtom(filtersAtom);
  const sensitiveDataByFilters = useMemo(filteredArray, [allData, filters]);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if(data?.length){
      setAllData(data);
    }
    mutate( 'http://localhost:3000/tarefas' );
    
  },[data, allData]);
  
  function getNewDataAndSave(newData:tasksProps){   
    setAllData([...allData, newData]);
  } ;
  
  function filteredArray() { 

    const normalizeToLowerCase = filters.search.toLowerCase();
    const sensitiveDataBySearch = allData.filter( task => task.name?.toLowerCase().includes( normalizeToLowerCase ) );
    const sensitiveDataByPriority = filters.priority != 'Todos' ? sensitiveDataBySearch.filter( taskFiltered => taskFiltered.priority === filters.priority ) : sensitiveDataBySearch;
    const sensitiveDataByStatus = filters.status != 'Todos' ? sensitiveDataByPriority.filter( taskFiltered => taskFiltered.status === filters.status ) : sensitiveDataByPriority;
    const sensitiveDataWorking = filters.working != 'Todos' ? sensitiveDataByStatus.filter( taskFiltered => getValueWorkingByDateTask(taskFiltered.finalizationDate)?.toString() === filters.working ) : sensitiveDataByStatus;
    const sensitiveDataByFolders = filters.folder != null ? sensitiveDataWorking.filter( taskFiltered => taskFiltered.folder === filters.folder ) : sensitiveDataWorking;

    return [...sensitiveDataByFolders];
  };

  if( isLoading ) return <Loading/>;
  if(!isLoading && !error )
    return (
      <div className="flex bg-[#F5F6FA] dark:bg-black/20 transition-colors durantion-100">
        <SideBar/>
          <div className="w-[90%]">
          <div className="flex items-center justify-between bg-white dark:bg-[#1e293b] border border-black/10 w-full h-20 p-4">
            <div className="flex items-center gap-3">
              <h1 className="text-xl w-40 font-semibold">
                {filters.folder === null ? 'Todas as tarefas' : filters.folder.toString()}
              </h1>
              <div className="relative flex items-center">
                <CiSearch className="absolute focus:hidden m-2" />
                <Input 
                  type="text" 
                  className="h-8 focus:border-0 overflow-hidden" 
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex gap-3">
                <div>
                  <SelectPrority/>
                </div>
                <div>
                  <SelectStatus/>
                </div>
                <div>
                  <SelectWorking/>
                </div>
                <div>
                <Button variant="outline" >
                  <CiCalendarDate />
                </Button>
                </div>
              </div>
              <AddNewFolder/>
              <AddTaskModal getNewDataAndSave={getNewDataAndSave}/>
            </div>
          </div>
          <DataTable columns={columns} data={sensitiveDataByFilters} />
        </div>
      </div>
  );
}

