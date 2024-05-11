'use client'

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import SideBar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading";
import { BiLeftArrowAlt } from 'react-icons/bi';
import { FaRegTrashAlt } from "react-icons/fa";
import Cheklist from "../components/ChekListContent";
import { Dialog, DialogClose, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogContent } from "@/components/ui/dialog";

export default function Task(){
    const [ inputText, setInputText ] = useState< string | string[] | undefined>('')
    const param = useParams();
    const route = useRouter();
    const { data, error, isLoading } = useFetch(`http://localhost:3000/tarefas/?id=${param.id}`);

    useEffect(() => {
        if( !error ){
            setInputText(data?.map( task => task.description ))
        }
    },[data])

    const url = `http://localhost:3000/tarefas/${param.id}`;

    const options = {
        method: 'DELETE'
    }

    function onHandleRemoveTask(){
        
        fetch(url, options)
        .then(response => response.json())
        .catch(error => console.error('ERRO:',error));

        route.push('/');
    }

    function onHandleChangeInputDescription(){

        if( data ){
            const dataObejct = data[0]

            fetch( url, {
                method: 'PUT',
                headers: {
                "content-type": "application-json"
                },
                body: JSON.stringify({
                    "name": dataObejct?.name,
                    "description": inputText,
                    "responsible": dataObejct?.responsible, 
                    "creationDate": dataObejct?.creationDate,
                    "finalizationDate": dataObejct?.finalizationDate,
                    "priority": dataObejct?.priority,
                    "status": dataObejct?.status,
                    "folder": dataObejct?.folder,
                    "checklist": dataObejct?.checklist
                })
            })
            .then( response => response.json() )
            .then( data => console.log( data ) )
        }

    }

    if(isLoading && error) return <Loading/>
    if(!isLoading)
    return(
        <div className="flex bg-[#F5F6FA]">
            <SideBar/>
            <div className="w-[90%] my-auto">
                <div className="bg-white mx-auto w-[95%] h-[95vh] rounded-xl shadow-md shadow-black/20 p-5">
                    <div className="flex justify-between">
                        <BiLeftArrowAlt 
                            onClick={() => route.push('/')} 
                            className="hover:cursor-pointer"
                            size={30} />
                    <Dialog>
                    <DialogTrigger>
                            <Button>
                                <FaRegTrashAlt/>
                            </Button>
                    </DialogTrigger>
                        <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Excluir tarefa
                            </DialogTitle>
                            <DialogDescription>
                                Tem certeza que deseja limpar as tarefas da caixa de entrada?
                            </DialogDescription>
                            <div className="flex items-center justify-end gap-3">
                                <DialogClose
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-black/10 p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                                >
                                    Cancelar
                                </DialogClose>
                                <DialogClose>
                                    <Button
                                        onClick={() => onHandleRemoveTask()} 
                                    >
                                        Limpar
                                    </Button>
                                </DialogClose>
                            </div>
                        </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    </div>
                    <div className="flex">
                        <div className="mt-16 px-10 space-y-10 w-[70%]">
                            <div className="flex items-center bg-[#F5F6FA] gap-4 p-2 rounded-md" >
                                <div className="bg-red-800 w-3 h-3 rounded-md" />
                                <h1 className="text-3xl font-semibold">
                                    {data?.map( task => task.name )}
                                </h1> 
                            </div>
                            <div className="flex items-center gap-6">
                                <div>
                                    <span className="font-medium text-black/50">Responsável</span>
                                    <p className="">{data?.map( task => task.responsible )}</p>
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
                                    <span className="font-medium text-black/50">Prioridade</span>
                                    <p className="">{data?.map( task => task.priority )}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-black/50">Status</span>
                                    <p className="">{data?.map( task => task.status )}</p>
                                </div>
                            </div>
                            <textarea  
                                value={ inputText }
                                onChange={(e) => setInputText(e.target.value)}
                                onBlur={ () => onHandleChangeInputDescription() }
                                placeholder="Digite uma descrição para a tarefa"    
                                className="bg-[#F5F6FA] w-full h-10 rounded-md focus:h-52 transition-all duration-300 outline-none p-2 resize-none" 
                            />
                            <Cheklist data={data} />
                        </div>
                        <div className="mt-16 space-y-5 w-[20%] mx-auto h-full">
                            <h1 className="text-center text-xl font-semibold">Atividade</h1>
                            <div className="bg-[#F5F6FA] h-[62vh] w-full rounded-md">
                                <p className="text-center text-black/50"></p>
                            </div>
                            <div className="flex items-center justify-between gap-1">
                                <textarea 
                                    placeholder="Digite aqui"
                                    className="bg-[#F5F6FA] h-10 px-4 py-2 w-full resize-none focus:outline-none scrollbar-none"
                                />
                                <Button>Enviar</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}