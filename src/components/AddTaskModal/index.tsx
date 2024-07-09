'use client'

import { useState } from 'react';
import { tasksProps } from '@/app/types/Types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskModalProps{
    getNewDataAndSave: (data:tasksProps) => void
}

export default function AddTaskModal({ getNewDataAndSave }:TaskModalProps){
    const [data, setData] = useState<tasksProps>({
        name: '',
        description:'',
        responsible: null, 
        creationDate: new Intl.DateTimeFormat('pt-BR').format(new Date(Date.now())),
        finalizationDate: '',
        priority: '',
        folder: null,
        status: '',
        checklist:[]
    });
    const url = 'http://localhost:3000/tarefas';
    let dateNow = new Date(Date.now());

    function onHandleAddTask(){
        if(data.name != "", data.finalizationDate != "", data.status != ""){
            getNewDataAndSave({
                name: data.name,
                description: data.description,
                responsible: data.responsible, 
                creationDate: new Intl.DateTimeFormat('pt-BR').format(dateNow),
                finalizationDate: data.finalizationDate,
                priority: data.priority,
                folder: data.folder,
                status: data.status,
                checklist:[]
            });

            try {
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then( response => response.json() );
                
            } catch (error) {
                console.error( 'Hoube um erro ao adicionar uma task', error );
            }
        } else
        alert('Adicione o nome, a data de finalização e o status da tarefa')
    }

    return(
        <Dialog>
                <DialogTrigger color='white' >
                  <Button>Adicionar Tarefa</Button>
                </DialogTrigger>
                <DialogContent className='dark:bg-black/80'>
                  <DialogHeader className='space-y-3'>
                    <DialogTitle className='text-center dark:text-white'>TAREFA</DialogTitle>
                  </DialogHeader>
                    <div className='space-y-3'>
                        <div className='space-y-3'>
                            <div>
                                <label htmlFor="name">Nome da tarefa</label>
                                <Input 
                                    onChange={(e) => setData({...data,name:e.target.value})} 
                                    id="name" 
                                    type="text" 
                                    placeholder="Colocar lixo para..."
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="name">Descrição</label>
                                <Input 
                                    onChange={(e) => setData({...data,description:e.target.value})} 
                                    id="name" 
                                    type="text" 
                                    placeholder="Usar o saco azul para lixos sólidos e preto..." 
                                />
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div className='w-40'>
                                <label htmlFor="date">Data de finalização</label>
                                <Input 
                                    onChange={(e) => setData({...data,finalizationDate:e.target.value})} 
                                    id="date" 
                                    type="date"/>
                            </div>
                            <div>
                                <div className='w-40'>
                                    <label>Status</label>
                                    <Select onValueChange={(value) => setData({...data, status:value})} required>
                                        <SelectTrigger>
                                        <SelectValue placeholder="Selecione um Status" />
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
                            <div className='w-40'>
                                <label>Responsável</label>
                                <Select onValueChange={(value) => setData({...data, responsible:value}) }>
                                    <SelectTrigger>
                                    <SelectValue placeholder="Selecione um responsável" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Rolemberg Junior" >Rolemberg Junior</SelectItem>
                                        <SelectItem value="Pitter Antonio" >Pitter Antonio</SelectItem>
                                        <SelectItem value="Fernanda Sales" >Fernanda Sales</SelectItem>
                                        <SelectItem value="Ruan Pabli" >Ruan Pablo</SelectItem>
                                        <SelectItem value="Luan Carlos" >Luan Carlos</SelectItem>
                                    </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className='w-40'>
                                <label>Categoria</label>
                                <Select onValueChange={(value) => setData({...data, priority:value}) } required>
                                    <SelectTrigger>
                                    <SelectValue placeholder="Selecione uma categoria" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="ALTA PRIORIDADE" >Urgente</SelectItem>
                                        <SelectItem value="MÉDIA PRIORIDADE" >Média urgência</SelectItem>
                                        <SelectItem value="BAIXA PRIORIDADE" >Baixa urgência</SelectItem>
                                    </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div>
                            <label>Pasta</label>
                            <Select onValueChange={(value) => setData({...data, folder:value})}>
                                <SelectTrigger>
                                <SelectValue placeholder="Adicionar a pasta" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="1" >Em desenvolvimento</SelectItem>
                                    <SelectItem value="2" >Tarefas futuras</SelectItem>
                                    <SelectItem value="3" >Bugs</SelectItem>
                                    <SelectItem value="4" >Melhorias</SelectItem>
                                </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogClose>
                        <Button onClick={() => onHandleAddTask()} className='w-full'>Adicionar</Button>
                    </DialogClose>
                </DialogContent>
              </Dialog>
    );
}