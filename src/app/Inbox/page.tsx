'use client'

import { useEffect, useState } from "react";
import { tasksProps } from "../types/Types";
import SideBar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { HiMagnifyingGlass } from "react-icons/hi2";
import MenuFilter from "./components/MenuFilters";
import { getTasks } from "@/services/api";

export default function Inbox(){
  const [tasks, setTasks] = useState<tasksProps>()

  useEffect(() => {
    try {
      getTasks().then( data => {
        setTasks(data);
      });
    } catch (error) {
      console.log('Erro ao fazer a requisição')
    }
  },[])
    
    return(
        <div className="flex">
          <SideBar/>
          <div className="w-full">
            <div className="flex items-center justify-between border border-black/10 w-full h-20 p-4">
              <MenuFilter/>
              <div className="flex gap-3">
                <div className="flex items-center gap-2 p-2 hover:cursor-pointer hover:bg-black/20 rounded-xl transition-all">
                  <HiMagnifyingGlass />
                  <span>Search</span>
                </div>
                <Button>Limpar Tarefas</Button>
              </div>
            </div>
            <section className="w-[90%] mx-auto mt-4">
                <div className="space-y-2">
                  <h1 className="text-xl font-semibold text-black/40 mb-5">Hoje</h1>
                  <div className="flex items-center justify-between border border-black/10 rounded-xl p-4 hover:cursor-pointer hover:bg-muted/50">
                    <div className="bg-red-800 w-3 h-3" />
                    <p className="font-medium"> Projeto de extensão </p>
                    <p className="font-medium"> Rolemberg Junior </p>
                    <p className="font-medium"> 16 de Abril </p>
                  </div>
                  <div className="flex items-center justify-between border border-black/10 rounded-xl p-4 hover:cursor-pointer hover:bg-muted/50">
                    <div className="bg-red-800 w-3 h-3" />
                    <p className="font-medium"> Projeto de extensão </p>
                    <p className="font-medium"> Rolemberg Junior </p>
                    <p className="font-medium"> 16 de Abril </p>
                  </div>
                  <div className="flex items-center justify-between border border-black/10 rounded-xl p-4 hover:cursor-pointer hover:bg-muted/50">
                    <div className="bg-red-800 w-3 h-3" />
                    <p className="font-medium"> Projeto de extensão </p>
                    <p className="font-medium"> Rolemberg Junior </p>
                    <p className="font-medium"> 16 de Abril </p>
                  </div>
                  <div className="flex items-center justify-between border border-black/10 rounded-xl p-4 hover:cursor-pointer hover:bg-muted/50">
                    <div className="bg-red-800 w-3 h-3" />
                    <p className="font-medium"> Projeto de extensão </p>
                    <p className="font-medium"> Rolemberg Junior </p>
                    <p className="font-medium"> 16 de Abril </p>
                  </div>
                </div>
            </section>
          </div>  
        </div>
        // <div className="flex">
        //   <SideBar/>
        //   <div className="flex items-center justify-between border border-black/10 w-full h-20 p-4">
        //     <MenuFilter/>
        //     <div className="flex gap-3">
        //       <div className="flex items-center gap-2 p-2 hover:cursor-pointer hover:bg-gray-400 rounded-xl transition-all">
        //         <HiMagnifyingGlass />
        //         <span>Search</span>
        //       </div>
        //       <Button>Limpar Tarefas</Button>
        //     </div>
        //   </div>
        // </div>
    );
}