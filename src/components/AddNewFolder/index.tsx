'use client'

import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
    DialogClose
  } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FaFolder } from "react-icons/fa";
import { mutate } from "swr";

interface FolderTypes{
    name: string
}

export default function AddNewFolder(){
    const [ newFolder, setNewFolder ] = useState<FolderTypes>({
        name: ''
    });
    const url = 'http://localhost:3000/pastas'

    function onHandleSaveFolderName(){
        if( newFolder.name !== '' ){
            try {
                fetch( url, {
                    method: 'POST',
                    headers: {
                        'content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: newFolder.name
                    })
                }).then( response => response.json() );

                mutate('http://localhost:3000/pastas');
                
            } catch (error) {
                alert(error);
            }
            setNewFolder({name: ''});

            alert('PASTA SALVA!');
        } else {
            alert('Coloque o nome da pasta');
        }
    }

    return(
        <Dialog>
            <DialogTrigger className="flex items-center dark:bg-black/70 dark:hover:bg-black/20 p-2 rounded-md gap-1 transition-all">
                {"+"} <FaFolder/>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    Crie uma pasta
                </DialogHeader>
                <div className="space-y-2">
                    <label>Nome da pasta</label>
                    <Input onChange={(e) => setNewFolder({...newFolder,  name: e.target.value })} type="text" />
                </div>
                <DialogClose 
                    className="w-full text-white bg-[#0f172a] dark:text-black dark:bg-white p-2 rounded-md"
                    onClick={() => onHandleSaveFolderName()}
                >
                    Salvar
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}