"use client";

import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogClose,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HiMagnifyingGlass } from "react-icons/hi2";
import MenuFilter from "./components/MenuFilters";
import SideBar from "@/components/Sidebar";

export default function Inbox() {
	return (
		<div className="flex">
			<SideBar />
			<div className="w-full">
				<div className="flex items-center justify-between border border-black/10 w-full h-20 p-4">
					<MenuFilter />
					<div className="flex gap-3">
						<div className="flex items-center gap-2 p-2 hover:cursor-pointer hover:bg-black/20 rounded-xl transition-all">
							<HiMagnifyingGlass />
							<span>Search</span>
						</div>
						<Dialog>
							<DialogTrigger asChild>
								<Button>Limpar Tarefas</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Excluir tarefas</DialogTitle>
									<DialogDescription>
										Tem certeza que deseja limpar as tarefas da caixa de
										entrada?
									</DialogDescription>
									<div className="flex items-center justify-end gap-3">
										<DialogClose className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-black/10 p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
											Cancelar
										</DialogClose>
										<Button>Limpar</Button>
									</div>
								</DialogHeader>
							</DialogContent>
						</Dialog>
					</div>
				</div>
				<section className="w-[90%] mx-auto mt-4 space-y-5"></section>
			</div>
		</div>
	);
}
