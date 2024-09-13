"use client";

import { Prioritys } from "../types/Types";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
	IoEllipsisHorizontal,
	IoStarSharp,
	IoTrashOutline,
} from "react-icons/io5";
import { BsDashSquare } from "react-icons/bs";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { parse, format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@radix-ui/react-tooltip";

export type Tasks = {
	id: number;
	name: string;
	creationDate: string;
	finalizationDate: string;
	priority: string | number;
	status: string;
};

const currentDate = new Date(Date.now());

export const columns: ColumnDef<Tasks>[] = [
	{
		id: "1",
		cell(props) {
			const currentDate = new Date(format(Date.now(), "yyyy-MM-dd"));
			const finalizationDateStringToDate = new Date(
				props.cell.row.original.finalizationDate,
			);

			if (currentDate.getTime() === finalizationDateStringToDate.getTime()) {
				return (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger className="hover:cursor-default">
								<div className="bg-orange-600 w-3 h-3 mx-auto rounded-full" />
							</TooltipTrigger>
							<TooltipContent
								sideOffset={10}
								className="bg-gray-600 text-white p-2 rounded-sm transition-all"
							>
								<p>Último dia</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				);
			}
			if (currentDate.getTime() < finalizationDateStringToDate.getTime()) {
				return (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger className="hover:cursor-default">
								<div className="bg-green-600 w-3 h-3 mx-auto rounded-full" />
							</TooltipTrigger>
							<TooltipContent
								sideOffset={10}
								className="bg-gray-600 text-white p-2 rounded-sm transition-all"
							>
								<p>No prazo</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				);
			}
			if (currentDate.getTime() > finalizationDateStringToDate.getTime()) {
				return (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger className="hover:cursor-default">
								<div className="bg-red-600 w-3 h-3 mx-auto rounded-full" />
							</TooltipTrigger>
							<TooltipContent
								sideOffset={10}
								className="bg-gray-600 text-white p-2 rounded-sm transition-all"
							>
								<p>Atrasado</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				);
			}
		},
	},
	{
		accessorKey: "name",
		header: "Nome",
	},
	{
		accessorKey: "creationDate",
		id: "dataCreation",
		header: ({ column }) => {
			return (
				<Button
					className="text-center"
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Data de criação
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "finalizationDate",
		header: ({ column }) => {
			return (
				<Button
					className="text-center"
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Data de Finalização
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const validateDate =
				row.original.finalizationDate === ""
					? format(currentDate, "yyyy-MM-dd")
					: row.original.finalizationDate;
			return format(
				parse(validateDate, "yyyy-MM-dd", new Date()),
				"dd/MM/yyyy",
			);
		},
	},
	{
		header: "Prioridade",
		cell: ({ row }) => {
			if (row.original.priority === Prioritys.LOW_PRIORITY) {
				return (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger className="hover:cursor-default">
								<BsDashSquare className="ml-4" size={20} />
							</TooltipTrigger>
							<TooltipContent
								sideOffset={10}
								className="bg-gray-600 text-white p-2 rounded-sm transition-all"
							>
								<p>Baixa Prioridade</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				);
			}
			if (row.original.priority === Prioritys.MEDIUM_PRIORITY) {
				return (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger className="hover:cursor-default">
								<AiOutlineExclamationCircle className="ml-4" size={20} />
							</TooltipTrigger>
							<TooltipContent
								sideOffset={10}
								className="bg-gray-600 text-white p-2 rounded-sm transition-all"
							>
								<p>Média Prioridade</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				);
			}
			if (row.original.priority === Prioritys.HIGH_PRORITY) {
				return (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger className="hover:cursor-default">
								<IoStarSharp className="ml-4" size={20} />
							</TooltipTrigger>
							<TooltipContent
								sideOffset={10}
								className="bg-gray-600 text-white p-2 rounded-sm transition-all"
							>
								<p>Alta Prioridade</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				);
			}
			if (row.original.priority === "")
				return (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger className="hover:cursor-default">
								<BsDashSquare className="ml-4" size={20} />
							</TooltipTrigger>
							<TooltipContent
								sideOffset={10}
								className="bg-gray-600 text-white p-2 rounded-sm transition-all"
							>
								<p>Baixa Prioridade</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				);
		},
	},
	{
		accessorKey: "status",
		header: "Status",
	},
	{
		header: "Ações",
		id: "actions",
		cell: ({ row }) => {
			const task = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger className="transition-all" asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only"> Open Menu </span>
							<IoEllipsisHorizontal />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="bg-zinc-200 rounded-sm space-y-2 p-1"
						align="start"
					>
						<DropdownMenuLabel className="text-black text-center font-medium">
							Opções
						</DropdownMenuLabel>
						<DropdownMenuItem
							className="text-black hover:cursor-pointer hover:bg-black/20 transition-all px-5 py-1"
							onClick={() => navigator.clipboard.writeText(task.name)}
						>
							Copiar Link
						</DropdownMenuItem>
						<DropdownMenuItem className="text-black hover:cursor-pointer hover:bg-black/20 transition-all px-5 py-1">
							Vizualizar card
						</DropdownMenuItem>
						<DropdownMenuItem className="flex items-center gap-1 hover:cursor-pointer hover:bg-black/20 transition-all text-black px-5 py-1">
							<IoTrashOutline color="red" />
							Excluir
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
