'use client'

import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
        if( newFolder.name != '' ){
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
                
            } catch (error) {
                alert(error);
            }

            setNewFolder({name: ''})
        } else {
            alert('Coloque o nome da pasta');
        }
    }

    useEffect(() => {
        mutate('http://localhost:3000/pastas')
    },[onHandleSaveFolderName])

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
                <Button 
                    className="w-full dark:bg-white"
                    onClick={() => onHandleSaveFolderName()}
                >
                    Salvar
                </Button>
            </DialogContent>
        </Dialog>
    );
}