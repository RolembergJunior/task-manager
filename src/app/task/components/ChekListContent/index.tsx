'use client'

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { FaPlus } from "react-icons/fa";
import { tasksProps } from '@/app/types/Types';
import { Button } from '@/components/ui/button';

interface dataProps{
    data:[
        {
                // id: number | string | null,
            name: string,
            description: string | null,
            responsible: string | null, 
            creationDate: string | null,
            finalizationDate: string,
            priority: string | number,
            status: string,
            folder: string | null,
            checklist: string[]
        }
    ]
}

export default function Cheklist(data:dataProps){
    const [isOpenInput, setIsOpenInput] = useState(false);
    const [inputText, setInputText] = useState('');
    const [newArrayItems, setNewArrayItems] = useState<string[]>([])

    function onHandleSaveInputList(){
        if(inputText != ''){
            setNewArrayItems([ inputText,...newArrayItems]);

            setInputText('');
            setIsOpenInput(false);
        }
        setIsOpenInput(false);
    }
    
    return(
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold ">ChekList</h1>
                <div
                    onClick={() => setIsOpenInput(true)} 
                    className="transition-colors hover:bg-black/10 hover:cursor-pointer rounded-full p-2">
                    <FaPlus />
                </div>
            </div>
            <div className="bg-white rounded-lg p-3 h-52 overflow-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-white" >
                {isOpenInput ? (
                    <div className="flex gap-2">
                        <Input 
                            onChange={(e) => setInputText(e.target.value)} 
                            type='text' 
                            placeholder='Digite aqui...' />
                        <Button onClick={() => onHandleSaveInputList()}>Salvar</Button>
                    </div>
                ) : null}
                {newArrayItems.map( ( newItem, index ) => (
                    <div key={index} className="flex items-center justify-between w-full border-b border-black/10">
                        <label htmlFor="">{newItem}</label>
                        <Input type="checkbox" className="w-5"/>
                    </div>
                ))}
                {data.data.map( task => task?.checklist?.map( ( chek, index ) => (
                    <div key={index} className="flex items-center justify-between w-full border-b border-black/10">
                        <label htmlFor="">{chek}</label>
                        <Input type="checkbox" className="w-5"/>
                    </div>
                )))}
            </div>
        </div>
    );
}