"use client"

import SideBar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { DataTable } from "./tasks/data-table";
import { columns } from "./tasks/columns";


export default function Home() {

  const data = [
    {
      id: 1,
      name: 'Ajustar Dashboard por obra',
      creationDate: '11/04/2024',
      finalizationDate: '13/04/2024',
      category:'URGENTE',
      status: 'Não iniciado'
    },
    {
      id: 2,
      name: 'Ajustar Table-report',
      creationDate: '12/04/2024',
      finalizationDate: '13/04/2024',
      category:'URGENTE',
      status: 'Fazer'
    },
    {
      id: 3,
      name: 'Colocar o lixo pra fora',
      creationDate: '13/04/2024',
      finalizationDate: '15/04/2024',
      category:'BAIXA URGENCIA',
      status: 'Em andamento'
    },
    {
      id: 4,
      name: 'Comprar aveia para fazer mingau',
      creationDate: '13/04/2024',
      finalizationDate: '17/04/2024',
      category:'URGÊNCIA MÉDIA',
      status: 'Concluído'
    },
    {
      id: 5,
      name: 'Criar dataset para trazer os dados de fichas abertas',
      creationDate: '10/04/2024',
      finalizationDate: '25/04/2024',
      category:'URGENTE',
      status: 'Atrasado'
    },
  ]

  return (
      <div className="flex">
        <SideBar/>
          <div className="w-full">
          <div className="fxed flex items-center justify-between border border-black/10 w-full h-20 p-4">
            <h1 className="text-xl font-semibold">All tasks</h1>
            <div className="flex gap-3">
              <div className="flex items-center gap-2 p-2 hover:cursor-pointer hover:bg-gray-400 rounded-xl transition-all">
                <HiMagnifyingGlass />
                <span>Search</span>
              </div>
              <Button>Adiconar Task</Button>
            </div>
          </div>
          <DataTable columns={columns} data={data} />
        </div>
      </div>
  )
}
