"use client";

import { filtersAtom } from "@/app/atoms/Atoms";
import { useAtom } from "jotai";
import { useState } from "react";
import { FaRegFolder } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useFetchFolder } from "@/hooks/useFetch";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTrigger,
} from "@/components/ui/dialog";
import { GoDash } from "react-icons/go";
import { DialogClose } from "@radix-ui/react-dialog";
import type { FolderProps } from "@/app/types/Types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { mutate } from "swr";
import Loading from "@/components/Loading";

export default function FolderList() {
	const [isOpenFolder, setIsOpenFolder] = useState(false);
	const [filters, setFilters] = useAtom(filtersAtom);

	const { data, isLoading, error } = useFetchFolder({
		url: "http://localhost:3000/pastas",
	});

	function onHandleFilterFolder(value: string) {
		if (filters.folder?.toString() === value) {
			setFilters({ ...filters, folder: null });
		} else {
			setFilters({ ...filters, folder: value });
		}
	}

	function onHandleDeleteFolder(id: string) {
		const url = `http://localhost:3000/pastas/${id}`;
		const options = {
			method: "DELETE",
		};

		fetch(url, options)
			.then((response) => response.json())
			.catch((error) => console.error("ERRO:", error));

		mutate("http://localhost:3000/pastas");

		toast.success("Pasta excluída!!");
	}

	if (isLoading) return <Loading />;
	if (!isLoading && !error)
	return (
		<>
			<div
				className="flex items-center justify-between px-3 py-2 hover:cursor-pointer hover:bg-[#F6F6F6] hover:dark:bg-black hover:rounded-lg transition-all"
				onClick={() => setIsOpenFolder(!isOpenFolder)}
			>
				<div className="flex items-center gap-3 hover:cursor-pointer hover:bg-[#F6F6F6] hover:dark:bg-black hover:rounded-lg transition-all">
					<FaRegFolder color="gray" />
					<p className="text-[#5C5E64] dark:text-white/80 font-semibold">
						Pastas
					</p>
				</div>
				{isOpenFolder ? (
					<MdOutlineKeyboardArrowDown />
				) : (
					<MdOutlineKeyboardArrowRight />
				)}
			</div>
			<nav
				style={{
					visibility: isOpenFolder ? "visible" : "hidden",
					overflow: isOpenFolder ? "visible" : "hidden",
					opacity: isOpenFolder ? "1" : "0",
					transition:
						"opacity 1s ease-in-out, visibility 1s ease-in-out, max-height 1s ease-in-out",
					maxHeight: isOpenFolder ? "1000px" : "0",
					width: "100%",
				}}
			>
				<ul>
					{data?.map((folder: FolderProps) => (
						<div
							key={folder.id}
							className={`relative flex items-center justify-between ml-4 px-4 py-2 hover:cursor-pointer ${filters.folder?.toString() === folder.name ? "bg-black rounded-lg" : null} hover:bg-[#F6F6F6] hover:dark:bg-black hover:rounded-lg transition-all`}
						>
							<div
								className="px-3 w-full"
								key={folder.id}
								onClick={() => onHandleFilterFolder(folder.name.toString())}
							>
								{folder.name}
							</div>
							<div className="absolute bg-transparent hover:bg-red-600 p-1 rounded-full right-3 transition-all z-10">
								<Dialog>
									<DialogTrigger>
										<GoDash className="z-10" size={15} />
									</DialogTrigger>
									<DialogContent>
										<DialogDescription>
											Tem certeza que deseja excluir essa pasta?
										</DialogDescription>
										<div className="flex items-center justify-end gap-3">
											<Button>Cancelar</Button>
											<DialogClose
												className="bg-red-600 text-white dark:text-black font-medium text-sm hover:bg-red-800 rounded-md py-2 px-4 h-10 transition-all"
												onClick={() => onHandleDeleteFolder(folder.id)}
											>
												Excluir
											</DialogClose>
										</div>
									</DialogContent>
								</Dialog>
							</div>
						</div>
					))}
				</ul>
			</nav>
		</>
	);
}
