'use client'

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
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
} from "@/components/ui/select"

export default function AddTaskModal(){
    return(
        <Dialog>
                <DialogTrigger>
                  <Button>Adicionar Tarefa</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className='space-y-3'>
                    <DialogTitle className='text-center'>TAREFA</DialogTitle>
                    <div className='space-y-3'>
                        <div className='space-y-3'>
                            <div>
                                <label htmlFor="name">Nome da tarefa</label>
                                <Input id="name" type="text" placeholder="Colocar lixo para..." />
                            </div>
                            <div>
                                <label htmlFor="name">Descrição</label>
                                <Input id="name" type="text" placeholder="Usar o saco azul para lixos sólidos e preto..." />
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div className='w-40'>
                                <label htmlFor="date">Data de finalização</label>
                                <Input id="date" type="date"/>
                            </div>
                            <div>
                                <div className='w-52'>
                                    <label>Status</label>
                                    <Select>
                                        <SelectTrigger>
                                        <SelectValue placeholder="Selecione um Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="new" >Não inciado</SelectItem>
                                            <SelectItem value="todo" >Fazer</SelectItem>
                                            <SelectItem value="working" >Em andamento</SelectItem>
                                            <SelectItem value="completed" >Concluído</SelectItem>
                                            <SelectItem value="late" >Atrasado</SelectItem>
                                        </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className='w-52'>
                            <label>Responsável</label>
                            <Select>
                                <SelectTrigger>
                                <SelectValue placeholder="Selecione um responsável" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="1" >Rolemberg Junior</SelectItem>
                                    <SelectItem value="2" >Pitter Antonio</SelectItem>
                                    <SelectItem value="3" >Fernanda Sales</SelectItem>
                                    <SelectItem value="4" >Ruan Pablo</SelectItem>
                                    <SelectItem value="5" >Luan Carlos</SelectItem>
                                </SelectGroup>
                                </SelectContent>
                            </Select>
                            </div>
                        </div>
                        <div>
                        <label>Pasta</label>
                        <Select>
                            <SelectTrigger>
                            <SelectValue placeholder="Adicionar a pasta" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectGroup>
                                <SelectItem value="new" >Em desenvolvimento</SelectItem>
                                <SelectItem value="todo" >Tarefas futuras</SelectItem>
                                <SelectItem value="working" >Bugs</SelectItem>
                                <SelectItem value="completed" >Melhorias</SelectItem>
                            </SelectGroup>
                            </SelectContent>
                        </Select>
                        </div>
                    </div>
                    <DialogClose>
                        <Button className='w-full'>Adicionar</Button>
                    </DialogClose>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
    );
}