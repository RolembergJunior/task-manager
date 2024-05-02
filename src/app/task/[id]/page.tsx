'use client'

import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { useParams, useRouter } from "next/navigation";
import SideBar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loading from "@/components/Loading";
import { tasksProps } from "@/app/types/Types";
import { BiLeftArrowAlt } from 'react-icons/bi';
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import Cheklist from "../components/ChekListContent";

export default function Task(){
    const param = useParams();
    const route = useRouter();
    const { data, error, isLoading } = useFetch(`http://localhost:3000/tarefas/?id=${param.id}`);

    if(isLoading && error) return <Loading/>
    if(!isLoading)
    return(
        <div className="flex">
            <SideBar/>
            <div className="bg-black/5 w-[80%] mx-auto h-[95vh] my-auto rounded-xl shadow-md shadow-black/20 p-5">
                <div className="flex justify-between">
                    <BiLeftArrowAlt 
                        onClick={() => route.push('/')} 
                        className="hover:cursor-pointer"
                        size={30} />
                    <Button>
                        <FaRegTrashAlt />
                    </Button>
                </div>
                <div className="flex">
                    <div className="mt-16 px-10 space-y-10 w-[70%]">
                        <div className="flex items-center gap-4" >
                            <div className="bg-red-800 w-3 h-3" />
                            <h1 className="text-3xl font-semibold">
                                {data?.map( task => task.name )}
                            </h1>
                        </div>
                        <div className="flex items-center gap-6">
                            <div>
                                <span className="font-medium text-black/50">Responsável</span>
                                <p className="">Rolemberg junior</p>
                            </div>
                            <div>
                                <span className="font-medium text-black/50">Data de criação</span>
                                <p className="">{data?.map( task => task.creationDate )}</p>
                            </div>
                            <div>
                                <span className="font-medium text-black/50">Data de finalização</span>
                                <p className="">{data?.map( task => task.finalizationDate )}</p>
                            </div>
                            <div>
                                <span className="font-medium text-black/50">Categoria</span>
                                <p className="">{data?.map( task => task.priority )}</p>
                            </div>
                            <div>
                                <span className="font-medium text-black/50">Status</span>
                                <p className="">{data?.map( task => task.status )}</p>
                            </div>
                        </div>
                        <textarea  
                            placeholder="Digite uma descrição para a tarefa"    
                            className="w-full h-10 rounded-md focus:h-52 transition-all duration-300 outline-none p-2 resize-none" 
                        />
                        <Cheklist id={param.id} />
                    </div>
                    <div className="mt-16 space-y-5 w-[20%] mx-auto h-full">
                        <h1 className="text-center text-xl font-semibold">Atividade</h1>
                        <div className="bg-white h-[62vh] w-full rounded-md">
                            <p className="text-center text-black/50"></p>
                        </div>
                        <div className="flex items-center justify-between gap-1">
                            <textarea 
                                placeholder="Digite aqui"
                                className="h-10 px-4 py-2 w-full resize-none focus:outline-none scrollbar-none"
                            />
                            <Button>Enviar</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}