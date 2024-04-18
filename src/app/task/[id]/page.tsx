'use client'

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { tasksProps } from "@/app/types/Types";
import SideBar from "@/components/Sidebar";
import { BiLeftArrowAlt } from 'react-icons/bi';
import { Fullscreen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Task(){
    const [task, setTask] = useState<tasksProps[]>([]);
    const route = useRouter();
    const param = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/tarefas/?id=${param.id}`)
        .then( response => response.json() )
        .then( data => setTask(data) )

        console.log(task)
      },[])

    return(
        <div className="flex">
            <SideBar/>
            <div className="bg-black/5 w-[80%] mx-auto h-[95vh] my-auto rounded-xl shadow-md shadow-black/20 p-5">
                <div className="flex justify-between">
                    <BiLeftArrowAlt 
                        onClick={() => route.push('/')} 
                        className="hover:cursor-pointer"
                        size={30} />
                    <Button>Excluir tarefa</Button>
                </div>
                <div className="mt-20 px-10 space-y-10 w-[70%]">
                    <h1 className="text-3xl font-semibold">{task[0]?.name}</h1>
                    <div className="flex items-center gap-6">
                        <div>
                            <span className="font-medium text-black/50">Responsável</span>
                            <p className="">Rolemberg junior</p>
                        </div>
                        <div>
                            <span className="font-medium text-black/50">Data de criação</span>
                            <p className="">{task[0]?.creationDate}</p>
                        </div>
                        <div>
                            <span className="font-medium text-black/50">Data de finalização</span>
                            <p className="">{task[0]?.finalizationDate}</p>
                        </div>
                        <div>
                            <span className="font-medium text-black/50">Categoria</span>
                            <p className="">{task[0]?.category}</p>
                        </div>
                        <div>
                            <span className="font-medium text-black/50">Status</span>
                            <p className="">{task[0]?.status}</p>
                        </div>
                    </div>
                    <input 
                        type="text" 
                        className="relative w-full h-10 rounded-md focus:h-60 transition-all duration-300 outline-none px-2" 
                        placeholder="Digite uma descrição para a tarefa"    
                    />
                    <div>
                        <h1 className="text-xl font-semibold ">ChekList</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}