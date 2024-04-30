'use client'

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Rows } from "lucide-react";
import { IoEllipsisHorizontal, IoTrashOutline } from 'react-icons/io5'

export type Tasks = {
    id: number,
    name: string,
    creatationDate?: string,
    finalizationDate?: string,
    category: string,
    status: string
}

export const columns: ColumnDef<Tasks>[] = [
    {
        header: 'Nº',
        cell: ({ row }) => {
            return row.id
        }
    },
    {
        accessorKey: 'name',
        header: 'Nome'
    },
    {
        accessorKey: 'creationDate',
        header: 'Data de Criação'
    },
    {
        accessorKey: 'finalizationDate',
        header: 'Data de Finalização'
    },
    {
        accessorKey: 'category',
        header: 'Categoria'
    },
    {
        accessorKey: 'status',
        header: 'Status'
    },
    {
        header: 'Ações',
        id: "actions",
        cell: ({ row }) => {
            const task = row.original

            return(
                <DropdownMenu>
                    <DropdownMenuTrigger className="transition-all" asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0" >
                            <span className="sr-only"> Open Menu </span>
                            <IoEllipsisHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-zinc-200 rounded-sm space-y-2 p-1" align="start">
                        <DropdownMenuLabel className="text-black text-center font-medium">
                            Opções
                        </DropdownMenuLabel>
                        <DropdownMenuItem className="text-black hover:cursor-pointer hover:bg-black/20 transition-all px-5 py-1" onClick={() => navigator.clipboard.writeText(task.name)}>
                            Copiar Link
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-black hover:cursor-pointer hover:bg-black/20 transition-all px-5 py-1">Vizualizar card</DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-1 hover:cursor-pointer hover:bg-black/20 transition-all text-black px-5 py-1">
                            <IoTrashOutline color="red" />
                            Excluir
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    }
]