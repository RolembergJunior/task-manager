"use client"

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { useFetch } from "@/hooks/useFetch";
import { tasksProps } from "./types/Types";
import { DataTable } from "./tasks/data-table";
import { columns } from "./tasks/columns";
import { Input } from "@/components/ui/input";
import { CiCalendarDate, CiSearch } from "react-icons/ci";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import SideBar from "@/components/Sidebar";
import AddTaskModal from "@/components/AddTaskModal";
import Loading from "@/components/Loading";
import { mutate } from "swr";
import { useTheme } from "next-themes";
import { filtersAtom } from "./Atoms";


export default function Home() {
  const { data, error, isLoading } = useFetch('http://localhost:3000/tarefas');
  const [ allData, setAllData ] = useState<tasksProps[]>([]);
  const [ filters, setFilters ] = useAtom(filtersAtom)
  const { theme, setTheme } = useTheme();


  useEffect(() => {
    if(data != undefined){
      setAllData(data);
    }
    mutate( 'http://localhost:3000/tarefas' );

  },[data, allData]);

  function getNewDataAndSave(newData:tasksProps){   
    setAllData([...allData, newData]);
  }

  
  const filteredArray = () => { 

    const normalizeToLowerCase = filters.search.toLowerCase();
    const sensitiveDataBySearch = allData.filter( task => task.name?.toLowerCase().includes( normalizeToLowerCase ) );
    const sensitiveDataByPriority = filters.priority != 'Todos' ? sensitiveDataBySearch.filter( taskFiltered => taskFiltered.priority === filters.priority ) : sensitiveDataBySearch;
    const sensitiveDataByStatus = filters.status != 'Todos' ? sensitiveDataByPriority.filter( taskFiltered => taskFiltered.status === filters.status ) : sensitiveDataByPriority;
    const sensitiveDataByFolders = filters.folder != null ? sensitiveDataByPriority.filter( taskFiltered => taskFiltered.folder === filters.folder ) : sensitiveDataByStatus;


    const dataFiltered = [...sensitiveDataByFolders]

    return dataFiltered
  }

  const sensitiveDataByFilters = filteredArray();
  
  useEffect(() => {
    filteredArray();
  }, [filters]);  

  if(isLoading && theme != localStorage.getItem( 'theme' )) return <Loading/>;
  if(!isLoading && !error)
    return (
      <div className="flex bg-[#F5F6FA] dark:bg-black/20 transition-colors durantion-100">
        <SideBar/>
          <div className="w-[90%]">
          <div className="flex items-center justify-between bg-white dark:bg-[#1e293b] border border-black/10 w-full h-20 p-4">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold">Todas as Tarefas</h1>
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
                  <Select onValueChange={(value) => setFilters({...filters, priority: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="Todos">
                          Todos
                      </SelectItem>
                      <SelectItem value="ALTA PRIORIDADE">
                          Priordade Alta
                      </SelectItem>
                      <SelectItem value="MÉDIA PRIORIDADE">
                          Priordade Média
                      </SelectItem>
                      <SelectItem value="BAIXA PRIORIDADE">
                          Priordade Baixa
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select onValueChange={(value) => setFilters({...filters, status: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="Todos">
                          Todos
                      </SelectItem>
                      <SelectItem value="Não inciado">
                          Não inciada
                      </SelectItem>
                      <SelectItem value="Fazer">
                          Fazer
                      </SelectItem>
                      <SelectItem value="Em andamento">
                          Em andamento
                      </SelectItem>
                      <SelectItem value="Concluída">
                          Concluída
                      </SelectItem>
                      <SelectItem value="Atrasada">
                          Atrasada
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                <Button variant="outline" >
                  <CiCalendarDate />
                </Button>
                </div>
              </div>
              <AddTaskModal getNewDataAndSave={getNewDataAndSave}/>
            </div>
          </div>
          <DataTable columns={columns} data={sensitiveDataByFilters} />
        </div>
      </div>
  );
}
