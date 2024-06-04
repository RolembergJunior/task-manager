'use client'

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { mutate } from "swr";
import SideBar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading";
import { BiLeftArrowAlt } from 'react-icons/bi';
import { FaRegTrashAlt } from "react-icons/fa";
import Cheklist from "../components/ChekListContent";
import { Dialog, DialogClose, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { tasksProps } from "@/app/types/Types";
import { parse,format } from 'date-fns';


export default function Task(){
    const [ dataProps, setDataProps ] = useState<tasksProps>(
        {
            name: '',
            description:'',
            responsible: '', 
            creationDate: '',
            finalizationDate: '',
            priority: '',
            folder: null,
            status: '',
            checklist: ['']
        }
    )
    const route = useRouter();
    const param = useParams();
    const url = `http://localhost:3000/tarefas/${param.id}`;
    const { data, error, isLoading } = useFetch(url);
    
    let currentDate = new Date( Date.now() );
    let inputedDate = new Date( dataProps?.finalizationDate );

    function verifyDateAndStylize(){

        if( currentDate === inputedDate ){
                return <div className="bg-orange-500 w-3 h-3 mx-auto rounded-full" />
            } else if( currentDate < inputedDate ){
                return <div className="bg-green-600 w-3 h-3 mx-auto rounded-full" />
            } else if(  currentDate  > inputedDate ){
                return <div className="bg-red-700 w-3 h-3 mx-auto rounded-full" />
            } 
}

    useEffect(() => {
        verifyDateAndStylize();

        if( !error && data != undefined){
            
            setDataProps(
                {
                    name: data.name ,
                    description:data.description ,
                    responsible: data.responsible , 
                    creationDate: data.creationDate ,
                    finalizationDate: data.finalizationDate ,
                    priority: data.priority ,
                    folder: data.folder ,
                    status: data.status ,
                    checklist: data.checklist?.map( list => list ) 
                }
            )
        } 
    },[data]);


    const options = {
        method: 'DELETE'
    };

    function onHandleRemoveTask(){
        
        fetch(url, options)
        .then(response => response.json())
        .catch(error => console.error('ERRO:',error));

        route.push('/');
    };

    function onEditTask(){

        if( data ){

            fetch( url, {
                method: 'PUT',
                headers: {
                "content-type": "application/json"
                },
                body: JSON.stringify({
                    "name": dataProps.name,
                    "description": dataProps.description,
                    "responsible": dataProps.responsible, 
                    "creationDate": dataProps.creationDate,
                    "finalizationDate": dataProps.finalizationDate,
                    "priority": dataProps.priority,
                    "status": dataProps.status,
                    "folder": dataProps.folder,
                    "checklist": dataProps.checklist
                })
            })
            .then( response => response.json() )

            mutate(url);
        };

    };


    useEffect(() => {
        onEditTask();
    }, [
            dataProps.name, 
            dataProps.description, 
            dataProps.responsible, 
            dataProps.creationDate, 
            dataProps.finalizationDate, 
            dataProps.priority, 
            dataProps.status, 
            dataProps.folder, 
            dataProps.checklist
        ]);


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
                                <div className="w-3 h-3 mx-auto rounded-full">
                                    {verifyDateAndStylize()}
                                </div>
                                <textarea 
                                    onChange={(e) => setDataProps({ ...dataProps, name: e.target.value })}
                                    value={dataProps.name} 
                                    className="bg-transparent h-10 w-full text-3xl font-semibold focus:outline-none resize-none overflow-auto" 
                                />
                            </div>
                            <div className="flex items-center gap-6">
                                <div>
                                    <span className="font-medium text-black/50">Responsável</span>
                                    <Select onValueChange={(value) => setDataProps({ ...dataProps, responsible: value })}>
                                        <SelectTrigger className="w-34 border-none focus:outline-none">
                                            <SelectValue placeholder={dataProps.responsible} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="Rolemberg Junior" >Rolemberg Junior</SelectItem>
                                                <SelectItem value="Pitter Antonio" >Pitter Antonio</SelectItem>
                                                <SelectItem value="Fernanda Sales" >Fernanda Sales</SelectItem>
                                                <SelectItem value="Ruan Pablo" >Ruan Pablo</SelectItem>
                                                <SelectItem value="Luan Carlos" >Luan Carlos</SelectItem>
                                                </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <span className="font-medium text-black/50">Data de criação</span>
                                    <p className="">{dataProps.creationDate}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-black/50">Data de finalização</span>
                                    <Input 
                                        onChange={(e) => setDataProps({ ...dataProps, finalizationDate: e.target.value })}
                                        type="date" 
                                        className="border-none focus:outline-none"
                                        value={dataProps.finalizationDate} 
                                    />
                                </div>
                                <div>
                                    <span className="font-medium text-black/50">Prioridade</span>
                                    <Select onValueChange={(value) => setDataProps({ ...dataProps, priority: value })}>
                                        <SelectTrigger className="w-34 border-none ">
                                            <SelectValue placeholder={dataProps.priority} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="ALTA PRIORIDADE" >URGENTE</SelectItem>
                                                <SelectItem value="MÉDIA PRIORIDADE" >MÉDIA URGÊNCIA</SelectItem>
                                                <SelectItem value="BAIXA PRIORIDADE" >BAIXA URGÊNCIA</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <span className="font-medium text-black/50">Status</span>
                                    <Select onValueChange={(value) => setDataProps({ ...dataProps, status: value })} >
                                        <SelectTrigger className="w-34 border-none">
                                            <SelectValue placeholder={dataProps.status} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                            <SelectItem value="Não iniciado" >Não inciado</SelectItem>
                                            <SelectItem value="Fazer" >Fazer</SelectItem>
                                            <SelectItem value="Em andamento" >Em andamento</SelectItem>
                                            <SelectItem value="Concluída" >Concluído</SelectItem>
                                            <SelectItem value="Atrasada" >Atrasado</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <textarea  
                                value={ dataProps.description }
                                onChange={(e) => setDataProps({ ...dataProps, description: e.target.value })}
                                placeholder="Digite uma descrição para a tarefa"    
                                className="bg-[#F5F6FA] w-full h-10 rounded-md focus:h-52 transition-all duration-300 outline-none p-2 resize-none" 
                            />
                            <Cheklist dataProps={dataProps} />
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