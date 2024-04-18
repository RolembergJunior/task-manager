'use client'

import { useRouter } from "next/navigation";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from "@tanstack/react-table";
   
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

  interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[],
    data: TData[]
  }


  export function DataTable<Tdata, Tvalue>({columns, data}:DataTableProps<Tdata, Tvalue>) {
    const router = useRouter();
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    function onHandleClickRow(id:number){
        
        router.push(`/task/${id}`);
    }



    return(
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map( (headerGroup) => (
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
                            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell 
                                        className="hover:cursor-pointer" 
                                        key={cell.id} onClick={() => onHandleClickRow(cell.row.original.id)}
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