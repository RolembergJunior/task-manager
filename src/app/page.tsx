"use client"

import { useEffect } from "react";
import { useAtom } from "jotai";
import { filtersAtom, taskAtom } from "./Atoms";
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

export default function Home() {
  const [ atomData, setAtomData ] = useAtom( taskAtom );
  const [ filters, setFilters ] = useAtom( filtersAtom );

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3000/tarefas');
        const data = await response.json();

        setAtomData({ task: data, loading: false, error:null });
      } catch (error) {
        console.log('Houve um problema com o fetch dos dados', error)
        setAtomData({ task: [], error: error, loading: false });
      }
    };
    fetchTasks();
  },[setAtomData]);

  function getNewDataAndSave(newData:tasksProps){   
    setAtomData({ task: [...atomData.task, newData], loading: false, error: null });
  }
  
  const filteredArray = () => { 

    const normalizeToLowerCase = filters.search.toLowerCase();
    const sensitiveDataBySearch = atomData.task.filter( task => task.name?.toLowerCase().includes( normalizeToLowerCase ) );
    const sensitiveDataByPriority = filters.priority != 'Todos' ? sensitiveDataBySearch.filter( taskFiltered => taskFiltered.priority === filters.priority ) : sensitiveDataBySearch;
    const sensitiveDataByStatus = filters.status != 'Todos' ? sensitiveDataByPriority.filter( taskFiltered => taskFiltered.status === filters.status ) : sensitiveDataByPriority;

    return sensitiveDataByStatus;
  };

  const sensitiveDataByFilters = filteredArray();
  
  useEffect(() => {
    filteredArray();
  }, [filters]);  

  if(atomData.loading) return <Loading/>;
  if(!atomData.loading && !atomData.error)
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
