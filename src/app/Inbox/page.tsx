'use client'

import SideBar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { HiMagnifyingGlass } from "react-icons/hi2";
import MenuFilter from "./components/MenuFilters";

export default function Inbox(){
    
    return(
        <div className="flex">
          <SideBar/>
          <div className="fxed flex items-center justify-between border border-black/10 w-full h-20 p-4">
            <MenuFilter/>
            <div className="flex gap-3">
              <div className="flex items-center gap-2 p-2 hover:cursor-pointer hover:bg-gray-400 rounded-xl transition-all">
                <HiMagnifyingGlass />
                <span>Search</span>
              </div>
              <Button>Limpar Tarefas</Button>
            </div>
          </div>

        </div>
    );
}