'use client'

import { useFetch } from '@/hooks/useFetch';
import { Input } from '@/components/ui/input';
import { FaPlus } from "react-icons/fa";


export default function Cheklist(id:string){

    const { data, error, isLoading } = useFetch(`http://localhost:3000/tarefas/?id=${id}`);

    return(
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold ">ChekList</h1>
                <div className="transition-colors hover:bg-black/10 hover:cursor-pointer rounded-full p-2">
                    <FaPlus />
                </div>
            </div>
            <div className="bg-white rounded-lg p-3 h-52 overflow-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-white" >
                <div className="flex items-center justify-between w-full border-b border-black/10">
                    <label htmlFor="">IR ao supermercado</label>
                    <Input type="checkbox" className="w-5"/>
                </div>
            </div>
        </div>
    );
}