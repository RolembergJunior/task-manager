'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { FaPlus } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import { tasksProps } from '@/app/types/Types';

interface NewArrayItemsTypes{
    name: string | null,
    checked: boolean | null
}

export default function Cheklist(dataProps:tasksProps){
    const [isOpenInput, setIsOpenInput] = useState(false);
    const [inputText, setInputText] = useState('');
    const [newArrayItems, setNewArrayItems] = useState<NewArrayItemsTypes[]>(
        [
            {
                name: null,
                checked: null
            }
        ]
    );
    const param = useParams();
    const url = `http://localhost:3000/tarefas/${param.id}`;

    useEffect( () => {

    }, [])

    function onHandleSaveInputList(){
        if(inputText != ''){
            setNewArrayItems([{name:inputText, checked: false},...newArrayItems]);

            // fetch( url, {
            //     method: 'PUT',
            //     headers: {
            //     "content-type": "application-json"
            //     },
            //     body: JSON.stringify({
            //         "name": dataProps.name,
            //         "description": dataProps.description,
            //         "responsible": dataProps.responsible, 
            //         "creationDate": dataProps.creationDate,
            //         "finalizationDate": dataProps.finalizationDate,
            //         "priority": dataProps.priority,
            //         "status": dataProps.status,
            //         "folder": dataProps.folder,
            //         "checklist": dataProps.checklist
            //     })
            // })
            // .then( response => response.json() )
            // .then( data => console.log( data ) )

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
            <div className="bg-[#F5F6FA] rounded-lg p-3 max-h-52 overflow-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-white" >
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
                        { newItem.checked 
                            ?   (
                                    <div className='relative'>
                                        <label>{newItem.name}</label>
                                        <hr className='absolute top-[43%] bg-black w-full h-[2px]' />
                                    </div>
                                ) 
                            : <label>{newItem.name}</label> }
                         <Input onClick={() => {
                                const updateItems = newArrayItems.map( item => item.name === newItem.name ? {...item, checked: !item.checked } : item );

                                setNewArrayItems(updateItems);
                            }} 
                            type="checkbox" 
                            className="w-5"
                        /> 
                    </div>
                ))}
                {dataProps.checklist?.map( ( chek, index ) => (
                    <div key={index} className="flex items-center justify-between w-full border-b border-black/10">
                        <label htmlFor="">{chek}</label>
                        <Input type="checkbox" className="w-5"/>
                    </div>
                ))}
            </div>
        </div>
    );
}