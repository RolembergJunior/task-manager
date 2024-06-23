"use client"

import { useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { mutate } from "swr";
import { tasksProps } from "./types/Types";
import { DataTable } from "./tasks/data-table";
import { columns } from "./tasks/columns";
import { Input } from "@/components/ui/input";
import { CiCalendarDate, CiSearch } from "react-icons/ci";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import SideBar from "@/components/Sidebar";
import AddTaskModal from "@/components/AddTaskModal";
import Loading from "@/components/Loading";

interface FiltersProps{
  search: string,
  priority: string | null,
  status: string | null,
  date: string | null
}

export default function Home() {
  const { data, error, isLoading } = useFetch('http://localhost:3000/tarefas');
  const [ allData, setAllData ] = useState<tasksProps[]>([]);
  const [ filters, setFilters ] = useState<FiltersProps>({
    search: '',
    priority: null,
    status: null,
    date: null
  });

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

    const sensitiveDataBySearch = allData.filter( task => task.name.toLowerCase().includes( normalizeToLowerCase ) );
    const sensitiveDataByPriority = filters.priority != null ? allData.filter( taskFiltered => taskFiltered.priority === filters.priority ) : allData;
    const sensitiveDataByStatus = filters.status != null ? allData.filter( taskFiltered => taskFiltered.status === filters.status ) : allData;


    const dataFiltered = [...sensitiveDataBySearch, ...sensitiveDataByPriority, ...sensitiveDataByStatus]

    console.log( dataFiltered, 'testandooooo' )

    return dataFiltered
  }

  const sensitiveDataByFilters = filteredArray();
  
  useEffect(() => {
    filteredArray()
  }, [filters])

  // console.log( filteredArray, 'Arrayfiltrado' )

  

  

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
                      <SelectItem value="fazer">
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
