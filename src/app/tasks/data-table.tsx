'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    SortingState,
    getSortedRowModel
  } from "@tanstack/react-table";
   
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import Loading from "@/components/Loading";

  interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[],
    data: TData[]
  }

  export function DataTable<Tdata, Tvalue>({columns, data}:DataTableProps<Tdata, Tvalue>) {
    const [ sorting, setSorting ] = useState<SortingState>([]);
    const router = useRouter();
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting
        }
    });

    function onHandleClickRow(id:number | string){
        router.push(`/task/${id}`);
    }


    if(data === undefined) return <Loading/>
    if(data != undefined)
    return(
        <div className="bg-white rounded-md border w-[90%] mx-auto my-5">
            <Table>
                <TableHeader>
                    {table?.getHeaderGroups().map( (headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map( (headerTable) => {
                                return(
                                    <TableHead key={headerTable.id} >
                                        {headerTable.isPlaceholder 
                                            ? null 
                                            : flexRender(
                                                headerTable.column.columnDef.header,
                                                headerTable.getContext()
                                            )}
                                    </TableHead>
                                );
                            } )}
                        </TableRow>
                    ) )}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map( (row) => (
                            <TableRow onClick={() => onHandleClickRow(row.original.id)} key={row.id} data-state={row.getIsSelected() && "selected"}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell 
                                        className="hover:cursor-pointer" 
                                        key={cell.id} 
                                    >
                                        {flexRender(cell.column.columnDef.cell, 
                                                    cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                Sem resultados.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
  }