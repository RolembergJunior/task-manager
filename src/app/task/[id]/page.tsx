'use client'

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { mutate } from "swr";
import SideBar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading";
import { BiLeftArrowAlt } from 'react-icons/bi';
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { Dialog, DialogClose, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { tasksProps } from "@/app/types/Types";
import { format } from 'date-fns';
import { useTheme } from "next-themes";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { IoIosClose } from "react-icons/io";


export default function Task(){
    const [ dataTask, setDataTask ] = useState<tasksProps>(
        {
            name: '',
            description:'',
            responsible: '', 
            creationDate: '',
            finalizationDate: '',
            priority: '',
            folder: null,
            status: '',
            checklist: []
        }
    );
    const [isOpenInput, setIsOpenInput] = useState(false);
    const [inputText, setInputText] = useState('');
    const { theme } = useTheme();
    const route = useRouter();
    const param = useParams();
    const url = `http://localhost:3000/tarefas/${param.id}`;
    const { data, error, isLoading } = useFetch(url);
    

    function verifyDateAndStylize(){
        if( dataTask.creationDate != undefined && dataTask.finalizationDate ){

            let currentDate = new Date( format(Date.now(), 'yyyy-MM-dd') );
            let inputedDate = new Date( dataTask?.finalizationDate );
    
            if( currentDate.getTime() === inputedDate.getTime() ){
                return (
                          <TooltipProvider>
                              <Tooltip>
                                  <TooltipTrigger className="hover:cursor-default">
                                      <div className="bg-orange-600 w-3 h-3 mx-auto rounded-full" /> 
                                  </TooltipTrigger>
                                  <TooltipContent sideOffset={10} className="bg-gray-600 text-white p-2 rounded-sm transition-all">
                                      <p>Último dia</p>
                                  </TooltipContent>
                              </Tooltip>
                          </TooltipProvider>
                  );
            } else if( currentDate.getTime() < inputedDate.getTime() ){
                return (
                  <TooltipProvider>
                      <Tooltip>
                          <TooltipTrigger className="hover:cursor-default">
                              <div className="bg-green-600 w-3 h-3 mx-auto rounded-full" /> 
                          </TooltipTrigger>
                          <TooltipContent sideOffset={10} className="bg-gray-600 text-white p-2 rounded-sm transition-all">
                              <p>No prazo</p>
                          </TooltipContent>
                      </Tooltip>
                  </TooltipProvider>
                );
            } else if( currentDate.getTime() > inputedDate.getTime() ){
              return (
                  <TooltipProvider>
                      <Tooltip>
                          <TooltipTrigger className="hover:cursor-default">
                              <div className="bg-red-600 w-3 h-3 mx-auto rounded-full" /> 
                          </TooltipTrigger>
                          <TooltipContent sideOffset={10} className="bg-gray-600 text-white p-2 rounded-sm transition-all">
                              <p>Atrasado</p>
                          </TooltipContent>
                      </Tooltip>
                  </TooltipProvider>
                );
            } 
        }
    }


    useEffect(() => {
        verifyDateAndStylize();

        if( !error && data != undefined){
            setDataTask(
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
            );

            
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
                    "name": dataTask.name,
                    "description": dataTask.description,
                    "responsible": dataTask.responsible, 
                    "creationDate": dataTask.creationDate,
                    "finalizationDate": dataTask.finalizationDate,
                    "priority": dataTask.priority,
                    "status": dataTask.status,
                    "folder": dataTask.folder,
                    "checklist": dataTask.checklist
                })
            })
            .then( response => response.json() )
            mutate(url);
        };
    };


    useEffect(() => {
        onEditTask();
    }, [
            dataTask.name, 
            dataTask.description, 
            dataTask.responsible, 
            dataTask.creationDate, 
            dataTask.finalizationDate, 
            dataTask.priority, 
            dataTask.status, 
            dataTask.folder, 
            dataTask.checklist
        ]);


    if(isLoading && error && theme != localStorage.getItem( 'theme' )) return <Loading/>
    if(!isLoading)
    return(
        <div className="flex bg-[#F5F6FA] dark:bg-black/20">
            <SideBar/>
            <div className="w-[90%] my-auto">
                <div className="bg-white dark:bg-[#1e293b] mx-auto w-[95%] h-[95vh] rounded-xl shadow-md shadow-black/20 p-5">
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
                            <div className="flex items-center bg-[#F5F6FA] dark:bg-black/50 gap-4 p-2 rounded-md" >
                                <div className="w-3 h-3 mx-auto rounded-full" >
                                    {verifyDateAndStylize()}
                                </div>
                                <textarea 
                                    onChange={(e) => setDataTask({ ...dataTask, name: e.target.value })}
                                    value={dataTask.name} 
                                    className="bg-transparent h-10 w-full text-3xl font-semibold focus:outline-none resize-none overflow-auto" 
                                />
                            </div>
                            <div className="flex items-center gap-6">
                                <div>
                                    <span className="font-medium text-black/50 dark:text-white/70">Responsável</span>
                                    <Select onValueChange={(value) => setDataTask({ ...dataTask, responsible: value })}>
                                        <SelectTrigger className="w-34 border-none focus:outline-none">
                                            <SelectValue placeholder={dataTask.responsible} />
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
                                    <span className="font-medium text-black/50 dark:text-white/70">Data de criação</span>
                                    <p className="">{dataTask.creationDate}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-black/50 dark:text-white/70">Data de finalização</span>
                                    <Input 
                                        onChange={(e) => setDataTask({ ...dataTask, finalizationDate: e.target.value })}
                                        type="date" 
                                        color="white"
                                        className="border-none focus:outline-none"
                                        value={dataTask.finalizationDate} 
                                    />
                                </div>
                                <div>
                                    <span className="font-medium text-black/50 dark:text-white/70">Prioridade</span>
                                    <Select onValueChange={(value) => setDataTask({ ...dataTask, priority: value })} >
                                        <SelectTrigger className="w-34 border-none " color="white">
                                            <SelectValue placeholder={dataTask.priority} />
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
                                    <span className="font-medium text-black/50 dark:text-white/70">Status</span>
                                    <Select onValueChange={(value) => setDataTask({ ...dataTask, status: value })} >
                                        <SelectTrigger className="w-34 border-none" color="white">
                                            <SelectValue placeholder={dataTask.status} />
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
                                value={ dataTask.description }
                                onChange={(e) => setDataTask({ ...dataTask, description: e.target.value })}
                                color={`${ theme === 'dark' ? 'white' : 'default' }`}
                                placeholder="Digite uma descrição para a tarefa"    
                                className="bg-[#F5F6FA] dark:bg-black/50 w-full h-10 rounded-md focus:h-52 transition-all duration-300 outline-none p-2 resize-none" 
                            />
                            <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h1 className="text-xl font-semibold ">ChekList</h1>
                                <div
                                    onClick={() => setIsOpenInput(!isOpenInput)} 
                                    className="transition-colors hover:bg-black/10 hover:cursor-pointer rounded-full p-2">
                                    <FaPlus />
                                </div>
                            </div>
                            {dataTask.checklist?.length || isOpenInput ? 
                                <div className="bg-[#F5F6FA] dark:bg-black/50 rounded-lg p-3 max-h-52 overflow-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-white" >
                                    {isOpenInput 
                                        ? (
                                            <div className="flex gap-2">
                                                <Input 
                                                    onChange={(e) => setInputText(e.target.value)} 
                                                    type='text' 
                                                    placeholder='Digite aqui...' 
                                                />
                                                <Button 
                                                    onClick={() => {
                                                        if(inputText != ''){
                                                            setInputText('');
                                                            setIsOpenInput(false);

                                                            setDataTask({ ...dataTask, checklist: [ { name: inputText, isCheck: false }, ...dataTask.checklist?.map( item => item ) ] })
                                                        }
                                                    }}
                                                >
                                                    Salvar
                                                </Button>
                                            </div>
                                        ) 
                                        : null}
                                    {dataTask.checklist?.map( ( item, indexItem ) => (
                                        <div key={indexItem} className="flex items-center justify-between w-full border-b border-black/10 dark:border-white/20">
                                            { item.isCheck 
                                                ?   (
                                                        <div className='relative'>
                                                            <label>{item.name}</label>
                                                            <hr className='absolute top-[43%] bg-black dark:bg-white w-full h-[2px]' />
                                                        </div>
                                                    ) 
                                                :   <label>{item.name}</label> }
                                            <div className="flex items-center gap-3">
                                                <Input 
                                                        checked={ item.isCheck ? true : false } 
                                                        onClick={() => {
                                                            const updateCheckboxItems = dataTask.checklist.map( (itemIsChecked, index) => index === indexItem ? {...item, isCheck: !item.isCheck } : itemIsChecked );

                                                            setDataTask({ ...dataTask, checklist: updateCheckboxItems });
                                                        }} 
                                                        type="checkbox" 
                                                        className="w-5"
                                                /> 
                                                <div 
                                                    onClick={() => {
                                                        const deleteItemCheckList = dataTask.checklist.filter( (_, index) =>  index != indexItem );

                                                        setDataTask({ ...dataTask, checklist: deleteItemCheckList });
                                                    }}
                                                >
                                                    <IoIosClose size={25} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                             : null}
                        </div>
                        </div>
                        <div className="mt-16 space-y-5 w-[20%] mx-auto h-full">
                            <h1 className="text-center text-xl font-semibold">Atividade</h1>
                            <div className="bg-[#F5F6FA] dark:bg-black/50 h-[62vh] w-full rounded-md">
                                <p className="text-center text-black/50"></p>
                            </div>
                            <div className="flex items-center justify-between gap-1">
                                <textarea 
                                    placeholder="Digite aqui"
                                    className="bg-[#F5F6FA] dark:bg-black/50 h-10 px-4 py-2 w-full resize-none focus:outline-none scrollbar-none"
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